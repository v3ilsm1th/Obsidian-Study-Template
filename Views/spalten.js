// =============================================================================
// Views/spalten.js – Mehrere View-Abschnitte NEBENEINANDER anordnen
// (responsives Raster: schmal übereinander, viel Platz nebeneinander)
//
// Aufruf:
//   ```dataviewjs
//   await dv.view("Views/spalten", { spalten: [
//     { titel: "⏰ Nächste Termine", view: "Views/termine",  input: { tage: 21 } },
//     { titel: "🔴 Abgaben",        view: "Views/deadlines", input: {} }
//   ] })
//   ```
// Parameter: spalten  – Array aus { titel?, view, input? } (2–4 Spalten sinnvoll)
//            minBreite – minimale Spaltenbreite in px (default 420)
//            abstand   – Abstand zwischen den Spalten in px (default 18)
//
// Technik: Der Unter-View hängt seine Knoten an denselben Container; wir
//          merken uns die Kindnummer davor und verschieben die neuen Knoten
//          danach in die jeweilige Spalten-Div (`.spalte`).
// Voraussetzungen: volle Seitenbreite (Einstellungen → Editor → „Lesbare
//          Zeilenlänge" AUS) und das CSS-Snippet
//          `.obsidian/snippets/dashboard-spalten.css` (Raster + Karten-Look).
// =============================================================================
const cfg = Object.assign({ spalten: [], minBreite: 420, abstand: 18 }, input || {});

const container = dv.container;

const reihe = document.createElement("div");
reihe.className = "spaltenreihe";
reihe.style.setProperty("--spalte-min", `${cfg.minBreite}px`);
reihe.style.setProperty("--spalte-abstand", `${cfg.abstand}px`);
container.appendChild(reihe);

for (const s of cfg.spalten) {
    const spalte = document.createElement("div");
    spalte.className = "spalte";
    reihe.appendChild(spalte);

    if (s.titel) {
        const h = document.createElement("h4");
        h.className = "spalte-titel";
        h.textContent = String(s.titel);
        spalte.appendChild(h);
    }
    if (!s.view) continue;

    const start = container.childNodes.length;
    try {
        await dv.view(s.view, s.input || {});
    } catch (e) {
        const fehler = document.createElement("div");
        fehler.className = "spalte-fehler";
        fehler.textContent = `⚠️ ${s.view} konnte nicht geladen werden: ${e}`;
        spalte.appendChild(fehler);
    }
    // Alles, was der Unter-View neu angehängt hat, in die Spalte verschieben.
    Array.from(container.childNodes)
        .slice(start)
        .forEach(knoten => spalte.appendChild(knoten));
}
