// =============================================================================
// Views/fortschritt.js – Lernerfolgskontrolle (X von Y Lektionen, Fortschritts-
// balken, Quicklinks auf alle Lektionen/Kapitel)
// Aufruf:
//   await dv.view("Views/fortschritt", {})                   // Gesamtübersicht
//   await dv.view("Views/fortschritt", { modul: "12345" })   // ein Modul
//   await dv.view("Views/fortschritt", { modul: "12345", details: false })
// Erwartete Notiz-Eigenschaften (Lektionsnotizen): typ: lektion, modul, nummer,
//   label, titel, status (offen | laeuft | fertig), optional block
// Modul-Namen und Dashboard-Links kommen dynamisch aus den Modul-Dashboards
//   (Datei "* Dashboard.md" mit `modul` + `titel`) – nichts hardcodiert.
// =============================================================================
const cfg = Object.assign({
    modul: null,
    details: true
}, input || {});

const MODUL_DASH = {};
for (const p of dv.pages()) {
    const fm = p.file.frontmatter || {};
    if (!fm.modul || MODUL_DASH[String(fm.modul)]) continue;
    const istDash = (p.file.name || "").endsWith(" Dashboard") ||
        (Array.isArray(fm.tags) && fm.tags.indexOf("modul") >= 0);
    if (istDash) MODUL_DASH[String(fm.modul)] = p;
}
const modulName = m => {
    const d = MODUL_DASH[String(m)];
    const titel = d ? String(d.titel || "") : "";
    return titel ? `${m} · ${titel}` : String(m);
};
const modulLink = (m, text) => {
    const d = MODUL_DASH[String(m)];
    return d ? dv.fileLink(d.file.path, false, text) : text;
};

const alle = dv.pages()
    .where(p => p.typ === "lektion")
    .array()
    .filter(p => cfg.modul == null || String(p.modul) === String(cfg.modul));

const EMOJI = { fertig: "✅", laeuft: "🟡", offen: "⬜" };

const balken = (fertig, gesamt) => {
    if (gesamt === 0) return "";
    const laenge = gesamt <= 24 ? gesamt : 24;
    const voll = Math.round((fertig / gesamt) * laenge);
    return "▰".repeat(voll) + "▱".repeat(Math.max(0, laenge - voll));
};

if (alle.length === 0) {
    dv.paragraph("📭 Noch keine Lektionen/Kapitel angelegt (Eigenschaft `typ: lektion`).");
} else {
    const module = [...new Set(alle.map(p => String(p.modul)))].sort();

    if (cfg.modul == null) {
        dv.header(3, "📊 Gesamtfortschritt");
        const zeilen = module.map(m => {
            const l = alle.filter(p => String(p.modul) === m);
            const fertig = l.filter(p => p.status === "fertig").length;
            const laeuft = l.filter(p => p.status === "laeuft").length;
            return [
                modulLink(m, modulName(m)),
                balken(fertig, l.length),
                `${fertig} von ${l.length}`,
                laeuft > 0 ? `🟡 ${laeuft} laufend` : "–",
                `${Math.round((fertig / l.length) * 100)} %`
            ];
        });
        dv.table(["Modul", "Fortschritt", "Abgeschlossen", "In Bearbeitung", "Quote"], zeilen);
    }

    if (cfg.details) {
        for (const m of module) {
            const l = alle.filter(p => String(p.modul) === m)
                .sort((a, b) => (a.nummer || 0) - (b.nummer || 0));
            const fertig = l.filter(p => p.status === "fertig").length;
            const blocks = [...new Set(l.map(p => p.block ? String(p.block) : null).filter(Boolean))];

            dv.header(3, `📘 ${modulName(m)}`);
            dv.paragraph(`**${balken(fertig, l.length)}** — **${fertig} von ${l.length}** Lektionen abgeschlossen (${Math.round((fertig / l.length) * 100)} %)`);

            const hatBlocks = blocks.length > 0;
            const zeileFuer = p => {
                const zeile = [
                    p.label || (p.nummer != null ? String(p.nummer) : ""),
                    dv.fileLink(p.file.path, false, p.titel || p.file.name),
                    `${EMOJI[p.status] || "⬜"} ${p.status || "offen"}`
                ];
                if (hatBlocks) zeile.push(p.block ? String(p.block) : "");
                return zeile;
            };

            const zeilenL = [];
            if (hatBlocks) {
                // Block für Block: Überschrift mit eigenem Balken, darunter die
                // Lektionen dieses Blocks (Reihenfolge = nummer).
                for (const b of blocks) {
                    const lb = l.filter(p => String(p.block) === b);
                    const fb = lb.filter(p => p.status === "fertig").length;
                    zeilenL.push([`**▸ ${b}**`, `**${balken(fb, lb.length)}** ${fb}/${lb.length}`, "", ""]);
                    for (const p of lb) zeilenL.push(zeileFuer(p));
                }
                // Lektionen ohne Block ans Ende
                for (const p of l.filter(p => !p.block)) zeilenL.push(zeileFuer(p));
            } else {
                for (const p of l) zeilenL.push(zeileFuer(p));
            }

            const kopf = hatBlocks
                ? ["Kapitel/Lektion", "Titel", "Status", "Block"]
                : ["Kapitel/Lektion", "Titel", "Status"];
            dv.table(kopf, zeilenL);
        }
        dv.paragraph("Status im Eigenschaften-Panel der Lektionsnotiz ändern: `offen` → `laeuft` → `fertig`.");
    }
}
