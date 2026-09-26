---
titel: Lernerfolgskontrolle
semester: WS 2026-2027
tags:
  - dashboard
---

# 📊 Lernerfolgskontrolle – WS 2026/2027

🏠 [[Semester Dashboard]] · 📅 [[Termine und Kalender]]

## 🎯 Gesamtübersicht & Detailansicht aller Module

```dataviewjs
await dv.view("Views/fortschritt", {})
```

## 🔁 Karten-Training (Spaced Repetition)

- Befehlspalette → **Spaced Repetition: Review flashcards**
- Statistik: Befehlspalette → *Spaced Repetition: View statistics*
- Decks liegen in den Ordnern `…/04 Lernkarten/` der Module
  (Kopfzeile `#flashcards/<Deck-Name>` in der Notiz)

## ⚙️ So wird der Fortschritt gepflegt

1. Lektionsnotiz öffnen (z. B. `05 Lektionen/Lektion 1 - …`).
2. Im **Eigenschaften-Panel** `status` ändern:
   `offen` → `laeuft` → `fertig`.
3. Die Balken/Tabellen in den Dashboards aktualisieren sich automatisch.

Neue Lektion/Kapitel anlegen: Eigenschaften `typ: lektion`, `modul`,
`nummer`, `label`, `titel`, `status` – oder Vorlage
`Templates/Lektion Template` nutzen (Templater).

> [!tip] Nur diese Werte zählen
> Die Views werten ausschließlich `typ: lektion` mit `modul` + `status` aus.
> Notizen ohne `status` bleiben außen vor (Materialien, Literatur, Karten).
