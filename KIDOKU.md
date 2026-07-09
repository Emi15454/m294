# KI-Dokumentation: Evaluation, Einsatz und Reflexion

Dieses Dokument dokumentiert begleitend den zielgerichteten und reflektierten Einsatz von künstlicher Intelligenz während der 20 Lektionen des Portfolio-Projekts. Im Fokus stand die Frage, wie KI-Werkzeuge zur Effizienzsteigerung, UI-Optimierung und zur eigenen Weiterbildung beigetragen haben.

---

## 1. Evaluation der KI-Werkzeuge (Nutzwertanalyse)

Für die Entwicklung wurden drei verschiedene KI-Werkzeuge in unterschiedlichen Phasen evaluiert: **Google Gemini** (Architektur & Konzeption), **GitHub Copilot** (Inline-Codegenerierung) und **OpenAI Codex** (Algorithmen & JavaScript-Logik).

### Kriterien-Definition

1. **Code-Qualität (Framework-Freiheit):** Wie gut generiert die KI reines, semantisches HTML5 und CSS Grid ohne Framework-Rückfälle? (Gewichtung: 30%)
2. **Kontext-Verständnis & Design-Treue:** Wie präzise hält sich die KI an komplexe Design-Systeme und Farbvorgaben (z.B. Space Blue Palette)? (Gewichtung: 25%)
3. **Workflow-Integration (Effizienz):** Wie nahtlos fügt sich das Tool in die Entwicklungsumgebung (IDE/Terminal) ein? (Gewichtung: 25%)
4. **Erklärungsqualität (Lerneffekt):** Bietet das Tool Lerneffekte durch verständliche Erklärungen von CSS- oder JS-Konzepten? (Gewichtung: 20%)

### Nutzwertanalyse-Matrix (Skala 1 bis 10 Punkte)

| Kriterium                 | Gewichtung | Google Gemini | GitHub Copilot | OpenAI Codex |
| :------------------------ | :--------: | :-----------: | :------------: | :----------: |
| 1. Code-Qualität (Native) |    30%     |    9 (2.7)    |    8 (2.4)     |   7 (2.1)    |
| 2. Kontext-Verständnis    |    25%     |   10 (2.5)    |    7 (1.75)    |   6 (1.5)    |
| 3. Workflow-Integration   |    25%     |   7 (1.75)    |    10 (2.5)    |   5 (1.25)   |
| 4. Erklärungsqualität     |    20%     |   10 (2.0)    |    5 (1.0)     |   6 (1.2)    |
| **Gesamtwert (Nutzwert)** |  **100%**  |   **8.95**    |    **7.65**    |   **6.05**   |

### Begründung der Werkzeug-Wahl

Aufgrund der Nutzwertanalyse wurde eine **Kombination aus Google Gemini und GitHub Copilot** gewählt:

- **Google Gemini** überzeugte mit seinem gigantischen Kontextfenster. Es wurde als "Chef-Architekt" eingesetzt, um das globale Design-System (`style.css`) zu entwerfen und die responsive Logik von CSS Grid zu planen. Gemini verstand die "Space Blue"-Vorgaben fehlerfrei und lieferte exzellente Erklärungen für den Lerneffekt.
- **GitHub Copilot** wurde direkt in der IDE als "interaktiver Co-Pilot" für das schnelle Schreiben von Standard-HTML-Strukturen, Formularen und sich wiederholenden CSS-Klassen genutzt.
- **OpenAI Codex** wurde nach der initialen Testphase weniger aktiv genutzt, da Copilot die Autocomplete-Funktion im Editor komfortabler löste und Gemini bei komplexen JS-Architekturen die besseren strukturellen Erklärungen lieferte.

---

## 2. Einsatz der KI im Projekt

Die KI wurde gezielt für drei Kernbereiche eingesetzt:

### A. Layout-Konzeption (CSS Grid & Flexbox)

Gemini wurde beauftragt, ein responsives Layout-System ohne Frameworks zu entwickeln. Die Herausforderung bestand darin, die Projektübersicht so zu gestalten, dass sie per `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))` auf Desktop, Tablet und Mobile ohne den massiven Einsatz von fehleranfälligen Media Queries funktioniert.

### B. Codevorschläge & Boilerplate-Effizienz

Beim Erstellen von 10 verschiedenen Projekten in der `projekte.html` half GitHub Copilot, die HTML-Strukturen der Projektkarten via Tab-Vervollständigung rasant zu duplizieren. Dies sparte wertvolle Zeit, die in das Refactoring fließen konnte.

### C. UI- & UX-Optimierung

Für das dunkle "Space Blue"-Thema optimierte Gemini die Farbkontraste. Es wählte die HEX-Werte so aus, dass die Textfarben (`--text-muted: #808b93`) auf dem tiefen Hintergrund (`#001727`) die strengen Barrierefreiheits-Richtlinien (WCAG AAA) erfüllen. Zudem half die KI bei der barrierefreien Gestaltung der Formular-Labels.

---

## 3. Konkrete Code-Beispiele & Prompts

### Beispiel 1: Generierung des CSS-Design-Systems (Prompt an Gemini)

- **Prompt:** _"Definiere im Root-Verzeichnis der CSS-Datei ein Dark-Mode-System mit folgenden CSS-Variablen: --bg-primary: #001727, --bg-secondary: #00223b, --text-main: #ffffff, --text-muted: #808b93. Nutze Fluid Typography für Überschriften."_
- **Resultat im Code:**
  ```css
  :root {
    --bg-primary: #001727;
    --bg-secondary: #00223b;
    --accent: #002d4e;
    --accent-hover: #40515d;
    --text-main: #ffffff;
    --text-muted: #808b93;
    --border-color: #40515d;
    --font-size-h1: clamp(2rem, 4vw + 1rem, 3.5rem);
  }
  ```
