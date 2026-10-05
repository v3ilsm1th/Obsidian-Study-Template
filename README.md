# 🎓 Obsidian Studium Vault – Gerüst & Einrichtungsanleitung

> [!abstract] Was ist das?
> Ein **leeres Gerüst** für die eigene Studienorganisation: Ordnerstruktur,
> Dashboards, Kalender, Todo-/Deadline-Übersichten, Fortschrittsverfolgung,
> Lernkarten und Vorlagen. **Keine fremden Studienunterlagen** – nur ein
> Beispielmodul, das du nach Belieben umbenennst oder löschst.

**Inhalt**
1. [Voraussetzungen](#1-voraussetzungen) ·
2. [Einrichtung in 6 Schritten](#2-einrichtung-in-6-schritten) ·
3. [Die Struktur erklärt](#3-die-struktur-erklärt) ·
4. [Rundgang: Das Beispielmodul](#4-rundgang-das-beispielmodul) ·
5. [Eigenes Modul anlegen](#5-eigenes-modul-anlegen-rezept) ·
6. [Semester anlegen/duplizieren](#6-semester-anlegen-oder-duplizieren) ·
7. [Konventionen](#7-konventionen-dates-und-eigenschaften) ·
8. [Views & Dashboards](#8-views--dashboards) ·
9. [Tägliche Routine](#9-tägliche-routine) ·
10. [Lernkarten](#10-lernkarten-spaced-repetition) ·
11. [Häufige Probleme](#11-häufige-probleme-faq) ·
12. [Für KI-Assistenten](#12-für-ki-assistenten)

---

## 1. Voraussetzungen

- **[Obsidian](https://obsidian.md/)** (kostenlos, Desktop – Windows/macOS/Linux)
  Die Konfiguration und alle wichtigsten Plugins liegen **bereits im Ordner**
  mit – du musst nichts suchen, nur prüfen und freigeben.
- Optional: ein KI-Assistent, der `AGENTS.md` liest (Abschnitt 12).

## 2. Einrichtung in 6 Schritten

1. **Vault öffnen:** Obsidian starten → *„Vault öffnen"* (bzw. „Open folder
   as vault") → den Ordner **`Obsidian Studium Vault`** auswählen.
2. **Plugins freigeben:** Beim ersten Öffnen fragt Obsidian nach
   *Community-Plugins* → zustimmen. Dann unter
   **Einstellungen → Community-Plugins** prüfen, dass diese aktiv sind:
   `Dataview`, `Templater`, `Tasks`, `Calendar`, `Spaced Repetition`,
   `Flashcards`, `Style Settings` (plus optional `obsidian-git`,
   `opencode`, `Excalidraw`, `Kanban`, `Notebook Navigator`, `JupyMD`).
3. **Wichtige Einstellungen kontrollieren:**
   | Stelle | Muss stehen auf |
   | --- | --- |
   | Einstellungen → **Dataview** | ☑ *Enable JavaScript Queries* (**sonst bleiben alle Dashboards leer!**) |
   | Einstellungen → **Editor** | „Lesbare Zeilenlänge" **AUS** (sonst sind die Dashboards schmal) |
   | Einstellungen → **Templater** | Vorlagen-Ordner `Templates` · ☑ *Trigger Templater on new file creation* |
   | Einstellungen → **Templates** (Core) | Vorlagen-Ordner `Templates` |
   | Einstellungen → **Tägliche Notizen** (Core) | Ordner `99 Journal/Tage` · Format `YYYY-MM-DD` · Vorlage `Templates/Tages Journal Template` |
   | Einstellungen → **Dateien und Links** | Attachments `Attachments` · neue Dateien nach `Inbox` · ☑ *Wikilinks* |
4. **Neu laden:** `Strg+R` (macOS `Strg+R`/`Cmd+R`) – damit Views und
   Farben greifen.
5. **Rundgang:** [Start](Welcome.md) öffnen und mit dem
   `12345 Beispielmodul` spielen (Abschnitt 4).
6. **Anpassen:** Semester-/Modulnamen ändern, Links in
   `00 Dashboard/Links und Ressourcen` eintragen – dann gehört der Vault dir.

> [!tip] Alles schon konfiguriert
> `.obsidian/` enthält App-, Plugin- und Kalender-Einstellungen. Du musst nur
> Schritt 2–3 bestätigen. Nach dem Freigeben evtl. einmal `Strg+R`.

## 3. Die Struktur erklärt

```
Obsidian Studium Vault/
├── README.md                 # diese Anleitung
├── Welcome.md                # kurzer Startpunkt
├── AGENTS.md                 # Konventionen (auch für KI-Assistenten)
├── 00 Dashboard/              # Semester-Übersichten (Termine, Todos, Lernerfolg, Links)
├── 01 Semester/
│   └── WS 2026-2027/          # ein Ordner pro Semester
│       ├── Termine/           # EINE Notiz pro Termin (siehe Vorlage)
│       └── 12345 Beispielmodul/
│           ├── 12345 Dashboard.md   # Modul-Dashboard
│           ├── 12345 Zusammenfassungen.md  # Übersicht eigener Zusammenfassungen
│           ├── 01 Materialien/      # Skripte, Folien, PDFs + Unterordner
│           │   └── Zusammenfassungen/      # eigene Zusammenfassungen (TOC-Template)
│           ├── 02 Übungen/          # Übungsblätter & Abgaben
│           ├── 03 Literatur/        # Bücher, Paper, Links
│           ├── 04 Lernkarten/       # Spaced-Repetition-Decks
│           └── 05 Lektionen/        # eine Notiz je Lektion/Kapitel (Fortschritt)
├── 99 Journal/Tage/           # Tagesnotizen (Plugin Calendar)
├── 99 Journal/Wochen/         # Wochennotizen
├── Templates/                 # Vorlagen (Termin, Lektion, Karten, Journal …)
├── Views/                     # Dataview-JS-Views (nicht anfassen, wenn nicht nötig)
├── Inbox/                     # Schnelleinstieg (neue Dateien landen hier)
├── Attachments/               # eingebettete Dateien
└── Archiv/                    # abgeschlossene Semester
```

## 4. Rundgang: Das Beispielmodul

| Was | Wo | Zeigt |
| --- | --- | --- |
| Gesamt-Dashboard | `00 Dashboard/Semester Dashboard` | alle Module, nächste Termine, Abgaben, Kalender, Todos |
| Modul-Dashboard | `01 Semester/WS 2026-2027/12345 Beispielmodul/12345 Dashboard` | Lernerfolg-Balken, Termine, Todos, Materiallisten |
| Fortschritt | `00 Dashboard/Lernerfolgskontrolle` | `offen` → `laeuft` → `fertig` je Lektion |
| Abgaben | `00 Dashboard/Todos und Deadlines` | überfällig/heute/14 Tage/… |
| Termine | `00 Dashboard/Termine und Kalender` | Monatskalender + chronologische Liste |
| Lernkarten | `04 Lernkarten/…` + Befehlspalette *Spaced Repetition: Review flashcards* | Karten üben |

Das Beispiel enthält 3 Lektionen (unterschiedliche Status), 2 Termine
(einen davon als Abgabe), ein kleines Karten-Deck und die
Zusammenfassungs-Übersicht – damit alle Views sofort Daten zeigen.

## 5. Eigenes Modul anlegen (Rezept)

1. **Ordner anlegen** unter `01 Semester/<Semester>/`:
   ```
   <Modulnr> <Modulname>/
      <Modulnr> Dashboard.md
      <Modulnr> Zusammenfassungen.md
      01 Materialien/
         Zusammenfassungen/
      02 Übungen/
      03 Literatur/
      04 Lernkarten/
      05 Lektionen/
   ```
2. **Modul-Dashboard:** `12345 Dashboard.md` kopieren, umbenennen, die
   Beispiel-Bezeichner (`12345`) durch deine Nummer ersetzen.
3. **Zusammenfassungs-Übersicht:** `12345 Zusammenfassungen.md` kopieren,
   umbenennen und den `pfad:` im `dateien`-Aufruf an den neuen Ordner anpassen.
4. **Lektionen:** neue Datei in `05 Lektionen/` → Vorlage
   `Templates/Lektion Template` (Templater fragt die Modul-Nummer).
5. **Tabelle im Semester-Dashboard:** unter „Meine Module" eine Zeile ergänzen.
6. **Links:** Modul in `00 Dashboard/Links und Ressourcen` eintragen.
7. **Sync-Bereiche pflegen:** `.obsidian/plugins/flashcards-obsidian/data.json`
   → `syncScope.includedFolders` um `…/<Dein Modul>/04 Lernkarten` ergänzen.
8. *(Optional)* **Templater:** Einstellungen → Templater → *Folder Templates*
   prüfen – für jedes Modul sollten gelten:
   `…/05 Lektionen` → `Lektion Template`,
   `…/01 Materialien/Zusammenfassungen` → `Zusammenfassung Template`,
   `…/04 Lernkarten` → `Lernkarten Template`,
   `…/01 Materialien`, `…/02 Übungen`, `…/03 Literatur` → `Material Template`.
9. **Beispielmodul entfernen:** Ordner `12345 Beispielmodul` löschen, die
   Zeile in der Modul-Tabelle und die Spalte „Termine nach Modul" streichen.

## 6. Semester anlegen (oder duplizieren)

1. `01 Semester/<Neues Semester>/` anlegen (z. B. `WS 2027-2028`),
   darin `Termine/` und die Modulordner.
2. Die fünf Notizen in `00 Dashboard/` umbenennen/fortschreiben
   (`semester:` in den Eigenschaften anpassen).
3. Vorheriges Semester: Ordner nach `Archiv/` verschieben.
4. Tägliche Notizen laufen automatisch weiter (`99 Journal/Tage`).

## 7. Konventionen (Dates & Eigenschaften)

**Dateinamen**
| Art | Muster | Beispiel |
| --- | --- | --- |
| Termin | `YYYY-MM-DD - <Modulnr> <Titel>` | `2026-11-02 - 12345 Tutorium Lektion 4` |
| Lektion | `Lektion <nr> - <Titel>` | `Lektion 1 - Einführung` |
| Material | Originalname aus Moodle/Skript lassen | `Skript_Kapitel2.pdf` |

**Eigenschaften einer Terminnotiz** (Pflicht: `titel`, `kurz`, `datum`):

```yaml
titel: "Tutorium Lektion 4"
kurz: "Tut L4"
datum: 2026-11-02
zeit: "18:00–20:00"
modul: "12345"
typ: "Tutorium"          # Tutorium | Übung | Video-Meeting | Lerngruppe | Einsendeaufgabe | Prüfung
lesson: 4                # Nummer der zugehörigen Lektion oder null
deadline: false          # NUR true, wenn wirklich abgegeben werden muss
upload: false            # true, wenn Hochladen nötig
status: offen            # offen | erledigt | verschoben
tags:
  - termin
```

> [!warning] `deadline: true` nur bei echten Abgaben
> Davon hängen **alle** Deadline-Übersichten ab.

**Lektionen:** `typ: lektion`, `modul`, `nummer`, `label`, `titel`,
`status: offen | laeuft | fertig` (ggf. `block` für Unterteilungen wie
Unit/Part) – den `status` ändern genügt, die
Dashboards zählen automatisch neu. Lektionen bleiben schlank
(Überblick, Materialien, Karten, Zusammenfassung) – **Termine gehören
ausschließlich nach `Termine/`**.

**Todos** sind normale Tasks mit Fälligkeit:

```markdown
- [ ] Übungsblatt bearbeiten 📅 2026-10-20
```

**Zwei Ausblend-Tags:**
- `#checklist` → Aufgaben aus Modul-Checklisten: bleiben **außerhalb** der
  globalen Todo-Listen, werden im jeweiligen Dashboard abgehakt.
- `#moodle` → Aufrufe, die man in Moodle machen muss (Videos, Papers, Foren):
  erscheinen **zusätzlich** als Reminder in den Todo-Listen („🗃️ Ohne Datum"),
  zählen aber im Checklisten-Balken mit.

## 8. Views & Dashboards

| View | Aufruf | Inhalt |
| --- | --- | --- |
| `kalender.js` | `dv.view("Views/kalender", { modul?, von?, bis? })` | Monatskalender |
| `termine.js` | `dv.view("Views/termine", { modul?, tage? })` | nächste Termine, Countdown |
| `deadlines.js` | `dv.view("Views/deadlines", { modul?, zeigeErledigt? })` | Abgaben |
| `fortschritt.js` | `dv.view("Views/fortschritt", { modul?, details? })` | Lernerfolg |
| `todo.js` | `dv.view("Views/todo", { pfad?, tage?, max? })` | offene Todos |
| `woche.js` | `dv.view("Views/woche", { von?, bis? })` | Journal-Wochenansicht |
| `dateien.js` | `dv.view("Views/dateien", { pfad, rekursiv?, gruppiert?, nur? })` | Dateien eines Ordners inkl. PDFs |
| `inhaltsverzeichnis.js` | `dv.view("Views/inhaltsverzeichnis", { minLevel?, maxLevel?, titel? })` | Inhaltsverzeichnis der aktuellen Notiz (live, aus den Überschriften) |
| `spalten.js` | `dv.view("Views/spalten", { spalten: [{ titel?, view, input? }, …] })` | mehrere Views **nebeneinander** (responsiv) |

> [!note] Warum eine eigene Datei-View?
> Dataview indexiert nur `.md`. `dateien.js` liest direkt über `app.vault`
> und listet auch PDFs, Notebooks usw. – Fremdtypen markiert sie mit 📓/⚙️
> und einem Hinweis, wie man sie öffnet.

**Views nur ändern, wenn es nötig ist** – nach jeder Änderung `Strg+R`.
Pfadangaben enthalten Leerzeichen: immer in Anführungszeichen schreiben.

**Layout: volle Breite & Spalten.** „Lesbare Zeilenlänge" ist aus
(`.obsidian/app.json`), damit die Dashboards die ganze Seitenbreite nutzen.
Abschnitte stehen mit der `spalten`-View nebeneinander (Raster + Karten-Look
aus dem Snippet `dashboard-spalten.css`), der Kalender hat sein eigenes
Snippet `kalender.css`: feste 7-Spalten-Breite statt Überbreite,
Wochenende-Schattierung, jeder Termin als „Chip" und der heutige Tag
hervorgehoben. Beide Snippets sind unter **Einstellungen →
Erscheinungsbild → CSS-Snippets** aktiviert; nach Änderungen `Strg+R`.

## 9. Tägliche Routine

1. **Morgens:** Kalender in der Sidebar (Plugin *Calendar*) anklicken →
   Tagesnotiz öffnen → `📅 Termine & Todos heute` füllt sich automatisch.
2. **Todos** in `00 Dashboard/Todos und Deadlines` prüfen (Fälligkeiten mit `📅`).
3. **Abgaben** unter „⏰ Nächste Termine & 🔴 Abgaben" im
   `00 Dashboard/Semester Dashboard` bzw. „🔴 Abgaben & ⏰ offene Todos" in
   `00 Dashboard/Todos und Deadlines` prüfen.
4. **Abends:** `## 🌙 Tagesrückblick` ausfüllen, Lektionsstatus aktualisieren.
5. **Wochenweise:** `99 Journal/Wochen/` (Kalender → Wochennotiz) für Rückblick + Ziele.
6. **Karten:** Befehlspalette → *Spaced Repetition: Review flashcards*.

## 10. Lernkarten (Spaced Repetition + Anki-Export)

Neue Decks über `Templates/Lernkarten Template` (Ordner `04 Lernkarten/`).
Karten sind **eine Zeile je Karte** – das Format für *beide* Plugins:

```markdown
#flashcards/Mein-Modul/Lektion-1

Was ist ein Ideal?::Teilmenge eines Rings, abgeschlossen unter den Ringoperationen.

Nenne das neutrale Element von (R, +, 0).::0
```

- Frage endet mit `?`, **genau ein `::`** pro Zeile, **Leerzeile** zwischen
  den Karten (sonst rutschen Überschriften/Nachbarfragen in die Karte).
- Deck-Kopfzeile `#flashcards/<Modulnr>/<Lektion>` ohne Leerzeichen
  (Tags enden am Leerzeichen) mit Leerzeile davor und danach.
- `cards-deck` im Frontmatter = Deck in Anki (`Übergeordnet::Unterdeck`,
  sonst Standarddeck `Studium`) – nach dem Umbenennen der Notiz prüfen.
- Üben: Befehlspalette → *Spaced Repetition: Review flashcards* – das Deck
  muss mit Kartenzahl erscheinen (sonst stimmt das Format nicht).

**Anki-Export** (Plugin *Flashcards*): Voraussetzung **Anki (Desktop)** +
Add-on **AnkiConnect** (ID `2055492159`), dann Befehlspalette →
**Flashcards: Update Anki from vault**. Beim ersten Sync ergänzt das
Plugin Anker ` ^q-xxxx` und eine `flashcards:`-Eigenschaft (unschädlich
für Spaced Repetition). Sync-Bereich der `04 Lernkarten`-Ordner steht in
`.obsidian/plugins/flashcards-obsidian/data.json` (`syncScope.includedFolders`)
– beim Anlegen eines neuen Moduls dort ergänzen.
Details: `AGENTS.md` §3.

## 11. Häufige Probleme (FAQ)

| Symptom | Ursache / Lösung |
| --- | --- |
| Dashboards bleiben leer oder zeigen Text | Einstellungen → Dataview → **Enable JavaScript Queries** ☑, dann `Strg+R` |
| Nach Änderungen an `Views/*.js` ändert sich nichts | Obsidian neu laden (`Strg+R`) |
| Dashboards sind schmal statt über die ganze Breite | Einstellungen → Editor → „Lesbare Zeilenlänge" **AUS**, dann `Strg+R` |
| Kalender wirkt überbreit / nicht wie ein Kalender | Einstellungen → Erscheinungsbild → CSS-Snippets: `kalender` und `dashboard-spalten` ☑, dann `Strg+R` |
| Kalender-Klick erstellt keine Notiz | Tägliche Notizen-Ordner/Vorlage prüfen (Schritt 3) |
| PDFs fehlen in Material-Listen | Ist korrekt: Dataview sieht nur `.md` – die Material-Blöcke nutzen `dateien.js` (gilt nur, wenn `Views/dateien.js` existiert) |
| Todos tauchen zweimal auf | Modul-Aufgabe ist `#moodle` (beabsichtigter Reminder) oder lag doppelt an – `#checklist` zum Ausblenden |
| Nach Umbenennen sind Links tot | Im **Explorer** umbenennen (Obsidian aktualisiert Links automatisch), nicht im Dateimanager |
| Vorlage greift nicht | Einstellungen → Templater → Folder Templates / *Trigger on new file creation* ☑ |
| Karten werden nicht als Deck erkannt | Format §10 prüfen (eine Zeile, ein `::`, Leerzeile dazwischen) – *Review flashcards* muss die Kartenzahl zeigen; Deck-Kopfzeile `#flashcards/…` ohne Leerzeichen |
| Anki-Export findet die Notiz nicht | Anki Desktop + AnkiConnect (`2055492159`) laufen lassen; Sync-Bereich `syncScope.includedFolders` prüfen |

## 12. Für KI-Assistenten

Die Regeln für das Anlegen von Notizen, Terminen, Lernkarten und Materialien
stehen in **`AGENTS.md`** im Vault-Root (wird von OpenCode & Co. automatisch
gelesen). Beispiel-Prompts:

- *„Trage am 03.11.2026 18:00 ein Online-Tutorium für Lektion 4 in Modul 12345 ein"*
- *„Welche Deadlines stehen im Oktober an?"*
- *„Erstelle 10 Lernkarten zu Lektion 3"*
- *„Setze Lektion 1 auf `fertig`"*

---

**Freigabe für Kommilitonen:** Ordner zippen und teilen – er enthält deine
eigenen Notizen, wenn du ihn bereits befüllt hast. Zum Teilen eines
*leeren* Gerüsts den Ordner vorher kopieren und `01 Semester/…` leeren
(bzw. `Archiv/` und `99 Journal/` löschen).
