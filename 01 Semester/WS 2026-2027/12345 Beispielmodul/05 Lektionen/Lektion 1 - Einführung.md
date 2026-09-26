---
typ: lektion
modul: "12345"
nummer: 1
label: "Lektion 1"
titel: "Einführung"
status: fertig
tags:
  - lektion
---

# Lektion 1 – Einführung

> [!info] Überblick
> **Modul:** [[12345 Dashboard]]
> **Status:** `fertig` → im Eigenschaften-Panel auf `offen`/`laeuft`/`fertig` setzen

## 📚 Materialien & Quicklinks

```dataviewjs
await dv.view("Views/dateien", { pfad: "01 Semester/WS 2026-2027/12345 Beispielmodul/01 Materialien" })
```

## 🧠 Lernkarten

```dataview
LIST
WHERE contains(file.folder, "04 Lernkarten")
  AND contains(string(lektion), string(this.file.link))
SORT file.name
```

## 📝 Zusammenfassung / Notizen

- Wichtige Begriffe notiert
- Überblick über den Semesterplan

<!-- Hier die wichtigsten Punkte der Lektion festhalten.
     Termine gehören NIE hierher, sondern nach 01 Semester/<Semester>/Termine/. -->
