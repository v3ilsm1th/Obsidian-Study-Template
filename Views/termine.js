// =============================================================================
// Views/termine.js – "Nächste Termine" mit Countdown (Erinnerungen)
// Aufruf:
//   await dv.view("Views/termine", { tage: 21 })
//   await dv.view("Views/termine", { modul: "12345", tage: 30 })
// Parameter: modul, tage (Zeitfenster), max (max. Zeilen), vergangen (true =
//            auch bereits vergangene Termine des Fensters anzeigen),
//            ordner (optional – Standard: alle Ordner, die "Termine" heißen)
// =============================================================================
const cfg = Object.assign({
    ordner: null,
    modul: null,
    tage: 21,
    max: 30,
    vergangen: true
}, input || {});

// --- Modul-Namen dynamisch aus den Modul-Dashboards (Datei "* Dashboard.md",
//     Eigenschaften `modul` + `titel`; optional `kurz` für Kalenderzellen) -----
const MODUL = {};
for (const p of dv.pages()) {
    const fm = p.file.frontmatter || {};
    if (!fm.modul || MODUL[String(fm.modul)]) continue;
    const istDash = (p.file.name || "").endsWith(" Dashboard") ||
        (Array.isArray(fm.tags) && fm.tags.indexOf("modul") >= 0);
    if (!istDash) continue;
    const titel = String(fm.titel || "");
    const woerter = titel.split(/\s+/).filter(Boolean);
    MODUL[String(fm.modul)] = {
        titel: titel,
        kurz: fm.kurz ? String(fm.kurz)
            : (woerter.length >= 2
                ? woerter.map(w => w[0]).join("").slice(0, 5)
                : (woerter[0] || String(fm.modul)).slice(0, 7))
    };
}
const modulKurz = m => (MODUL[String(m)] || {}).kurz || String(m == null ? "" : m);

// --- Termine-Ordner aller Semester finden (Archiv wird ignoriert) ------------
const istTerminSeite = p => {
    const f = String(p.file.folder || "");
    if (cfg.ordner) return f === String(cfg.ordner);
    if (f === "Archiv" || f.startsWith("Archiv/")) return false;
    return /(^|\/)Termine$/.test(f);
};

const lux = dv.luxon;
const heute = lux.DateTime.now().startOf("day");
const grenze = cfg.tage == null ? lux.DateTime.fromISO("2099-12-31") : heute.plus({ days: cfg.tage });
const spaltenName = cfg.tage == null ? "Status" : `Nächste ${cfg.tage} Tage`;

let termine = dv.pages().where(p => p.datum && istTerminSeite(p)).array();
if (cfg.modul !== null && cfg.modul !== undefined) {
    termine = termine.filter(p => String(p.modul) === String(cfg.modul));
}

const inTagen = t => {
    const d = Math.round(t.datum.startOf("day").diff(heute, "days").days);
    if (d > 1) return `in ${d} Tagen`;
    if (d === 1) return "morgen";
    if (d === 0) return "heute";
    if (d === -1) return "gestern";
    return `⚠️ vor ${-d} Tagen`;
};

const gefiltert = termine
    .filter(t => cfg.vergangen ? t.datum.startOf("day") <= grenze : t.datum.startOf("day") >= heute)
    .filter(t => cfg.vergangen ? t.datum.startOf("day") >= heute.minus({ days: 60 }) : true)
    .sort((a, b) => a.datum.toMillis() - b.datum.toMillis())
    .slice(0, cfg.max);

if (gefiltert.length === 0) {
    dv.paragraph(cfg.tage == null
        ? "🕐 Noch keine Termine eingetragen."
        : `🕐 In den nächsten ${cfg.tage} Tagen steht nichts an.`);
} else {
    const kopf = ["Datum", "Tag"];
    if (cfg.modul == null) kopf.push("Modul");
    kopf.push("Termin", "Typ", "Zeit", spaltenName);

    const zeilen = gefiltert.map(t => {
        const z = [
            t.datum.toFormat("dd.MM.yyyy"),
            t.datum.setLocale("de").toFormat("ccc")
        ];
        if (cfg.modul == null) z.push(modulKurz(t.modul));
        z.push(dv.fileLink(t.file.path, false, t.titel || t.file.name));
        z.push(t.typ || "");
        z.push(t.zeit || "–");
        const status = t.status === "erledigt" ? "✅ " : (t.deadline ? "🔴 " : "");
        z.push(status + inTagen(t));
        return z;
    });
    dv.table(kopf, zeilen);
}
