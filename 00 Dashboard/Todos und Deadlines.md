---
titel: Todos und Deadlines
semester: WS 2026-2027
tags:
  - dashboard
---

# ✅ Todos & Deadlines – WS 2026/2027

🏠 [[Semester Dashboard]] · 📅 [[Termine und Kalender]]

## 🔴 Abgaben & Einsendeaufgaben (alle Module)

```dataviewjs
await dv.view("Views/deadlines", {})
```

## ⚠️ Überfällige Todos

```tasks
not done
due before today
tag does not include checklist
sort by due
```

## 🔥 Heute & morgen fällig

```tasks
not done
due today
tag does not include checklist
```

```tasks
not done
due tomorrow
tag does not include checklist
```

## 📆 Nächste 14 Tage

```tasks
not done
due in next 14 days
tag does not include checklist
sort by due
```

## 📅 Später

```tasks
not done
due after today
path does not include 99 Journal
tag does not include checklist
sort by due
```

## 🗃️ Ohne Datum

```tasks
not done
no due date
path does not include 99 Journal
tag does not include checklist
sort by path
```

> [!tip] Checklisten & LMS-Reminder
> **`#checklist`** (Modul-Checklisten, Selbstchecks): erscheinen hier
> *nicht* – sie stehen direkt an ihrem Platz im jeweiligen Dashboard.
> **`#moodle`** (🎬 Videos/Recordings, 📄 Papers & Reading, Foren, Downloads
> im LMS): erscheinen dagegen **bewusst hier** als Reminder, auch ohne
> Datum – sie stehen im Abschnitt „🗃️ Ohne Datum".

## 🧰 Alle offenen Todos (Dataview-Ansicht)

```dataviewjs
await dv.view("Views/todo", {})
```

## ➕ Neue Todos

Einfach in einer Notiz anlegen:

```markdown
- [ ] Titel der Aufgabe 📅 2026-10-20
```

Die Datumsangabe `📅` wird vom *Tasks*-Plugin ausgewertet; Todos erscheinen
automatisch im passenden Modul-Dashboard.
