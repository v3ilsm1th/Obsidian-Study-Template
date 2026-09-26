// =============================================================================
// Views/woche.js – Termine + fällige Todos für einen Zeitraum (Journal)
// Aufruf:
//   await dv.view("Views/woche")                      // liest Datum aus Dateiname
//                                                     // (YYYY-MM-DD oder YYYY-Www)
//   await dv.view("Views/woche", { von: "2026-10-12", bis: "2026-10-18" })
// =============================================================================
const cfg = Object.assign({
    ordner: null,          // Standard: alle Ordner, die "Termine" heißen
    von: null,
    bis: null
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

let von = cfg.von ? lux.DateTime.fromISO(cfg.von).startOf("day") : null;
let bis = cfg.bis ? lux.DateTime.fromISO(cfg.bis).startOf("day") : null;

if (!von) {
    const name = (dv.current().file.name || "").trim();
    const mTag = name.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const mWoche = name.match(/^(\d{4})-W(\d{1,2})$/i);
    if (mTag) {
        von = lux.DateTime.fromISO(name);
        bis = von;
    } else if (mWoche) {
        const jahr = Number(mWoche[1]);
        const woche = Number(mWoche[2]);
        const jan4 = lux.DateTime.fromObject({ year: jahr, month: 1, day: 4 });
        const montagWoche1 = jan4.minus({ days: (jan4.weekday + 6) % 7 });
        von = montagWoche1.plus({ weeks: woche - 1 });
        bis = von.plus({ days: 6 });
    } else {
        const heute = lux.DateTime.now().startOf("day");
        von = heute.minus({ days: (heute.weekday + 6) % 7 });
        bis = von.plus({ days: 6 });
    }
}
if (!bis) bis = von;

dv.header(4, von.hasSame(bis, "day")
    ? `📅 ${von.toFormat("EEEE, dd.MM.yyyy")}`
    : `📅 KW ${von.toFormat("WW")} · ${von.toFormat("dd.MM.")} – ${bis.toFormat("dd.MM.yyyy")}`);

// --- Termine im Zeitraum ----------------------------------------------------
const termine = dv.pages()
    .where(p => p.datum && istTerminSeite(p)
        && p.datum.startOf("day") >= von && p.datum.startOf("day") <= bis)
    .array()
    .sort((a, b) => a.datum.toMillis() - b.datum.toMillis());

if (termine.length === 0) {
    dv.paragraph("🕐 Keine Termine in diesem Zeitraum.");
} else {
    dv.table(
        ["Datum", "Tag", "Termin", "Modul", "Zeit", "Status"],
        termine.map(t => [
            t.datum.toFormat("dd.MM.yyyy"),
            t.datum.setLocale("de").toFormat("ccc"),
            dv.fileLink(t.file.path, false, t.titel || t.file.name),
            modulKurz(t.modul),
            t.zeit || "–",
            (t.deadline ? "🔴 " : "") + (t.status === "erledigt" ? "✅" : "⬜")
        ])
    );
}

// --- Fällige Todos im Zeitraum ---------------------------------------------
const aufgaben = dv.pages().file.tasks
    .where(t => !t.completed && t.due && t.due.startOf("day") >= von && t.due.startOf("day") <= bis)
    .array()
    .sort((a, b) => a.due.toMillis() - b.due.toMillis());

if (aufgaben.length > 0) {
    dv.header(4, "✅ Fällige Todos");
    dv.taskList(aufgaben, false);
}
