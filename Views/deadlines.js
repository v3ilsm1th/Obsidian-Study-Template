// =============================================================================
// Views/deadlines.js – Abgaben & Einsendeaufgaben (Deadlines)
// Aufruf:
//   await dv.view("Views/deadlines", {})
//   await dv.view("Views/deadlines", { modul: "12345", zeigeErledigt: false })
// Parameter: modul, von/bis (ISO-Datum, default: −90 bis +300 Tage),
//            zeigeErledigt (default true),
//            ordner (optional – Standard: alle Ordner, die "Termine" heißen)
// =============================================================================
const cfg = Object.assign({
    ordner: null,
    modul: null,
    von: null,
    bis: null,
    zeigeErledigt: true
}, input || {});

// --- Modul-Kürzel dynamisch aus den Modul-Dashboards -------------------------
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

const istTerminSeite = p => {
    const f = String(p.file.folder || "");
    if (cfg.ordner) return f === String(cfg.ordner);
    if (f === "Archiv" || f.startsWith("Archiv/")) return false;
    return /(^|\/)Termine$/.test(f);
};

const lux = dv.luxon;
const heute = lux.DateTime.now().startOf("day");
const von = cfg.von ? lux.DateTime.fromISO(cfg.von) : heute.minus({ days: 90 });
const bis = cfg.bis ? lux.DateTime.fromISO(cfg.bis) : heute.plus({ days: 300 });

let termine = dv.pages()
    .where(p => p.datum && p.deadline === true && istTerminSeite(p))
    .array()
    .filter(t => {
        const d = t.datum.startOf("day");
        return d >= von && d <= bis;
    });
if (cfg.modul !== null && cfg.modul !== undefined) {
    termine = termine.filter(p => String(p.modul) === String(cfg.modul));
}
if (!cfg.zeigeErledigt) {
    termine = termine.filter(p => p.status !== "erledigt");
}
termine.sort((a, b) => a.datum.toMillis() - b.datum.toMillis());

if (termine.length === 0) {
    dv.paragraph("✅ Keine (offenen) Abgaben in diesem Zeitraum.");
} else {
    const zeilen = termine.map(t => {
        const d = Math.round(t.datum.startOf("day").diff(heute, "days").days);
        let rest;
        if (t.status === "erledigt") rest = "✅ abgeschickt";
        else if (d > 1) rest = `noch ${d} Tage`;
        else if (d === 1) rest = "**noch 1 Tag**";
        else if (d === 0) rest = "**heute fällig**";
        else rest = `⚠️ **überfällig seit ${-d} Tagen**`;
        return [
            t.datum.toFormat("dd.MM.yyyy"),
            t.datum.setLocale("de").toFormat("ccc"),
            (cfg.modul == null ? modulKurz(t.modul) + " · " : "")
                + (t.kurz || t.titel),
            dv.fileLink(t.file.path, false, t.titel || t.file.name),
            t.upload === true ? "⬆️ Upload" : "",
            t.status === "erledigt" ? "✅" : "⬜",
            rest
        ];
    });
    dv.table(["Datum", "Tag", "Kurz", "Abgabe", "Art", "Status", "Restzeit"], zeilen);
}
