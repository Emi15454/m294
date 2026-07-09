# Personal Developer Portfolio – Space Blue Edition

Ein modernes, minimalistisches und typografie-fokussiertes digitales Portfolio, das als Einzelprojekt über den Zeitraum von 20 Lektionen entwickelt wurde. Die Website präsentiert meine Fähigkeiten, Projekte und Philosophie als spezialisierter Webentwickler. Das gesamte Projekt wurde unter der Prämisse der Framework-Freiheit komplett in nativem Code umgesetzt.

## 🚀 Live-Demo & Repository

- **Veröffentlichte Website:** https://emi15454.github.io/m294/
- **Git-Repository:** https://github.com/Emi15454/m294

---

## ✨ Hauptfunktionen (Features)

- **Startseite (Home):**
  - Prägnanter Hero-Bereich mit persönlichem Entwickler-Pitch (in der Ich-Form).
  - Ein hochgradig responsives 3-Spalten-Grid zur Vorschau aktueller Projekte.
  - Minimalistisches und barrierefreies Newsletter-Anmeldeformular mit Fokus-Effekten.
- **Projektübersicht:**
  - Dynamisches CSS-Grid-Layout zur strukturierten Darstellung von mindestens 10 Projekten.
  - Performanter, clientseitiger JavaScript-Kategoriefilter zur Echtzeit-Sortierung der Projekte.
  - Interaktives Favoriten-Icon (Bookmark-Herz) auf jeder Projektkarte.
- **Projektdetails:**
  - Asymmetrisches Spalten-Layout (60% Medien links, 40% Sidebar rechts) für die Desktop-Ansicht.
  - Einbindung von Bildgalerien und validen HTML5 `<video>`-Platzhaltern.
  - Integriertes Terminanfrageformular sowie ein vorbereiteter Platzhalter für ein JavaScript-basiertes Calendly- oder Cal.com-Widget.
- **Kontakt & Über mich:**
  - Zweispaltiges Profil-Layout zur Vorstellung meines Tech-Stacks und meiner Arbeitsweise.
  - Barrierefreies Kontaktformular mit einer visuell angepassten `<select>`-Betreffzeile zur automatischen E-Mail-Kategorisierung.
- **Merkliste (Erweiterung):**
  - Persistente Favoritenfunktion mittels der nativen Web Storage API (`localStorage`), die gewählte Projekte auch nach einem Seiten-Reload im UI aktiv hält.

---

## 🛠️ Technische Anforderungen & Architektur

- **100% Nativer Code:** Verzicht auf CSS-Frameworks (kein Tailwind CSS, kein Bootstrap). Reines HTML5, CSS3 und Vanilla JavaScript.
- **Modernes Layout-System:** Konsequenter Einsatz von CSS Grid (`repeat(auto-fit, minmax(...))`) für responsive Inhaltsraster und Flexbox für die Navigationselemente.
- **Design-System (Space Blue Theme):**
  - Konsistenter, kontraststarker Dark-Mode basierend auf einer edlen Farbpalette (`#001727` Ink Black als Haupt-Hintergrund, `#00223b` Prussian Blue für Karten/Sektionen).
  - Vollständig barrierefreie Farbkontraste nach WCAG-Richtlinien.
  - Flüssige Typografie und Abstände durch den Einsatz von CSS-Variablen, mathematischen Funktionen (`clamp()`) und einem strikten 8px-Rastersystem.
- **Semantische Struktur:** Saubere Trennung und Gliederung aller Seiten in standardisierte `<header>`-, `<main>`- und `<footer>`-Bereiche.

---

## 📂 Ordnerstruktur

```text
├── css/
│   └── style.css       # Zentrales Design-System, Variablen und responsive Layouts
├── js/
│   └── main.js         # JavaScript für Filterlogik und                LocalStorage-Merkliste
├── docs/
│   ├── STYLEGUIDE.md   # Dokumentation von Typografie, Farben und Spacing
│   └── WIREFRAMES.md   # Layout-Skizzen für Mobile, Tablet und Desktop
├── index.html          # Startseite (Home)
├── projekte.html       # Projektübersicht mit dynamischem Filter
├── projektdetail.html  # Wiederverwendbares Template für Projektdetails
├── kontakt.html        # Kontaktseite & "Über mich"-Sektion
├── KI-DOKU.md          # Umfassende KI-Dokumentation (Evaluation & Reflexion)
└── README.md           # Diese Hauptdokumentation
```
