/* ============================================================
   script.js – Portfolio interactivity
   ============================================================ */

// ── Navbar: scroll shadow + active-link highlight ──────────────────────────
(function initNavbar() {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-links a:not(.nav-cta)");
  const sections = document.querySelectorAll("section[id]");

  // Add scrolled class for shadow/border
  function onScroll() {
    if (window.scrollY > 10) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Highlight nav link for visible section
    let currentId = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 80;
      if (window.scrollY >= top) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// ── Mobile nav toggle ──────────────────────────────────────────────────────
(function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const links = navLinks.querySelectorAll("a");

  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggle.classList.toggle("active", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when a link is clicked
  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("open");
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
})();

// ── Scroll-reveal animation ────────────────────────────────────────────────
(function initScrollReveal() {
  const targets = document.querySelectorAll(
    ".project-card, .timeline-item, .skill-tag, .about-text p"
  );

  // Add base hidden styles via JS so CSS still works without JS
  const style = document.createElement("style");
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  targets.forEach((el, i) => {
    el.classList.add("reveal");
    // Stagger items within the same parent
    const siblings = Array.from(el.parentElement.children);
    const siblingIndex = siblings.indexOf(el);
    el.style.transitionDelay = `${siblingIndex * 80}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
})();

// ── Active nav link style ──────────────────────────────────────────────────
(function addActiveNavStyle() {
  const style = document.createElement("style");
  style.textContent = `
    .nav-links a.active {
      color: var(--clr-text);
    }
  `;
  document.head.appendChild(style);
})();
