---
modul: "12345"
titel: Beispielmodul
semester: WS 2026-2027
tags:
  - dashboard
  - modul
---

# 📚 12345 – Beispielmodul

> [!info] Das ist ein Beispiel zum Ausprobieren
> Sobald deine eigenen Module stehen, kannst du diesen Ordner
> (`12345 Beispielmodul`) löschen – dazu die Zeile in der
> [[Semester Dashboard|Modul-Tabelle]] und den Block „Termine nach Modul"
> in [[Termine und Kalender]] entfernen.

🏠 [[Semester Dashboard]] · 📅 [[Termine und Kalender]] · ✅ [[Todos und Deadlines]] · 🔗 [[Links und Ressourcen]]

## 📊 Lernerfolg & Lektionen

```dataviewjs
await dv.view("Views/fortschritt", { modul: "12345" })
```

## ✅ Material-Checkliste

> [!tip] So funktioniert eine Modul-Checkliste
> `#checklist` → hier abhaken, bleibt aus den globalen Todo-Listen ·
> `#moodle` → Aufruf im LMS, erscheint **zusätzlich** als Reminder in den
> Todo-Listen. Der Balken zählt **beide Tags**.

```dataviewjs
const alle = dv.current().file.tasks
    .where(t => {
        const s = t.text || "";
        return s.includes("#checklist") || s.includes("#moodle");
    })
    .array();
const fertig = alle.filter(t => t.completed).length;
const gesamt = alle.length;
const anteil = gesamt ? Math.round((fertig / gesamt) * 100) : 0;
const balken = gesamt ? "▰".repeat(fertig) + "▱".repeat(gesamt - fertig) : "";
dv.paragraph(`**${fertig} von ${gesamt}** Einträgen erledigt (**${anteil} %**)  ${balken}`);
```

**Beispiel-Einträge** (einfach überschreiben)
- [ ] 📖 Skript Lektion 1 gelesen #checklist
- [ ] 📝 Übungsblatt 1 bearbeitet #checklist
- [ ] 🎬 Video zur Lektion 2 ansehen #moodle
- [ ] ⬆️ Einsendeaufgabe 1 hochgeladen #checklist

## ⏰ Nächste Termine (30 Tage)

```dataviewjs
await dv.view("Views/termine", { modul: "12345", tage: 30 })
```

## 🔴 Abgaben & Deadlines

```dataviewjs
await dv.view("Views/deadlines", { modul: "12345" })
```

## 📅 Kalender 12345 – Beispielmodul

```dataviewjs
await dv.view("Views/kalender", { modul: "12345" })
```

## ✅ Todos

- [ ] Erste Lektion durcharbeiten und `status` auf `laeuft` setzen
- [ ] Eigene Notizen in `Inbox/` ablegen und einsortieren
- [ ] LMS-Links unter [[Links und Ressourcen]] eintragen 📅 2026-10-05

```dataviewjs
await dv.view("Views/todo", { pfad: "12345 Beispielmodul" })
```

> [!example]- 📂 Materialien & Skripte
> ```dataviewjs
> await dv.view("Views/dateien", { pfad: "01 Semester/WS 2026-2027/12345 Beispielmodul/01 Materialien", gruppiert: true })
> ```

> [!example]- 📝 Übungen & Abgaben
> ```dataviewjs
> await dv.view("Views/dateien", { pfad: "01 Semester/WS 2026-2027/12345 Beispielmodul/02 Übungen" })
> ```

> [!example]- 📖 Literatur
> ```dataviewjs
> await dv.view("Views/dateien", { pfad: "01 Semester/WS 2026-2027/12345 Beispielmodul/03 Literatur" })
> ```

> [!example]- 🧠 Lernkarten
> ```dataviewjs
> await dv.view("Views/dateien", { pfad: "01 Semester/WS 2026-2027/12345 Beispielmodul/04 Lernkarten" })
> ```

## 📚 Schnellzugriff

- 📂 `01 Materialien` (Skripte, Folien, PDFs – Unterordner je Lektion möglich)
- 📝 `02 Übungen` (Übungsblätter & Abgaben)
- 📖 `03 Literatur` (Bücher, Paper, Links)
- 🧠 `04 Lernkarten` (Spaced-Repetition-Decks)
- 📘 `05 Lektionen` (Lektionen/Kapitel mit Status & Quicklinks)

## 🔗 LMS & Links

- 🎓 Kurs-Link: *(unter [[Links und Ressourcen]] eintragen)*
- 📖 Aufbau dieses Dashboards ist die Vorlage für alle weiteren Module
