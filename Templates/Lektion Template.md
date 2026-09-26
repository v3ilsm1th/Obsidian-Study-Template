---
typ: lektion
modul: "<% await tp.system.prompt('Modul-Nummer, z. B. 12345', '12345') %>"
nummer: <% tp.file.cursor("1") %>
label: "<% tp.file.cursor('Lektion 1') %>"
titel: <% tp.file.title %>
status: offen
tags:
  - lektion
---

# <% tp.file.title %>

> [!info] Überblick
> **Modul:** [[<% const p = tp.file.folder.split("/"); const o = (p[p.length - 1] === "05 Lektionen" || p[p.length - 1] === "05 Themen") ? p[p.length - 2] : p[p.length - 1]; %><% o.split(" ")[0] %> Dashboard]]
> **Status:** `offen` → im Eigenschaften-Panel auf `laeuft` / `fertig` setzen

## 📚 Materialien & Quicklinks

<!-- Pfad anpassen, wenn Materialien in Unterordnern liegen
     (z. B. je Lektion/Kapitel): .../01 Materialien/<Ordnername> -->

```dataviewjs
await dv.view("Views/dateien", { pfad: "<% tp.file.folder.replace(/\/(05 Lektionen|05 Themen)$/, "") %>/01 Materialien" })
```

## 🧠 Lernkarten

```dataview
LIST
WHERE contains(file.folder, "04 Lernkarten")
  AND contains(string(lektion), string(this.file.link))
SORT file.name
```

## 📝 Zusammenfassung / Notizen

<!-- Die wichtigsten Punkte der Unit hier festhalten. -->
