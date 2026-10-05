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
  (Deck-Kopfzeile `#flashcards/<Modulnr>/<Lektion>`, ohne Leerzeichen,
  Ebenen mit `/`)
- Kartenformat: **eine Zeile je Karte** `Frage?::Antwort`, Leerzeile
  zwischen den Karten – Details in `AGENTS.md` §3
- Kontrolle: *Review flashcards* muss das Deck mit Kartenzahl zeigen,
  sonst wurde die Datei nicht erkannt

## 📦 Anki-Export (Plugin *Flashcards*)

- Community-Plugin **Flashcards** ist aktiviert; Sync-Bereich = die
  `04 Lernkarten`-Ordner, Standarddeck `Studium`, Deck je Notiz über
  `cards-deck` im Frontmatter (Vorschau: `::` wird als Pfeil `→` dargestellt)
- Voraussetzung: **Anki (Desktop)** läuft + Add-on **AnkiConnect**
  (ID `2055492159`)
- Export: Befehlspalette → **Flashcards: Update Anki from vault**
  (oder *… from current note*)
- Statusleiste zeigt bei offener Lernkarten-Notiz `Note: N cards, …`;
  beim ersten Sync ergänzt das Plugin Anker ` ^q-xxxx` und eine
  `flashcards:`-Eigenschaft (unschädlich für Spaced Repetition)

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
