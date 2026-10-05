---
modul: "<% await tp.system.prompt('Modul-Nummer, z. B. 12345', '12345') %>"
lektion: 
cards-deck: "<% tp.file.title %>"   # ⚠️ Anki-Deck = Dateititel zum Anlegen; nach dem Umbenennen hier anpassen!
art: lernkarte
erstellt: <% tp.date.now("YYYY-MM-DD") %>
quelle: 
tags:
  - lernkarte
---
```dataviewjs
await dv.view("Views/inhaltsverzeichnis", {})
```
#flashcards/<Modulnr>/<Lektion-ohne-Leerzeichen>



