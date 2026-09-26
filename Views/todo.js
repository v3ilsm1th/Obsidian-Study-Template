// =============================================================================
// Views/todo.js – Offene Todos als Liste (Dataview-Variante der Tasks-Queries)
// Aufruf:
//   await dv.view("Views/todo", {})                     // alle offenen Todos
//   await dv.view("Views/todo", { pfad: "Beispielmodul" }) // nur diesen Ordner
//   await dv.view("Views/todo", { tage: 14 })           // nur bis +14 Tage
// =============================================================================
const cfg = Object.assign({
    pfad: null,
    tage: null,
    max: 60,
    zeigeOhneDatum: true
}, input || {});

const lux = dv.luxon;
const heute = lux.DateTime.now().startOf("day");

let seiten = dv.pages();
if (cfg.pfad) seiten = seiten.where(p => p.file.path.includes(cfg.pfad));

let aufgaben = seiten.file.tasks
    .where(t => !t.completed && !(t.text || "").includes("#checklist"))
    .array();

if (cfg.tage != null) {
    const grenze = heute.plus({ days: cfg.tage });
    aufgaben = aufgaben.filter(t =>
        t.due ? t.due.startOf("day") <= grenze : cfg.zeigeOhneDatum);
}

aufgaben.sort((a, b) => {
    if (a.due && b.due) return a.due.toMillis() - b.due.toMillis();
    if (a.due) return -1;
    if (b.due) return 1;
    return 0;
});
aufgaben = aufgaben.slice(0, cfg.max);

if (aufgaben.length === 0) {
    dv.paragraph("🎉 Keine offenen Todos.");
} else {
    dv.taskList(aufgaben, false);
}
