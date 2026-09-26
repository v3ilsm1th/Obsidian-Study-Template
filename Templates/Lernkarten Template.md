---
modul: "<% await tp.system.prompt('Modul-Nummer, z. B. 12345', '12345') %>"
lektion: 
art: lernkarte
erstellt: <% tp.date.now("YYYY-MM-DD") %>
quelle: 
tags:
  - lernkarte
---

# 🧠 Lernkarten – <% tp.file.title %>

<!-- 
  Format für das Plugin "Spaced Repetition":
  • Frage endet mit Fragezeichen "?"
  • Antwort folgt nach einem Trennzeichen "---"
  • Deck-Name über "#flashcards/<Deck>" (Überschrift)
  • Neue Karten unten anhängen, Lücke mit "..." oder Stichpunkten füllen
-->

#flashcards/<% tp.file.title %>

Was ist ...?
...

---

Nächste Frage?
...
