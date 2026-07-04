/**
 * ARCHITEKTUR-BLUEPRINT: Global Dynamic Portfolio Engine
 * Verwaltet globalen State, asynchrones Templating und seiten-spezifisches Routing.
 */

class PortfolioApp {
  constructor() {
    this.data = null;
    this.currentFilename =
      window.location.pathname.split("/").pop() || "index.html";
    this.init();
  }

  async init() {
    this.data = await this.fetchPortfolioData();
    if (!this.data) return;

    // 1. Globale Shell rendern (Immer aktiv)
    this.renderGlobalShell();

    // 2. Seiten-spezifisches Routing ausführen
    this.routePageLogic();
  }

  async fetchPortfolioData() {
    try {
      const response = await fetch("../data/projects.json");
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Kritischer Datenfehler:", error);
      return null;
    }
  }

  // Generiert Header, Navigation, Footer und Platzhalter dynamisch
  renderGlobalShell() {
    // Dynamischer Name im Logo und Footer
    document.querySelectorAll(".logo").forEach((el) => {
      el.innerHTML = `${this.data.meta.developerName} <span>| Developer</span>`;
    });

    const copyrightEl = document.querySelector(".footer-bottom p:first-child");
    if (copyrightEl)
      copyrightEl.innerHTML = `&copy; ${new Date().getFullYear()} ${this.data.meta.developerName}. Alle Rechte vorbehalten.`;

    // Dynamische Navigation mit aktiver Zustandserkennung (.active)
    const navList = document.querySelector(".nav-list");
    if (navList) {
      navList.innerHTML = this.data.navigation
        .map((item) => {
          const isActive = this.currentFilename === item.url ? "active" : "";
          const ariaCurrent =
            this.currentFilename === item.url ? 'aria-current="page"' : "";
          return `<li><a href="${item.url}" class="nav-link ${isActive}" ${ariaCurrent}>${item.title}</a></li>`;
        })
        .join("");
    }

    // Dynamische Social-Links im Footer setzen
    const githubLink = document.querySelector('a[href*="github"]');
    if (githubLink) githubLink.href = this.data.meta.socials.github;
    const linkedinLink = document.querySelector('a[href*="linkedin"]');
    if (linkedinLink) linkedinLink.href = this.data.meta.socials.linkedin;

    // Dynamischer Text auf der Über-Mich / Kontaktseite
    const philosophyEl = document.querySelector(".split-profile-grid p");
    if (philosophyEl && this.currentFilename === "kontakt.html") {
      philosophyEl.textContent = this.data.meta.philosophy;
    }
  }

  routePageLogic() {
    const gridContainer = document.querySelector(".project-grid");

    // LOGIK A: Projekt-Karten (Home & Übersicht)
    if (gridContainer) {
      const isHomePage = gridContainer.dataset.display === "limited";
      if (isHomePage) {
        this.renderProjectCards(this.data.projects.slice(0, 3), gridContainer);
      } else {
        this.renderProjectCards(this.data.projects, gridContainer);
        this.setupCategoryFilters(gridContainer);
      }
    }

    // LOGIK B: Dynamische Projektdetailseite
    if (this.currentFilename === "projektdetail.html") {
      this.renderProjectDetailPage();
    }
  }

  renderProjectCards(projects, container) {
    container.innerHTML = "";
    if (projects.length === 0) {
      container.innerHTML = `<p style="grid-column:1/-1; text-align:center;">Keine Projekte gefunden.</p>`;
      return;
    }

    container.innerHTML = projects
      .map(
        (p) => `
      <article class="project-card">
        <div class="card-image"></div>
        <div class="card-body">
          <div class="card-tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
          <h3>${p.title}</h3>
          <p class="card-text">${p.desc}</p>
          <a href="projektdetail.html?id=${p.id}" class="card-link">Case Study lesen &rarr;</a>
        </div>
      </article>
    `,
      )
      .join("");
  }

  setupCategoryFilters(container) {
    const pills = document.querySelectorAll(".filter-pill");
    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        pills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");

        const filter = pill.dataset.filter;
        const filtered =
          filter === "all"
            ? this.data.projects
            : this.data.projects.filter((p) => p.category === filter);
        this.renderProjectCards(filtered, container);
      });
    });
  }

  // Die Magic-Methode für projektdetail.html
  renderProjectDetailPage() {
    // ID aus der URL auslesen (z.B. ?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = parseInt(urlParams.get("id")) || 1; // Fallback auf ID 1

    const project = this.data.projects.find((p) => p.id === projectId);
    if (!project) {
      document.querySelector("main").innerHTML =
        `<div class="container section-spacing"><h1>Projekt nicht gefunden.</h1></div>`;
      return;
    }

    // 1. Texte injizieren
    const titleEl = document.querySelector(".sidebar-sticky h1");
    const descriptionEl = document.querySelector(
      ".sidebar-sticky > div:first-child p",
    );
    if (titleEl) titleEl.textContent = project.title;
    if (descriptionEl) descriptionEl.textContent = project.desc;

    const metaParagraphs = document.querySelectorAll(".meta-block p");
    const metaValues = [project.roleScope, project.techStack, project.outcome];
    metaParagraphs.forEach((paragraph, index) => {
      if (metaValues[index]) paragraph.textContent = metaValues[index];
    });

    // 2. Galerie dynamisch aufbauen
    const galleryContainer = document.querySelector(".project-gallery");
    if (galleryContainer) {
      const galleryImages =
        Array.isArray(project.images) && project.images.length > 0
          ? project.images
          : ["../img/placeholder-project.jpg"];

      galleryContainer.innerHTML = galleryImages
        .map(
          (img, index) => `
        <div class="gallery-item ${index === 0 ? "featured" : ""}" style="background-image: url('${img}'); background-size: cover; background-position: center;"></div>
      `,
        )
        .join("");
    }

    // 3. Deep-Dive Sektion unten dynamisch aufbauen
    const archGrid = document.querySelector(".architecture-grid");
    if (archGrid) {
      const architectureItems =
        Array.isArray(project.architecture) && project.architecture.length > 0
          ? project.architecture
          : [
              {
                title: "Projektüberblick",
                text: "Weitere Details folgen bald.",
              },
            ];

      archGrid.innerHTML = architectureItems
        .map(
          (arch) => `
        <div class="arch-card">
          <h4>${arch.title || "Projektüberblick"}</h4>
          <p>${arch.text || "Weitere Details folgen bald."}</p>
        </div>
      `,
        )
        .join("");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new PortfolioApp();
});
