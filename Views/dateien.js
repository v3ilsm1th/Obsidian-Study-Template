// =============================================================================
// Views/dateien.js – Dateiliste für einen Ordner (inkl. PDFs, Videos, Bildern …)
// Dataview indexiert nur .md-Dateien – diese View liest direkt über `app.vault`.
// Aufruf:
//   await dv.view("Views/dateien", { pfad: "01 Semester/…/01 Materialien" })
//   await dv.view("Views/dateien", { pfad: "…/01 Materialien", gruppiert: true })
//   await dv.view("Views/dateien", { pfad: "…", rekursiv: false, nur: "pdf" })
// Parameter: pfad (Ordner), rekursiv (default true), gruppiert (Table statt Liste),
//            nur (z. B. "pdf")
// =============================================================================
const cfg = Object.assign({
    pfad: "",
    rekursiv: true,
    gruppiert: false,
    nur: null
}, input || {});

// Dateitypen, die Obsidian nicht selbst darstellen kann (Jupyter, Quellcode,
// Archive …). Dafür kommt ein Hinweis unter der Liste.
const NICHT_DARSTELLBAR = new Set([
    "ipynb", "py", "sh", "c", "h", "cpp", "java", "r",
    "csv", "tsv", "json", "xml", "yml", "yaml", "toml", "ini",
    "ova", "vdi", "vmdk", "zip", "tar", "gz", "7z"
]);

const anzeige = f => {
    const ext = (f.extension || "").toLowerCase();
    if (ext === "pdf") return f.basename + " 📄";
    if (ext === "ipynb") return "📓 " + f.name;
    if (NICHT_DARSTELLBAR.has(ext)) return "⚙️ " + f.name;
    return f.name;
};

let dateien = [];

if (typeof app !== "undefined" && app && app.vault) {
    dateien = app.vault.getFiles().filter(f => !f.name.startsWith("."));
    if (cfg.pfad) {
        const prefix = cfg.pfad.replace(/\/+$/, "") + "/";
        dateien = dateien.filter(f => f.path.startsWith(prefix));
        if (!cfg.rekursiv) {
            dateien = dateien.filter(f => f.path.slice(prefix.length).indexOf("/") === -1);
        }
    }
    if (cfg.nur) {
        const ext = String(cfg.nur).toLowerCase().replace(/^\./, "");
        dateien = dateien.filter(f => (f.extension || "").toLowerCase() === ext);
    }
    dateien.sort((a, b) => a.path.localeCompare(b.path, "de", { numeric: true }));
}

if (dateien.length === 0) {
    dv.paragraph("📁 Noch keine Dateien in diesem Ordner.");
} else if (cfg.gruppiert) {
    const zeilen = dateien.map(f => {
        const eltern = f.parent ? f.parent.path : "";
        const rel = cfg.pfad ? eltern.replace(cfg.pfad.replace(/\/+$/, ""), "") : eltern;
        const ordner = rel.replace(/^\//, "") || "–";
        return [ordner, dv.fileLink(f.path, false, anzeige(f))];
    });
    dv.table(["Ordner", "Datei"], zeilen);
} else {
    dv.list(dateien.map(f => dv.fileLink(f.path, false, anzeige(f))));
}

// Hinweis für Dateien ohne Obsidian-Darstellung (z. B. Jupyter-Notebooks)
const extern = dateien.filter(f =>
    NICHT_DARSTELLBAR.has((f.extension || "").toLowerCase()));
if (extern.length > 0) {
    const exts = [...new Set(extern.map(f => (f.extension || "").toLowerCase()))]
        .sort().map(e => "." + e).join(", ");
    dv.paragraph(
        "⚙️ **" + extern.length + " Datei(en)** (" + exts + ") lassen sich in " +
        "Obsidian nicht direkt anzeigen – Jupyter-Notebooks bearbeitest du in " +
        "der Kurs-VM (VirtualBox) im Jupyter Lab unter `http://localhost:8888/` " +
        "(Notebooks dort hochladen und durcharbeiten), andere Dateien mit dem " +
        "passenden Programm.");
}
