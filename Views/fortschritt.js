// =============================================================================
// Views/fortschritt.js – Lernerfolgskontrolle (X von Y Lektionen, Fortschritts-
// balken, Quicklinks auf alle Lektionen/Kapitel + Lernkartenfortschritt)
// Aufruf:
//   await dv.view("Views/fortschritt", {})                   // Gesamtübersicht
//   await dv.view("Views/fortschritt", { modul: "12345" })   // ein Modul
//   await dv.view("Views/fortschritt", { modul: "12345", details: false })
// Erwartete Notiz-Eigenschaften (Lektionsnotizen): typ: lektion, modul, nummer,
//   label, titel, status (offen | laeuft | fertig), optional block
// Modul-Namen und Dashboard-Links kommen dynamisch aus den Modul-Dashboards
//   (Datei "* Dashboard.md" mit `modul` + `titel`) – nichts hardcodiert.
// Lernkartenfortschritt:
//   "gelernt" = Frage::Antwort-Karte mit zugehörigem <!--SR:...-->-Kommentar.
//   Unterstützt einzeilige Frage::Antwort-Karten. Andere Kartentypen werden
//   bewusst nicht mitgezählt.
//   Der Lernkartenordner wird über den Modul-Ordner bestimmt
//   (…/<Modulordner>/04 Lernkarten).
// =============================================================================
const cfg = Object.assign({
    modul: null,
    details: true
}, input || {});

// --- Modul-Dashboards dynamisch finden (Datei "* Dashboard.md", `modul`+`titel`)
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

const EMOJI = {
    fertig: "✅",
    laeuft: "🟡",
    offen: "⬜"
};

function balken(fertig, gesamt) {
    if (gesamt === 0) return "";
    const laenge = Math.min(gesamt, 24);
    const voll = Math.round((fertig / gesamt) * laenge);
    return "▰".repeat(voll) + "▱".repeat(laenge - voll);
}

function prozent(teil, gesamt) {
    return gesamt > 0 ? Math.round((teil / gesamt) * 100) : 0;
}

// Lernkartenordner über den Elternordner des Modul-Dashboards bestimmen.
// Beispiel: …/12345 Beispielmodul/12345 Dashboard.md → …/12345 Beispielmodul/04 Lernkarten
function lernkartenOrdner(modul) {
    const d = MODUL_DASH[String(modul)];
    if (!d) return null;
    const modulOrdner = d.file.folder;
    return `${modulOrdner}/04 Lernkarten`;
}

function istImLernkartenOrdner(seite, ordner) {
    return ordner &&
        (seite.file.folder === ordner ||
         seite.file.folder.startsWith(`${ordner}/`));
}

// Zählt nur einzeilige Karten im Format Frage::Antwort.
// Ein SR-Kommentar direkt am Zeilenende ODER in der nächsten Zeile
// kennzeichnet eine bereits bewertete Karte.
function zaehleKarten(inhalt) {
    const zeilen = inhalt.split(/\r?\n/);
    let gesamt = 0;
    let gelernt = 0;
    let inCodeblock = false;
    let inFrontmatter = false;

    for (let i = 0; i < zeilen.length; i++) {
        const zeile = zeilen[i].trim();

        if (i === 0 && zeile === "---") {
            inFrontmatter = true;
            continue;
        }
        if (inFrontmatter) {
            if (zeile === "---") inFrontmatter = false;
            continue;
        }

        if (/^(```|~~~)/.test(zeile)) {
            inCodeblock = !inCodeblock;
            continue;
        }
        if (inCodeblock || !zeile || zeile.startsWith("<!--")) continue;

        const ohneKommentar = zeile.replace(/\s*<!--SR:[\s\S]*?-->\s*$/, "");
        const teile = ohneKommentar.split("::");

        if (teile.length !== 2 || !teile[0].trim() || !teile[1].trim()) {
            continue;
        }

        gesamt++;

        const kommentarGleicheZeile = /<!--SR:[\s\S]*?-->/.test(zeile);
        const kommentarNaechsteZeile =
            i + 1 < zeilen.length &&
            /^<!--SR:[\s\S]*?-->$/.test(zeilen[i + 1].trim());

        if (kommentarGleicheZeile || kommentarNaechsteZeile) {
            gelernt++;
        }
    }

    return { gesamt, gelernt };
}

const alleSeiten = dv.pages().array();

const alle = alleSeiten
    .filter(p => p.typ === "lektion")
    .filter(p => cfg.modul == null ||
        String(p.modul) === String(cfg.modul));

const module = cfg.modul != null
    ? [String(cfg.modul)]
    : [...new Set(alle.map(p => String(p.modul)))].sort();

if (module.length === 0) {
    dv.paragraph(
        "📭 Keine Module gefunden (Lektionsnotizen mit `typ: lektion` " +
        "oder Modul-Filter prüfen)."
    );
} else {
    if (cfg.modul == null && alle.length > 0) {
        dv.header(3, "📊 Gesamtfortschritt");

        const zeilen = module.map(m => {
            const lektionen = alle.filter(p => String(p.modul) === m);
            const fertig = lektionen.filter(p => p.status === "fertig").length;
            const laeuft = lektionen.filter(p => p.status === "laeuft").length;

            return [
                modulLink(m, modulName(m)),
                balken(fertig, lektionen.length),
                `${fertig} von ${lektionen.length}`,
                laeuft > 0 ? `🟡 ${laeuft} laufend` : "–",
                `${prozent(fertig, lektionen.length)} %`
            ];
        });

        dv.table(
            ["Modul", "Fortschritt", "Abgeschlossen",
             "In Bearbeitung", "Quote"],
            zeilen
        );
    }

    if (cfg.details) {
        for (const m of module) {
            const lektionen = alle
                .filter(p => String(p.modul) === m)
                .sort((a, b) =>
                    Number(a.nummer || 0) - Number(b.nummer || 0)
                );

            const fertig = lektionen
                .filter(p => p.status === "fertig").length;

            const blocks = [
                ...new Set(
                    lektionen
                        .map(p => p.block ? String(p.block) : null)
                        .filter(Boolean)
                )
            ];

            dv.header(3, `📘 ${modulName(m)}`);

            if (lektionen.length > 0) {
                dv.paragraph(
                    `**${balken(fertig, lektionen.length)}** — ` +
                    `**${fertig} von ${lektionen.length}** Lektionen ` +
                    `abgeschlossen (${prozent(fertig, lektionen.length)} %)`
                );

                const hatBlocks = blocks.length > 0;

                const zeileFuer = p => {
                    const zeile = [
                        p.label ||
                            (p.nummer != null ? String(p.nummer) : ""),
                        dv.fileLink(
                            p.file.path,
                            false,
                            p.titel || p.file.name
                        ),
                        `${EMOJI[p.status] || "⬜"} ` +
                            `${p.status || "offen"}`
                    ];

                    if (hatBlocks) {
                        zeile.push(p.block ? String(p.block) : "");
                    }

                    return zeile;
                };

                const zeilenL = [];

                if (hatBlocks) {
                    for (const b of blocks) {
                        const blockLektionen = lektionen
                            .filter(p => String(p.block) === b);
                        const blockFertig = blockLektionen
                            .filter(p => p.status === "fertig").length;

                        zeilenL.push([
                            `**▸ ${b}**`,
                            `**${balken(
                                blockFertig,
                                blockLektionen.length
                            )}** ${blockFertig}/${blockLektionen.length}`,
                            "",
                            ""
                        ]);

                        for (const p of blockLektionen) {
                            zeilenL.push(zeileFuer(p));
                        }
                    }

                    for (const p of lektionen.filter(p => !p.block)) {
                        zeilenL.push(zeileFuer(p));
                    }
                } else {
                    for (const p of lektionen) {
                        zeilenL.push(zeileFuer(p));
                    }
                }

                dv.table(
                    hatBlocks
                        ? ["Kapitel/Lektion", "Titel", "Status", "Block"]
                        : ["Kapitel/Lektion", "Titel", "Status"],
                    zeilenL
                );
            } else {
                dv.paragraph("Noch keine Lektionen für dieses Modul.");
            }

            // Lernkartenfortschritt: alle Markdown-Dateien im Lernkartenordner
            dv.header(4, "🗂️ Lernkarten");

            const ordner = lernkartenOrdner(m);

            if (!ordner) {
                dv.paragraph(
                    "Kein Modul-Dashboard gefunden – Modulpfad für " +
                    "Lernkarten dadurch unbekannt."
                );
                continue;
            }

            const dateien = alleSeiten
                .filter(p => istImLernkartenOrdner(p, ordner))
                .sort((a, b) =>
                    a.file.path.localeCompare(b.file.path, "de")
                );

            if (dateien.length === 0) {
                dv.paragraph(
                    `Keine Markdown-Dateien in \`${ordner}\` gefunden.`
                );
                continue;
            }

            const ergebnisse = await Promise.all(
                dateien.map(async p => {
                    try {
                        const inhalt = await dv.io.load(p.file.path);

                        return {
                            seite: p,
                            ...zaehleKarten(inhalt || ""),
                            fehler: false
                        };
                    } catch (e) {
                        return {
                            seite: p,
                            gesamt: 0,
                            gelernt: 0,
                            fehler: true
                        };
                    }
                })
            );

            const gesamtKarten = ergebnisse
                .reduce((summe, r) => summe + r.gesamt, 0);
            const gelerntKarten = ergebnisse
                .reduce((summe, r) => summe + r.gelernt, 0);

            dv.paragraph(
                gesamtKarten > 0
                    ? `**${balken(gelerntKarten, gesamtKarten)}** — ` +
                      `**${gelerntKarten} von ${gesamtKarten}** Karten ` +
                      `mindestens einmal bewertet ` +
                      `(${prozent(gelerntKarten, gesamtKarten)} %)`
                    : "Noch keine einzeiligen `Frage::Antwort`-Karten gefunden."
            );

            dv.table(
                ["Datei", "Fortschritt", "Bewertet", "Status"],
                ergebnisse.map(r => {
                    let status;

                    if (r.fehler) {
                        status = "⚠️ Lesefehler";
                    } else if (r.gesamt === 0) {
                        status = "– Keine Karten erkannt";
                    } else if (r.gelernt === r.gesamt) {
                        status = "✅ Alle einmal bewertet";
                    } else if (r.gelernt > 0) {
                        status = "🟡 In Bearbeitung";
                    } else {
                        status = "⬜ Noch nicht begonnen";
                    }

                    return [
                        dv.fileLink(
                            r.seite.file.path,
                            false,
                            r.seite.file.name
                        ),
                        balken(r.gelernt, r.gesamt),
                        r.fehler
                            ? "–"
                            : `${r.gelernt} von ${r.gesamt} ` +
                              `(${prozent(r.gelernt, r.gesamt)} %)`,
                        status
                    ];
                })
            );
        }

        dv.paragraph(
            "Lektionsstatus im Eigenschaften-Panel ändern: " +
            "`offen` → `laeuft` → `fertig`."
        );
    }
}
