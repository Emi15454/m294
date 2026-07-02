/**
 * ARCHITEKTUR-BLUEPRINT: Asynchrone JSON Fetch Pipeline
 * Holt Projektdaten zur Laufzeit und steuert das dynamische UI-Rendering.
 */

class PortfolioEngine {
  constructor() {
    this.gridContainer = document.querySelector(".project-grid");
    this.filterButtons = document.querySelectorAll(".filter-pill");
    this.projectsData = []; // Wird dynamisch via JSON befüllt

    this.init();
  }

  async init() {
    if (!this.gridContainer) return;

    // Asynchroner Daten-Fetch aus der JSON-Datei
    this.projectsData = await this.fetchProjects();

    if (this.projectsData.length === 0) return;

    // Erkennung des Seiten-Modus
    const isHomePage = this.gridContainer.dataset.display === "limited";

    if (isHomePage) {
      this.renderProjects(this.projectsData.slice(0, 3));
    } else {
      this.renderProjects(this.projectsData);
      this.setupFilters();
    }
  }

  // Lädt die JSON-Datei sicher über HTTP
  async fetchProjects() {
    try {
      // Pfad-Korrektur: Da JS relativ zur HTML-Datei ausgeführt wird,
      // greifen wir auf das "data"-Verzeichnis zu.
      const response = await fetch("../data/projects.json");
      if (!response.ok) {
        throw new Error(`HTTP-Fehler! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Fehler beim Laden der Projektdaten:", error);
      this.gridContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #EF4444;">Projekte konnten nicht geladen werden.</p>`;
      return [];
    }
  }

  // Erzeugt das HTML im DOM
  renderProjects(projects) {
    this.gridContainer.innerHTML = "";

    if (projects.length === 0) {
      this.gridContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Keine Projekte in dieser Kategorie gefunden.</p>`;
      return;
    }

    const fragment = document.createDocumentFragment();

    projects.forEach((project) => {
      const card = document.createElement("article");
      card.className = "project-card";

      const tagsHTML = project.tags
        .map((tag) => `<span class="tag">${tag}</span>`)
        .join("");

      card.innerHTML = `
        <div class="card-image"></div>
        <div class="card-body">
          <div class="card-tags">${tagsHTML}</div>
          <h3>${project.title}</h3>
          <p class="card-text">${project.desc}</p>
          <a href="${project.link}" class="card-link">Analyse ansehen &rarr;</a>
        </div>
      `;
      fragment.appendChild(card);
    });

    this.gridContainer.appendChild(fragment);
  }

  // Filter-Logik
  setupFilters() {
    if (this.filterButtons.length === 0) return;

    this.filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.filterButtons.forEach((btn) => {
          btn.classList.remove("active");
          btn.setAttribute("aria-selected", "false");
        });
        button.classList.add("active");
        button.setAttribute("aria-selected", "true");

        const filterValue = button.dataset.filter;
        if (filterValue === "all") {
          this.renderProjects(this.projectsData);
        } else {
          const filtered = this.projectsData.filter(
            (p) => p.category === filterValue,
          );
          this.renderProjects(filtered);
        }
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new PortfolioEngine();
});
