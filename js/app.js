document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------
  // Variables globales
  // ----------------------------
  const root = document.documentElement;
  const modeBtn = document.getElementById("modeBtn");
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const THEME_KEY = "juan-theme";

  const getCssVar = name => getComputedStyle(root).getPropertyValue(name).trim();

  // ----------------------------
  // Tema claro/oscuro
  // ----------------------------
  const initTheme = () => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light") {
      root.classList.add("light");
      if (modeBtn) modeBtn.textContent = "☀️";
    } else {
      root.classList.remove("light");
      if (modeBtn) modeBtn.textContent = "🌙";
    }
  };

  const setupThemeToggle = () => {
    if (!modeBtn) return console.warn("No se encontró #modeBtn en el DOM.");
    modeBtn.addEventListener("click", () => {
      root.classList.toggle("light");
      const isLight = root.classList.contains("light");
      localStorage.setItem(THEME_KEY, isLight ? "light" : "dark");
      modeBtn.textContent = isLight ? "☀️" : "🌙";
      loadParticles();
    });
  };

  // ----------------------------
  // tsParticles
  // ----------------------------
  const getParticlesConfig = () => ({
    fullScreen: { enable: true, zIndex: -1 },
    background: { color: getCssVar("--bg") },
    fpsLimit: 60,
    interactivity: {
      events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" }, resize: true },
      modes: { repulse: { distance: 120, duration: 0.4 }, push: { quantity: 4 } },
    },
    particles: {
      number: { value: 25, density: { enable: false }, limit: 50 },
      color: { value: getCssVar("--accent") },
      links: { enable: true, color: getCssVar("--accent-2"), distance: 150, opacity: 0.4, width: 2 },
      move: { enable: true, speed: 1, direction: "none", outModes: { default: "bounce" } },
      shape: {
        type: "char",
        character: [
          { value: "JS", style: "normal", weight: "bold", font: "Verdana" },
          { value: "HTML", style: "normal", weight: "bold", font: "Verdana" },
          { value: "CSS", style: "normal", weight: "bold", font: "Verdana" },
          { value: "Python", style: "normal", weight: "bold", font: "Verdana" },
        ],
      },
      size: { value: { min: 5, max: 20 }, animation: { enable: true, speed: 2, minimumValue: 8 } },
      opacity: { value: 0.4, animation: { enable: true, speed: 1, minimumValue: 0.9 } },
    },
  });

  const loadParticles = () => {
    if (typeof tsParticles === "undefined") return console.error("tsParticles no está cargado.");
    tsParticles.load("tsparticles", getParticlesConfig());
  };

  // ----------------------------
  // Menú móvil
  // ----------------------------
  const setupMobileMenu = () => {
    if (!menuBtn || !mobileMenu) return console.warn("No se encontró #menuBtn o #mobileMenu en el DOM.");
    menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("active"));
    mobileMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => mobileMenu.classList.remove("active")));
  };

  // ----------------------------
  // Navbar auto-hide
  // ----------------------------
  const setupNavbarAutoHide = () => {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
    let lastScroll = window.scrollY, ticking = false, stopTimer = null;

    const update = () => {
      const current = window.scrollY;
      if (current > lastScroll && current > 80) navbar.classList.add("hidden");
      else navbar.classList.remove("hidden");
      lastScroll = Math.max(current, 0);
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) requestAnimationFrame(update), (ticking = true);
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => navbar.classList.remove("hidden"), 220);
    }, { passive: true });
  };

  // ----------------------------
  // Animación de revelado al hacer scroll
  // ----------------------------
  const setupRevealOnScroll = () => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle("visible", entry.isIntersecting));
    }, { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  };

    // ----------------------------
  // 8. Envío de formulario con EmailJS
  // ----------------------------
  emailjs.init("9QUrkBRou0gg-STAW");
  const contactForm = document.getElementById("contactForm");
  if(contactForm){
    contactForm.addEventListener("submit", function(e){
      e.preventDefault();
      emailjs.sendForm("service_t9v8fkj", "template_1gcc2w9", contactForm, "9QUrkBRou0gg-STAW")
      .then(function(response){
        alert("¡Mensaje enviado con éxito! 🎉");
        contactForm.reset();
        console.log("EmailJS response:", response);
      }, function(error){
        console.error("Error EmailJS:", error);
        alert("Error al enviar el formulario. Revisa la consola.");
      });
    });
  }


  // ----------------------------
  // Animación H1/H2 flotante
  // ----------------------------
  const title = document.getElementById("elegant-title");
  const subtitle = document.querySelector(".title");

  if(title){
    const letters = title.textContent.split("");
    title.textContent = "";
    letters.forEach(letter => {
      const span = document.createElement("span");
      span.textContent = letter === " " ? "\u00A0" : letter;
      title.appendChild(span);
    });

    // Timeline H1
    gsap.to("#elegant-title span", {
      y: 0,
      opacity: 1,
      ease: "power1.inOut",
      stagger: 0.1,
      repeat: -1,
      yoyo: true,
      duration: 0.8
    });

    // H2 flotante
    gsap.to(subtitle, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(subtitle, {
          y: -10,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      }
    });
  }

  // ----------------------------
  // Inicialización general
  // ----------------------------
  initTheme();
  setupThemeToggle();
  loadParticles();
  setupMobileMenu();
  setupRevealOnScroll();
  setupNavbarAutoHide();
});
