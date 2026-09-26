---
titel: Semester Dashboard
semester: WS 2026-2027
tags:
  - dashboard
---

# 🎓 Semester Dashboard – Wintersemester 2026/2027

> [!abstract] Schnellzugriff
> 📅 [[Termine und Kalender]] · ✅ [[Todos und Deadlines]] · 📊 [[Lernerfolgskontrolle]] · 🔗 [[Links und Ressourcen]]

```dataviewjs
const heute = dv.luxon.DateTime.now();
const tagesPfad = `99 Journal/Tage/${heute.toFormat("yyyy-MM-dd")}`;
const kw = `${heute.weekYear}-W${String(heute.weekNumber).padStart(2, "0")}`;
const wochenPfad = `99 Journal/Wochen/${kw}`;
dv.paragraph(`📓 **Journal:** [[${tagesPfad}|Heute, ${heute.toFormat("dd.MM.yyyy")}]] · [[${wochenPfad}|Diese Woche (KW ${kw})]] · Sidebar-Kalender → Tagesnotiz erstellen`);
```

## 📌 Meine Module

<!-- Eine Zeile pro Modul: Nummer, Emoji, Name und der Link aufs Modul-Dashboard.
     Das Beispielmodul kannst du löschen, sobald deine eigenen Module stehen. -->

| Modul | Dashboard |
| --- | --- |
| 📚 12345 Beispielmodul | [[12345 Dashboard]] |

## ⏰ Nächste Termine (alle Module, 21 Tage)

```dataviewjs
await dv.view("Views/termine", { tage: 21 })
```

## 🔴 Abgaben & Einsendeaufgaben

```dataviewjs
await dv.view("Views/deadlines", {})
```

## 📅 Kalender – alle Termine des Semesters

```dataviewjs
await dv.view("Views/kalender", {})
```

## 📊 Lernerfolg – alle Module

```dataviewjs
await dv.view("Views/fortschritt", { details: false })
```

→ Details mit allen Lektionen/Kapiteln: [[Lernerfolgskontrolle]]

## ✅ Offene Todos

```tasks
not done
tag does not include checklist
sort by due
```

> [!tip] Checklisten & LMS-Reminder
> Aufgaben mit dem Tag `#checklist` (Modul-Checklisten) bleiben bewusst aus
> diesen Listen heraus – sie werden direkt im jeweiligen Modul-Dashboard
> abgehakt.
> Einträge mit `#moodle` (🎬 Videos, 📄 Papers, Foren, Downloads im LMS)
> erscheinen dagegen als Reminder in den Todo-Listen, auch ohne Datum.

## 📓 Journal & Wochenrückblick

- 📅 **Tagesnotiz:** über den Kalender in der Sidebar (Plugin *Calendar*) oder [[99 Journal/Tage/|Ordner]]
- 🗓️ **Wochennotiz:** `99 Journal/Wochen/2026-W41` – zeigt automatisch Termine + fällige Todos der Woche
- 🧠 **Lernkarten üben:** Befehlspalette → *Spaced Repetition: Review flashcards*

## 🔗 Wichtige Links

- 🎓 LMS/Moodle – *Link unter [[Links und Ressourcen]] eintragen*
- 📖 Einrichtung & Konventionen: [README](../README.md), [AGENTS](../AGENTS.md)
