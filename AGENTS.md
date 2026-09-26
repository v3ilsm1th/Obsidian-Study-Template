# AGENTS.md – Konventionen für KI-Assistenten in diesem Vault

Dieser Vault ist ein **semesterweises Studien-Management-System** (Obsidian).
Halte dich beim Anlegen/Bearbeiten von Notizen an diese Regeln.
(Eine ausführliche Anleitung für *Menschen* steht in `README.md`.)

## Ordnerstruktur

```
00 Dashboard/                  # Semester-Dashboards & Übersichten
01 Semester/<Semester>/        # z. B. "WS 2026-2027"
   Termine/                    # EINE Notiz pro Termin (siehe Felder unten)
   <Modulnr> <Modulname>/
      <Modulnr> Dashboard.md   # Modul-Dashboard (Kalender, Todos, Fortschritt)
      01 Materialien/          # Skripte, Folien, PDFs
      02 Übungen/              # Übungsblätter & Abgaben
      03 Literatur/            # Bücher, Paper, Links
      04 Lernkarten/           # Spaced-Repetition-Decks
      05 Lektionen/            # eine Notiz je Lektion/Kapitel (Fortschritt)
99 Journal/Tage/               # Tagesnotizen (Calendar-Plugin)
99 Journal/Wochen/             # Wochennotizen
Templates/                     # Vorlagen (Templater)
Views/                         # Dataview-JS-Views (nur ändern, wenn nötig)
Inbox/                         # Schnelleinstieg
Attachments/                   # eingebettete Dateien
Archiv/                        # abgeschlossene Semester
```

Module erkennt man am Ordnernamen `Modulnr Modulname`; die Nummer steht
zusätzlich in den Eigenschaften (`modul: "12345"`) jeder zugehörigen Notiz.

## 1) Neuen Termin eintragen

Datei: `01 Semester/<Semester>/Termine/YYYY-MM-DD - <Modulnr> <Titel>.md`
(Nutzung der Vorlage `Templates/Termin Template` ist Pflicht, wenn Templater
Folder-Templates aktiv sind; sonst die Felder manuell setzen.)

```yaml
---
titel: "Tutorium Lektion 4"
kurz: "Tut L4"            # kurze Bezeichnung für Kalender-Zellen
datum: 2026-11-02         # YYYY-MM-DD, Pflichtfeld
zeit: "18:00–20:00"       # "" falls keine Uhrzeit
modul: "12345"
typ: "Tutorium"           # Tutorium | Übung | Video-Meeting | Lerngruppe | Einsendeaufgabe | Prüfung
lesson: 4                 # Nummer der zugehörigen Lektion oder null
deadline: false           # true NUR für echte Abgaben/Einsendeaufgaben
upload: false             # true wenn Hochladen nötig
status: offen             # offen | erledigt | verschoben
tags:
  - termin
---
```

Danach den üblichen Notiz-Body wie in den bestehenden Terminen
(Verweis aufs Modul-Dashboard, „Verbunden"-Links zur Lektion).

**Wichtig:** Nur `deadline: true` setzen, wenn wirklich abgegeben werden
muss – davon hängen die Deadlines-Übersichten ab.

## 2) Fortschritt / Lernerfolg ändern

Lektionsnotizen haben `typ: lektion`, `modul`, `nummer`, `label`, `titel`,
`status: offen | laeuft | fertig`. Nur den Wert `status` aktualisieren –
die Dashboards zählen automatisch neu.

**Lektionen sind schlank:** Überblick, Materialien, Lernkarten,
Zusammenfassung – **keine Termine** in Lektionsnotizen (Termine gehören
ausschließlich nach `Termine/`).

## 3) Lernkarten generieren

Zielordner: `<Modulordner>/04 Lernkarten/`, Dateiname z. B.
`Lektion 3 - Ringe.md`. Format für das *Spaced-Repetition*-Plugin:

```markdown
---
modul: "12345"
lektion: "[[Lektion 1 - Einführung]]"
art: lernkarte
tags: [lernkarte]
---

#flashcards/Mein Deck

Was ist ein Ideal?
Teilmenge eines Rings, die unter den Ringoperationen abgeschlossen ist.
---
```

Regeln: Frage endet mit `?`, Antwort folgt, Karten mit `---` trennen,
Deck-Kopfzeile `#flashcards/<Deck>`.

## 4) Materialien/Übungen verknüpfen

- **Dateien (PDF, Videos, …):** in `<Modul>/01 Materialien/` legen.
  Liegen sie in Unterordnern (z. B. **je Lektion/Unit/Kapitel**), entspricht
  der Ordnernamen **exakt** dem Dateinamen der Lektionsnotiz – dann zeigt
  der `dateien`-Aufruf **in der Lektionsnotiz** auf den eigenen Unterordner,
  der **im Dashboard** auf `01 Materialien` (recursiv + `gruppiert: true`).
- Dataview indexiert nur `.md`, deshalb listen Lektionen und Dashboards
  Dateien über
  `await dv.view("Views/dateien", { pfad: "…/01 Materialien" })`
  (liest direkt `app.vault`). Fremdformate (z. B. `.ipynb`) markiert die View
  selbst mit einem Hinweis.
- **Übungsblätter/Abgaben:** in `<Modul>/02 Übungen/`.
  Übungs-Terminnotizen unter `Termine/` führen unter `## 📂 Unterlagen`
  den `[[…pdf|…]]`-Link und das Abgabedatum.
- **Notizen:** in `01 Materialien/` mit Eigenschaft
  `lektion: "[[Lektion 1 - Einführung]]"` anlegen – sie erscheint dann
  automatisch als Quicklink in der Lektion.

## 5) Dashboards / Views

Views in `Views/` (Dataview-JS) werden in den Dashboards so aufgerufen:

| View | Aufruf | Inhalt |
| --- | --- | --- |
| `kalender.js` | `dv.view("Views/kalender", { modul?, von?, bis? })` | Monatskalender |
| `termine.js` | `dv.view("Views/termine", { modul?, tage? })` | nächste Termine, Countdown |
| `deadlines.js` | `dv.view("Views/deadlines", { modul?, zeigeErledigt? })` | Abgaben |
| `fortschritt.js` | `dv.view("Views/fortschritt", { modul?, details? })` | Lernerfolg |
| `todo.js` | `dv.view("Views/todo", { pfad?, tage? })` | offene Todos |
| `woche.js` | `dv.view("Views/woche", { von?, bis? })` | Journal-Wochenansicht |
| `dateien.js` | `dv.view("Views/dateien", { pfad, rekursiv?, gruppiert?, nur? })` | Dateien eines Ordners inkl. PDFs |

**Views nur ändern, wenn ausdrücklich gewünscht.** Pfadangaben enthalten
Leerzeichen – immer in Anführungszeichen bzw. doppelten Backticks für
`dv.pages('"… Path …"')` verwenden. Nach JS-Änderungen ist ein Neuladen
(`Strg+R`) nötig.

## 6) Todos

Todos sind normale Markdown-Task-Einträge mit Fälligkeit:

```markdown
- [ ] Einsendeaufgabe hochladen 📅 2026-10-20
```

Checklisten-Aufgaben (Modul-Checklisten im Dashboard, Selbstchecks) zusätzlich
mit `#checklist` taggen – sie bleiben sonst in den globalen Listen und zählen
in der Checklisten-Fortschrittsanzeige (`dv.current().file.tasks`) mit.

**Zweiter Tag `#moodle`:** alles, was man im LMS (Moodle o. ä.) aufruft –
🎬 Videos/Recordings, 📄 Papers/Readings, Foren, Downloads – bekommt
`#moodle` **statt** `#checklist` – erscheint zusätzlich als Reminder in den
Todo-Listen („🗃️ Ohne Datum"), zählt aber im Checklisten-Balken mit.

## 7) Typische Anfragen

- **„Welche Deadlines stehen im Oktober an?"** → `deadlines`-View mit
  `von: "2026-10-01", bis: "2026-10-31"` bzw. Notizen in `Termine/` mit
  `deadline: true` und passendem `datum`.
- **„Termine des Moduls X"** → `termine`-View mit `modul: "<Nr>"`.
- **„Fortschritt"** → `fortschritt`-View bzw. `status`-Eigenschaften auswerten.
- **Neue Termine aus einer Übersicht übernehmen** → Dateien wie in (1) anlegen.

## Sprache

Alle Notizen auf Deutsch (außer englische Originalbegriffe wie „Exercise",
„Unit", „Study Group").
