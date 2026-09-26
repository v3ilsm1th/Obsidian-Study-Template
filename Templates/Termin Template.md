---
titel: <% tp.file.title %>
kurz: ""
datum: <% tp.date.now("YYYY-MM-DD") %>
zeit: ""
modul: "<% await tp.system.prompt('Modul-Nummer, z. B. 12345', '12345') %>"
typ: "<% await tp.system.suggester(t => t, ['Tutorium', 'Übung', 'Video-Meeting', 'Lerngruppe', 'Einsendeaufgabe', 'Prüfung']) %>"
lesson: null
deadline: false
upload: false
status: offen
tags:
  - termin
---

# <% tp.file.title %>

> [!info] Termin
> **Datum:** <% tp.date.now("DD.MM.YYYY") %> · **Zeit / Ort:** siehe Eigenschaften

## 📝 Details

## ☁️ Link (Moodle, Zoom, …)

## ✅ Nachbereitung

- [ ] Termin wahrgenommen
