const revealItems = document.querySelectorAll(".reveal");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const sectionLinks = document.querySelectorAll(".nav-links a, .mobile-nav a");
const observedSections = [...new Set([...sectionLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean))];

const closeMenu = () => {
  if (!siteHeader || !menuToggle) {
    return;
  }

  siteHeader.classList.remove("is-menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
};

const toggleMenu = () => {
  if (!siteHeader || !menuToggle) {
    return;
  }

  const nextState = !siteHeader.classList.contains("is-menu-open");
  siteHeader.classList.toggle("is-menu-open", nextState);
  menuToggle.setAttribute("aria-expanded", String(nextState));
  menuToggle.setAttribute("aria-label", nextState ? "Close menu" : "Open menu");
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const setActiveLink = (sectionId) => {
  sectionLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${sectionId}`);
  });
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
);

observedSections.forEach((section) => sectionObserver.observe(section));

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMenu);
}

sectionLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 640) {
    closeMenu();
  }
});
