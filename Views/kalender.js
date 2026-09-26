// =============================================================================
// Views/kalender.js – Monatskalender aller Termine
// Aufruf:
//   ```dataviewjs
//   await dv.view("Views/kalender", {})                  // alle Module
//   await dv.view("Views/kalender", { modul: "12345" })  // nur ein Modul
//   await dv.view("Views/kalender", { von: "2026-10-01", bis: "2026-12-31" })
//   ```
// Legende: 📅 = heute | 🔴 = Abgabe/Deadline | ✅ = erledigt
// =============================================================================
const cfg = Object.assign({
    ordner: null,          // Standard: alle Ordner, die "Termine" heißen
    modul: null,
    von: null,
    bis: null
}, input || {});

const MONATE = ["Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"];
const WOCHENTAGE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

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

let termine = dv.pages().where(p => p.datum && istTerminSeite(p)).array();
if (cfg.modul !== null && cfg.modul !== undefined) {
    termine = termine.filter(p => String(p.modul) === String(cfg.modul));
}
termine.sort((a, b) => a.datum.toMillis() - b.datum.toMillis());

if (termine.length === 0) {
    dv.paragraph("🕐 Noch keine Termine hinterlegt.");
} else {
    const nachTag = new Map();
    for (const t of termine) {
        const key = t.datum.toISODate();
        if (!nachTag.has(key)) nachTag.set(key, []);
        nachTag.get(key).push(t);
    }

    const von = cfg.von
        ? lux.DateTime.fromISO(cfg.von).startOf("month")
        : termine[0].datum.startOf("month");
    const bis = cfg.bis
        ? lux.DateTime.fromISO(cfg.bis).endOf("month")
        : termine[termine.length - 1].datum.endOf("month");

    let monat = von;
    while (monat <= bis) {
        dv.header(4, `${MONATE[monat.month - 1]} ${monat.year}`);
        const erster = monat.startOf("month");
        const offset = (erster.weekday + 6) % 7; // Mo = 0 … So = 6
        const zellen = [];
        for (let i = 0; i < offset; i++) zellen.push(null);
        let d = erster;
        while (d.month === monat.month) {
            zellen.push(d);
            d = d.plus({ days: 1 });
        }
        while (zellen.length % 7 !== 0) zellen.push(null);

        const zeilen = [];
        for (let i = 0; i < zellen.length; i += 7) {
            zeilen.push(zellen.slice(i, i + 7).map(z => {
                if (z === null) return "";
                const istHeute = z.hasSame(heute, "day");
                let zelle = istHeute ? `📅 **${z.day}**` : `**${z.day}**`;
                const anTag = nachTag.get(z.toISODate()) || [];
                for (const t of anTag) {
                    const mark = t.status === "erledigt" ? "✅" : (t.deadline ? "🔴" : "•");
                    const prae = (cfg.modul == null && MODUL[String(t.modul)])
                        ? modulKurz(t.modul) + "·"
                        : "";
                    const alias = (prae + (t.kurz || t.titel)).replace(/\|/g, "/");
                    zelle += ` ${mark} [[${t.file.path.replace(/\.md$/, "")}|${alias}]]`;
                }
                return zelle;
            }));
        }
        dv.table(WOCHENTAGE, zeilen);
        monat = monat.plus({ months: 1 });
    }
    dv.paragraph("🔴 Abgabe/Deadline · • Termin · ✅ erledigt · 📅 heute");
}
