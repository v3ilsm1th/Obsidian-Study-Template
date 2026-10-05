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
      01 Materialien/          # Skripte, Folien, PDFs, Zusammenfassungen
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
`status: offen | laeuft | fertig` (ggf. `block` für Unterteilungen wie
Unit/Part). Nur den Wert `status` aktualisieren –
die Dashboards zählen automatisch neu.

**Lektionen sind schlank:** Überblick, Materialien, Lernkarten,
Zusammenfassung – **keine Termine** in Lektionsnotizen (Termine gehören
ausschließlich nach `Termine/`).

## 3) Lernkarten generieren

Zielordner: `<Modulordner>/04 Lernkarten/`, Dateiname z. B.
`Lektion 1 - Einführung.md`. Format ist die **Einzeiler-Karte**
`Frage?::Antwort` – die einzige Schreibweise, die sowohl das
*Spaced-Repetition*-Plugin (`singleLineCardSeparator: "::"`) als auch das
*Flashcards*-Plugin (Anki-Export, `inlineSeparator: "::"`) lesen:

```markdown
---
modul: "12345"
lektion: "[[Lektion 1 - Einführung]]"
cards-deck: "Mein Fach::Lektion 1"
art: lernkarte
tags: [lernkarte]
---

#flashcards/Mein-Modul/Lektion-1

Was ist ein Ideal?::Teilmenge eines Rings, die unter den Ringoperationen abgeschlossen ist.

Nenne das neutrale Element von (R, +, 0).::0
```

Regeln (geprüft gegen die Parser beider Plugins,
`singleLineCardSeparator: "::"`, `multilineCardEndMarker: ""`):

- **Karte = genau eine Zeile:** `Frage?::Antwort`, Frage endet mit `?`,
  **Leerzeile** zwischen zwei Karten (sonst rutschen Überschriften oder
  Nachbarfragen in die Karte). Pro Zeile **genau ein `::`** – ein zweites
  würde an der falschen Stelle teilen, `:::` wäre eine umgekehrte Karte;
  Antworten ohne Doppel-Punkt formulieren (ggf. umformulieren).
- **Deck-Kopfzeile** `#flashcards/<Modulnr>/<Lektion>` als eigene Zeile mit
  Leerzeile davor und danach – davon hängt die SR-Erkennung ab. Ebenen mit
  `/` (Unterdeck). **Keine Leerzeichen** – Obsidian-Tags enden am
  Leerzeichen, sonst wird nur der Teil vor dem Leerzeichen als Deck erkannt
  (daher `Lektion-1`, nicht `Lektion 1`). Sie gehört in den Dateikörper,
  nicht ins Frontmatter.
- **`cards-deck` im Frontmatter** = Deck in Anki, Syntax
  `Übergeordnet::Unterdeck` (z. B. `Mein Fach::Lektion 1`). Fehlt die
  Eigenschaft, landet die Karte im Standarddeck `Studium`. Dieses `::` im
  Frontmatter ist unkritisch: beide Plugins lesen das Frontmatter getrennt
  vom Kartenkörper.
  **Nach dem Umbenennen** einer neu angelegten Karten-Notiz den Wert prüfen:
  die Vorlage schreibt den Dateititel zum Anlegen hinein, ein Rename ändert
  ihn **nicht** (sonst hängt das Deck in Anki unter „Unbenannt“).
- Deck-Kopf und `###`-Zwischenüberschriften von einer Leerzeile trennen.
- Nichts verwenden, was die Parser als Trenner liest: kein `==` (wäre eine
  Cloze-Karte), kein `??`, kein `---` als Trenner – und nicht das alte
  Mehrzeilen-Format (Frage / eigene Zeile `?` / Antwort).
- **Kontrolle SR:** Befehlspalette → *Spaced Repetition: Review flashcards*
  muss das Deck mit Kartenzahl zeigen – findet sie keine, stimmt das Format
  nicht (der Fehler bleibt sonst still). Ändert sich
  `singleLineCardSeparator` in
  `.obsidian/plugins/obsidian-spaced-repetition/data.json`, muss das Format
  mitgeändert werden.
- **Kontrolle Flashcards:** Lernkarten-Notiz offen → Statusleiste unten zeigt
  `Note: N cards, …`; wenn dort `excluded` oder `no cards` steht, stimmt
  Syntax oder Sync-Bereich nicht.
- **Anki-Export** (Plugin *Flashcards*, aktiviert): Voraussetzung sind
  **Anki (Desktop)** und das Add-on **AnkiConnect** (ID `2055492159`), dann
  Befehlspalette → **Flashcards: Update Anki from vault** (oder
  *… from current note*). Der Sync-Bereich steht in
  `.obsidian/plugins/flashcards-obsidian/data.json` →
  `syncScope.includedFolders` – beim Anlegen eines neuen Moduls den
  `04 Lernkarten`-Ordner dort ergänzen; Deck je Notiz über `cards-deck`,
  sonst `defaultDeck: "Studium"`. Beim ersten Sync ergänzt das Plugin pro
  Karte einen Anker ` ^q-xxxx` am Zeilenende und eine `flashcards:`-Eigenschaft
  – für SR unschädlich. Vorschau im Editor: `::` wird als Pfeil `→`
  dargestellt (`renderPreview.features.inlineSeparator`).

## 4) Materialien/Übungen verknüpfen

- **Dateien (PDF, Videos, …):** in `<Modul>/01 Materialien/` legen.
  Liegen sie in Unterordnern (z. B. **je Lektion/Unit/Kapitel**), entspricht
  der Ordnernamen **exakt** dem Dateinamen der Lektionsnotiz – dann zeigt
  der `dateien`-Aufruf **in der Lektionsnotiz** auf den eigenen Unterordner,
  der **im Dashboard** auf `01 Materialien` (recursiv + `gruppiert: true`).
- Dataview indexiert nur `.md`, deshalb listen Lektionen und Dashboards
  Dateien über
  `await dv.view("Views/dateien", { pfad: "…/01 Materialien", gruppiert: true })`
  (liest direkt `app.vault`). Fremdformate (z. B. `.ipynb`) markiert die View
  selbst mit einem Hinweis.
- **Übungsblätter/Abgaben:** in `<Modul>/02 Übungen/`.
  Übungs-Terminnotizen unter `Termine/` führen unter `## 📂 Unterlagen`
  den `[[…pdf|…]]`-Link, das Abgabedatum und ggf. den Lösungsvermerk.
  **Ausnahme Moodle-Tests:** Bei Modulen, deren Abgaben **online als Test**
  in Moodle geschrieben werden, gibt es keine Übungsblätter – `02 Übungen`
  bleibt leer, alle Abgaben sind `deadline: true`-Termine mit
  `typ: "Einsendeaufgabe"` (Frist/Uhrzeit stehen in der Terminnotiz).
- **Notizen:** in `01 Materialien/` mit Eigenschaft
  `lektion: "[[Lektion 1 - Einführung]]"` anlegen – sie erscheint dann
  automatisch als Quicklink in der Lektion.
- **Eigene Zusammenfassungen:** in `<Modul>/01 Materialien/Zusammenfassungen/`
  ablegen (Ordner-Vorlage `Templates/Zusammenfassung Template` = Ordner-
  Template von Templater, Eigenschaft `art: zusammenfassung`, `lektion`
  optional). Direkt unter dem Titel steht
  `await dv.view("Views/inhaltsverzeichnis", {})` – das Inhaltsverzeichnis
  baut sich aus den `##`/`###`-Überschriften der Notiz automatisch auf und
  aktualisiert sich live. Zugriff überall über die Übersichtsnotiz
  `<Modulnr> Zusammenfassungen` (Modulordner) und den Abschnitt
  `## 📝 Meine Zusammenfassungen` im Modul-Dashboard.

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
| `inhaltsverzeichnis.js` | `dv.view("Views/inhaltsverzeichnis", { minLevel?, maxLevel?, titel? })` | Inhaltsverzeichnis der aktuellen Notiz (live, aus den Überschriften) |
| `spalten.js` | `dv.view("Views/spalten", { spalten: [{ titel?, view, input? }, …], minBreite?, abstand? })` | legt mehrere Views **nebeneinander** (responsiv: schmal übereinander, viel Platz nebeneinander) |

**Views nur ändern, wenn ausdrücklich gewünscht.** Pfadangaben enthalten
Leerzeichen – immer in Anführungszeichen bzw. doppelten Backticks für
`dv.pages('"… Path …"')` verwenden. Nach JS-Änderungen ist ein Neuladen
(`Strg+R`) nötig.

**Breite & Spalten:** Die Seitenbreite kommt aus `.obsidian/app.json`
(`"readableLineLength": false`, Einstellungen → Editor → „Lesbare
Zeilenlänge"), das Raster/Karten-Look aus dem CSS-Snippet
`.obsidian/snippets/dashboard-spalten.css` (in `appearance.json` aktiviert).
Der **Monatskalender** hängt zusätzlich am Snippet
`.obsidian/snippets/kalender.css`: `Views/kalender.js` legt seine Knoten in
einen eigenen Wrapper mit der Klasse `kalender-block` (am `dv.container` geht
das nicht, weil `dv.view` ihn mit den Nachbar-Views teilt), das Snippet
begrenzt die Breite auf ~1120 px, baut das 7-Spalten-Raster mit Termin-Chips
und hebt den heutigen Tag hervor.
Zum Anordnen in den Dashboards die `spalten`-View verwenden (Beispiele in den
Dashboards); nach Änderungen an `.js`/CSS `Strg+R`. Die ` ```tasks `-Blöcke des
*Tasks*-Plugins bleiben **einzeln** (sie sind interaktiv und lassen sich nicht
in die Spalten-View übernehmen).

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
Todo-Listen („🗃️ Ohne Datum"), zählt aber im Checklisten-Balken mit
(beide Tags zählen mit).

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
