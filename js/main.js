/**
 * ARCHITEKTUR-BLUEPRINT: Global Dynamic Portfolio Engine
 * Verwaltet globalen State, asynchrones Templating und seiten-spezifisches Routing.
 */

class PortfolioApp {
  constructor() {
    this.data = null;
    this.currentFilename =
      window.location.pathname.split("/").pop() || "index.html";
    this.favorites = this.loadFavorites();
    this.lightboxInitialized = false;
    this.init();
  }

  async init() {
    this.data = await this.fetchPortfolioData();
    if (!this.data) return;

    // 1. Globale Shell rendern (Immer aktiv)
    this.renderGlobalShell();

    // 2. Seiten-spezifisches Routing ausführen
    this.routePageLogic();

    // 3. Formulare mit echter Interaktion ausstatten
    this.setupFormHandlers();
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

  loadFavorites() {
    try {
      const saved = localStorage.getItem("portfolio-favorites");
      return new Set(saved ? JSON.parse(saved) : []);
    } catch (error) {
      console.warn("Merkliste konnte nicht geladen werden:", error);
      return new Set();
    }
  }

  saveFavorites() {
    localStorage.setItem(
      "portfolio-favorites",
      JSON.stringify([...this.favorites]),
    );
  }

  toggleFavorite(projectId) {
    if (this.favorites.has(projectId)) {
      this.favorites.delete(projectId);
    } else {
      this.favorites.add(projectId);
    }
    this.saveFavorites();
  }

  isFavorite(projectId) {
    return this.favorites.has(projectId);
  }

  updateFavoriteBadge() {
    const badge = document.querySelector(".favorite-count");
    if (badge) {
      badge.textContent = this.favorites.size;
    }
  }

  // Generiert Header, Navigation, Footer und Platzhalter dynamisch
  renderGlobalShell() {
    // Dynamischer Name im Logo und Footer
    document.querySelectorAll(".logo").forEach((el) => {
      el.innerHTML = `${this.data.meta.developerName} <span>| Developer</span>`;
    });

    const copyrightEl = document.querySelector(
      ".footer-copyright, .footer-bottom p:first-child",
    );
    if (copyrightEl) {
      copyrightEl.innerHTML = `&copy; ${new Date().getFullYear()} ${this.data.meta.developerName}. Alle Rechte vorbehalten.`;
    } else {
      const footerBottom = document.querySelector(".footer-bottom");
      if (footerBottom) {
        footerBottom.innerHTML = `<p class="footer-copyright">&copy; ${new Date().getFullYear()} ${this.data.meta.developerName}. Alle Rechte vorbehalten.</p>`;
      }
    }

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

    this.updateFavoriteBadge();
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

  setupFormHandlers() {
    this.setupNewsletterForm();
    this.setupContactForm();
    this.setupProjectInquiryForm();
  }

  setupNewsletterForm() {
    const newsletterForm = document.querySelector(".newsletter-form");
    if (!newsletterForm) return;

    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const statusMessage = newsletterForm.querySelector(".form-status");

    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!emailInput) return;

      const emailValue = emailInput.value.trim();
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

      if (!isValidEmail) {
        if (statusMessage) {
          statusMessage.textContent =
            "Bitte gib eine gültige E-Mail-Adresse ein.";
          statusMessage.style.color = "var(--accent)";
        }
        return;
      }

      const mailtoLink = `mailto:alex.mueller@example.com?subject=${encodeURIComponent("Newsletter-Anmeldung")}&body=${encodeURIComponent(`Neue Anmeldung: ${emailValue}`)}`;
      window.location.href = mailtoLink;

      if (statusMessage) {
        statusMessage.textContent =
          "Dein E-Mail-Programm wird geöffnet – bitte sende die Anfrage dort ab.";
        statusMessage.style.color = "var(--accent)";
      }

      newsletterForm.reset();
    });
  }

  setupContactForm() {
    const contactForm = document.querySelector("form.form-stack");
    if (!contactForm) return;

    const subjectSelect = contactForm.querySelector("select");
    const messageTextarea = contactForm.querySelector("textarea");
    const statusMessage = contactForm.querySelector(".form-status");

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const subject = subjectSelect ? subjectSelect.value : "Kontakt";
      const message = messageTextarea ? messageTextarea.value.trim() : "";

      if (!message) {
        if (statusMessage) {
          statusMessage.textContent =
            "Bitte beschreibe kurz die Anforderungen deines Projekts.";
          statusMessage.style.color = "var(--accent)";
        }
        return;
      }

      const mailtoLink = `mailto:alex.mueller@example.com?subject=${encodeURIComponent(`[Kontakt] ${subject}`)}&body=${encodeURIComponent(message)}`;
      window.location.href = mailtoLink;

      if (statusMessage) {
        statusMessage.textContent =
          "Dein E-Mail-Programm wird geöffnet – bitte sende die Anfrage dort ab.";
        statusMessage.style.color = "var(--accent)";
      }

      contactForm.reset();
    });
  }

  setupProjectInquiryForm() {
    const inquiryForm = document.querySelector("#project-inquiry-form");
    if (!inquiryForm) return;

    const statusMessage = inquiryForm.querySelector(".form-status");
    inquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const subject = inquiryForm.querySelector("select").value;
      const message = inquiryForm.querySelector("textarea").value.trim();

      if (!message) {
        if (statusMessage) {
          statusMessage.textContent =
            "Bitte ergänze eine kurze Anfrage zum Projekt.";
          statusMessage.style.color = "var(--accent)";
        }
        return;
      }

      const mailtoLink = `mailto:alex.mueller@example.com?subject=${encodeURIComponent(`[${document.querySelector(".sidebar-sticky h1")?.textContent || "Projekt"}] ${subject}`)}&body=${encodeURIComponent(message || `Hallo, ich möchte gern mehr über dieses Projekt erfahren.`)}`;
      window.location.href = mailtoLink;

      if (statusMessage) {
        statusMessage.textContent =
          "Dein E-Mail-Programm wird geöffnet – bitte sende die Anfrage dort ab.";
        statusMessage.style.color = "var(--accent)";
      }

      inquiryForm.reset();
    });
  }

  renderProjectCards(projects, container) {
    container.innerHTML = "";
    if (projects.length === 0) {
      container.innerHTML = `<p style="grid-column:1/-1; text-align:center;">Keine Projekte gefunden.</p>`;
      return;
    }

    container.innerHTML = projects
      .map((p) => {
        const imageUrl =
          Array.isArray(p.images) && p.images.length > 0
            ? p.images[0]
            : "../img/placeholder-project.jpg";
        const isFav = this.isFavorite(p.id);

        return `
      <article class="project-card">
        <div class="card-image" style="background-image: url('${imageUrl}'); background-size: cover; background-position: center;"></div>
        <div class="card-body">
          <div class="card-tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
          <h3>${p.title}</h3>
          <p class="card-text">${p.desc}</p>
          <div class="card-actions">
            <a href="projektdetail.html?id=${p.id}" class="card-link">Case Study lesen &rarr;</a>
            <button type="button" class="favorite-toggle ${isFav ? "active" : ""}" data-project-id="${p.id}">
              ${isFav ? "★ Gemerkt" : "☆ Merken"}
            </button>
          </div>
        </div>
      </article>
    `;
      })
      .join("");

    container.querySelectorAll(".favorite-toggle").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const projectId = Number(button.dataset.projectId);
        this.toggleFavorite(projectId);
        this.renderProjectCards(projects, container);
      });
    });
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

  ensureLightbox() {
    if (this.lightboxInitialized)
      return document.querySelector(".lightbox-backdrop");

    const backdrop = document.createElement("div");
    backdrop.className = "lightbox-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    backdrop.innerHTML = `
      <div class="lightbox-content">
        <button type="button" class="lightbox-close" aria-label="Bild schließen">×</button>
        <img src="" alt="Vergrößertes Projektbild" />
      </div>
    `;

    document.body.appendChild(backdrop);
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) this.closeLightbox();
    });

    const closeButton = backdrop.querySelector(".lightbox-close");
    if (closeButton) {
      closeButton.addEventListener("click", () => this.closeLightbox());
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") this.closeLightbox();
    });

    this.lightboxInitialized = true;
    return backdrop;
  }

  openLightbox(imageUrl) {
    const backdrop = this.ensureLightbox();
    const image = backdrop.querySelector("img");
    if (image) {
      image.src = imageUrl;
      image.alt = "Vergrößertes Projektbild";
    }
    backdrop.classList.add("active");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  closeLightbox() {
    const backdrop = document.querySelector(".lightbox-backdrop");
    if (!backdrop) return;
    backdrop.classList.remove("active");
    backdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
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

    const favoriteButton = document.querySelector(".project-favorite-toggle");
    if (favoriteButton) {
      favoriteButton.textContent = this.isFavorite(project.id)
        ? "★ Projekt gemerkt"
        : "☆ Projekt merken";
      favoriteButton.addEventListener("click", () => {
        this.toggleFavorite(project.id);
        favoriteButton.textContent = this.isFavorite(project.id)
          ? "★ Projekt gemerkt"
          : "☆ Projekt merken";
        this.updateFavoriteBadge();
      });
    }

    const inquiryForm = document.querySelector("#project-inquiry-form");
    if (inquiryForm) {
      const statusMessage = inquiryForm.querySelector(".form-status");
      inquiryForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const subject = inquiryForm.querySelector("select").value;
        const message = inquiryForm.querySelector("textarea").value.trim();
        const mailtoLink = `mailto:alex.mueller@example.com?subject=${encodeURIComponent(`[${project.title}] ${subject}`)}&body=${encodeURIComponent(message || `Hallo, ich möchte gern mehr über ${project.title} erfahren.`)}`;
        window.location.href = mailtoLink;
        if (statusMessage) {
          statusMessage.textContent =
            "Dein E-Mail-Programm wird geöffnet – bitte sende die Anfrage dort ab.";
        }
      });
    }

    // 2. Galerie dynamisch aufbauen
    const galleryContainer = document.querySelector(".project-gallery");
    const previewStrip = document.querySelector(".gallery-preview-strip");
    if (galleryContainer || previewStrip) {
      const galleryImages =
        Array.isArray(project.images) && project.images.length > 0
          ? project.images
          : ["../img/placeholder-project.jpg"];

      if (galleryContainer) {
        galleryContainer.innerHTML = galleryImages
          .map(
            (img, index) => `
          <button
            type="button"
            class="gallery-item ${index === 0 ? "featured" : ""}"
            data-image="${img}"
            aria-label="Projektbild ${index + 1} vergrößern"
            style="background-image: url('${img}'); background-size: cover; background-position: center;"
          ></button>
        `,
          )
          .join("");

        galleryContainer.querySelectorAll(".gallery-item").forEach((button) => {
          button.addEventListener("click", () => {
            this.openLightbox(button.dataset.image);
          });
        });
      }

      if (previewStrip) {
        previewStrip.innerHTML = galleryImages
          .map(
            (img) => `
          <button type="button" class="gallery-preview-item" data-image="${img}" aria-label="Bild vergrößern">
            <img src="${img}" alt="Projektbild Vorschau" />
          </button>
        `,
          )
          .join("");

        previewStrip
          .querySelectorAll(".gallery-preview-item")
          .forEach((button) => {
            button.addEventListener("click", () => {
              this.openLightbox(button.dataset.image);
            });
          });
      }
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
