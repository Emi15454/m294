# Emilijan Russ Portfolio

Dieses Projekt ist ein persönliches Developer-Portfolio für Webentwicklung,
Game Development und App-Entwicklung. Die Startseite liegt direkt im
Root-Verzeichnis, die weiteren Seiten befinden sich im Ordner `html/`.

Die Website wurde mit HTML, CSS und Vanilla JavaScript umgesetzt. Projektdaten,
Navigation, Social Links und Metainformationen werden aus `data/projects.json`
geladen und dynamisch in die Seiten gerendert.

## Inhalt

- Startseite mit Hero-Bereich, Projektvorschau und Projekt-Updates-Formular
- Projektübersicht mit dynamisch geladenen Projektkarten
- Kategorie-Filter für Web Development, Game Development und Android Apps
- Wiederverwendbare Projektdetailseite mit Galerie und Anfrageformular
- Kontaktseite mit Arbeitsphilosophie, Fokus-Stack und Kontaktformular
- Favoritenfunktion für Projekte über `localStorage`

## Projektbereiche

Das Portfolio zeigt Projekte aus mehreren Bereichen:

- Webshops und Web-Apps mit Vue.js, Angular, TypeScript, JavaScript, HTML und CSS
- Game-Prototypen mit Godot, GDScript, Unity und C#
- macOS-App-Entwicklung mit SwiftUI und Swift Data
- Android-App-Entwicklung mit Java und Material Design
- Dieses Portfolio selbst als HTML/CSS/JavaScript-Projekt

## Ordnerstruktur

```text
.
├── css/
│   └── style.css              # Design, Layout, Responsive Styles
├── data/
│   └── projects.json          # Projekt-, Meta- und Navigationsdaten
├── docs/
│   ├── STYLEGUIDE.md
│   └── WIREFRAMES.md
├── html/
│   ├── kontakt.html           # Kontaktseite
│   ├── projektdetail.html     # Dynamische Projektdetailseite
│   └── projekte.html          # Projektübersicht mit Filter
├── img/                       # Lokale Projektbilder
├── js/
│   └── main.js                # Datenladen, Rendering, Filter, Formulare
├── index.html                 # Startseite im Root-Verzeichnis
├── KIDOKU.md                  # KI-Dokumentation
└── README.md
```

## Pfadlogik

Da `index.html` im Root liegt und die Unterseiten im Ordner `html/`, behandelt
`js/main.js` die Pfade abhängig von der aktuellen Seite:

- Root-Startseite lädt `data/projects.json`, `css/style.css` und `js/main.js`
- Unterseiten laden Ressourcen über `../data/`, `../css/` und `../js/`
- Dynamische Links zeigen von der Startseite nach `html/...`
- Dynamische Links auf Unterseiten bleiben innerhalb von `html/`

Dadurch funktionieren Navigation, Projektkarten und Detailseiten sowohl von der
Startseite als auch von den Unterseiten aus.

## Lokal starten

Die Website sollte über einen lokalen Server geöffnet werden, weil die Projektdaten
per `fetch()` aus der JSON-Datei geladen werden.

```bash
python -m http.server 8000
```

Danach ist die Startseite erreichbar unter:

```text
http://localhost:8000/index.html
```

## Technische Umsetzung

- Semantisches HTML mit getrennten Seiten für Home, Projekte, Detail und Kontakt
- Zentrales CSS mit Variablen, Grid/Flexbox-Layouts und responsiven Breakpoints
- Vanilla JavaScript für:
  - Laden von `projects.json`
  - dynamische Navigation
  - Projektkarten und Projektdetails
  - Kategorie-Filter
  - Favoriten über `localStorage`
  - Formularvalidierung und `mailto:`-Links
- Lokale Bilder für Projektkarten und Galerien

## Hinweise

Die Kontaktformulare versenden keine Daten an ein Backend. Sie öffnen stattdessen
das lokale E-Mail-Programm über einen `mailto:`-Link.
