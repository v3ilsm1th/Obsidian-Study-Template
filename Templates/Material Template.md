---
modul: "<% await tp.system.prompt('Modul-Nummer, z. B. 12345', '12345') %>"
lektion: 
art: notiz
erstellt: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - material
---

# <% tp.file.title %>

> [!info] Verknüpfung
> `lektion` ausfüllen, z. B. `lektion: "[[Lektion 1 - Einführung]]"` –
> dann erscheint diese Note automatisch in der Lektion und im Dashboard.

## Zusammenfassung

## Wichtige Punkte

## Offene Fragen

