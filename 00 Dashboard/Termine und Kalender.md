---
titel: Termine und Kalender
semester: WS 2026-2027
tags:
  - dashboard
---

# 📅 Termine & Kalender – WS 2026/2027

🏠 [[Semester Dashboard]] · ✅ [[Todos und Deadlines]]

## 🗓️ Kalender (alle Module)

```dataviewjs
await dv.view("Views/kalender", {})
```

**Legende:** 📅 heute · 🔴 Abgabe/Deadline · • Termin · ✅ erledigt

## 📋 Alle Termine (chronologisch)

```dataviewjs
await dv.view("Views/termine", { tage: null })
```

## 🏫 Termine nach Modul

<!-- Pro Modul einen Block kopieren und `modul` ersetzen. -->

```dataviewjs
await dv.view("Views/termine", { modul: "12345", tage: null })
```

## ➕ Neuen Termin eintragen

1. **Manuell:** Neue Notiz in `01 Semester/WS 2026-2027/Termine/` anlegen
   (Templater schaltet automatisch auf die *Termin-Vorlage* um),
   Dateiname z. B. `2026-11-02 - 12345 Tutorium Lektion 4`.
2. **Per KI-Assistent (optional):** z. B. *„Trage am 03.11.2026 um 18:00 ein
   Online-Tutorium für Lektion 4 in Modul 12345 ein"* – die Regeln stehen
   in `AGENTS.md`.

**Pflichtfelder:** `titel`, `kurz`, `datum` (`YYYY-MM-DD`), `zeit`, `modul`,
`typ`, `lesson`, `deadline`, `upload`, `status`, `tags: [termin]`

> [!warning] `deadline: true` nur bei echten Abgaben
> Davon hängen alle Abgaben-Übersichten ab.
