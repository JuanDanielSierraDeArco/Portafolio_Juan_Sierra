document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------
  // 1. Variables globales
  // ----------------------------
  const root = document.documentElement;
  const modeBtn = document.getElementById("modeBtn");
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const THEME_KEY = "juan-theme";

  function getCssVar(name) {
    return getComputedStyle(root).getPropertyValue(name).trim();
  }

  // ----------------------------
  // 2. Tema: Recuperar guardado y alternar
  // ----------------------------
  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light") {
      root.classList.add("light");
      if (modeBtn) modeBtn.textContent = "☀️";
    }
  }

  function setupThemeToggle() {
    if (!modeBtn) return console.warn("No se encontró #modeBtn en el DOM.");

    modeBtn.addEventListener("click", () => {
      root.classList.toggle("light");
      const isLight = root.classList.contains("light");
      localStorage.setItem(THEME_KEY, isLight ? "light" : "dark");
      modeBtn.textContent = isLight ? "☀️" : "🌙";
      loadParticles();
    });
  }

  // ----------------------------
  // 3. tsParticles
  // ----------------------------
  function getParticlesConfig() {
    return {
      fullScreen: { enable: true, zIndex: -1 },
      background: { color: getCssVar("--bg") },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
          onClick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          repulse: { distance: 120, duration: 0.4 },
          push: { quantity: 4 },
        },
      },
      particles: {
        number: { value: 25, density: { enable: false }, limit: 50 },
        color: { value: getCssVar("--accent") },
        links: {
          enable: true,
          color: getCssVar("--accent-2"),
          distance: 150,
          opacity: 0.4,
          width: 2,
        },
        move: { enable: true, speed: 1, direction: "none", outModes: { default: "bounce" } },
        shape: {
          type: "char",
          character: [
            { value: "JavaScript", style: "normal", weight: "bold", font: "Verdana" },
            { value: "HTML", style: "normal", weight: "bold", font: "Verdana" },
            { value: "CSS", style: "normal", weight: "bold", font: "Verdana" },
            { value: "Python", style: "normal", weight: "bold", font: "Verdana" },
            { value: "C++", style: "normal", weight: "bold", font: "Verdana" },
            { value: "Java", style: "normal", weight: "bold", font: "Verdana" },
            { value: "C#", style: "normal", weight: "bold", font: "Verdana" },
            { value: "Ruby", style: "normal", weight: "bold", font: "Verdana" },
            { value: "PHP", style: "normal", weight: "bold", font: "Verdana" },
            { value: "Swift", style: "normal", weight: "bold", font: "Verdana" },
            { value: "React", style: "normal", weight: "bold", font: "Verdana" },
            { value: "Node.js", style: "normal", weight: "bold", font: "Verdana" },
          ],
        },
        size: { value: { min: 5, max: 20 }, animation: { enable: true, speed: 2, minimumValue: 8 } },
        opacity: { value: 0.4, animation: { enable: true, speed: 1, minimumValue: 0.9 } },
      },
    };
  }

  function loadParticles() {
    if (typeof tsParticles === "undefined") {
      console.error("tsParticles no está cargado.");
      return;
    }
    tsParticles.load("tsparticles", getParticlesConfig());
  }

  // ----------------------------
  // 4. Menú móvil
  // ----------------------------
  function setupMobileMenu() {
    if (!menuBtn || !mobileMenu) return console.warn("No se encontró #menuBtn o #mobileMenu en el DOM.");

    menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("active"));
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => mobileMenu.classList.remove("active"));
    });
  }

  // ----------------------------
  // 5. Navbar auto-hide
  // ----------------------------
  function setupNavbarAutoHide() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    let lastScroll = window.pageYOffset || 0;
    let ticking = false;
    let stopTimer = null;

    function update() {
      const current = window.pageYOffset || 0;

      if (current > lastScroll && current > 80) {
        navbar.classList.add("hidden");
      } else {
        navbar.classList.remove("hidden");
      }

      lastScroll = Math.max(current, 0);
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => navbar.classList.remove("hidden"), 220);
    }, { passive: true });
  }

  // ----------------------------
  // 6. Reveal on scroll
  // ----------------------------
  function setupRevealOnScroll() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle("visible", entry.isIntersecting);
      });
    }, { threshold: 0.15 });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  }

  // ----------------------------
  // 7. Animación del título con GSAP (una sola vez)
  // ----------------------------
  function animateTitle() {
    const title = document.getElementById("elegant-title");
    if (!title) return;

    title.style.visibility = "hidden";
    const letters = title.textContent.trim().split("");
    title.innerHTML = "";
    letters.forEach(letter => {
      const span = document.createElement("span");
      span.textContent = letter === " " ? "\u00A0" : letter;
      title.appendChild(span);
    });
    title.style.visibility = "visible";

    gsap.from(title.querySelectorAll("span"), {
      duration: 1.5,
      y: 50,
      opacity: 0,
      ease: "power2.out",
      stagger: 0.05
    });
  }

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
  // 9. Animaciones hero al cargar todo
  // ----------------------------
  window.addEventListener('load', () => {
    const kicker = document.querySelector(".kicker");
    if (kicker) {
      gsap.to(kicker, { opacity: 1, duration: 0.5, ease: "power1.out" });
    }
    animateTitle();
    loadParticles();
  });

  // ----------------------------
  // Inicialización
  // ----------------------------
  initTheme();
  setupThemeToggle();
  setupMobileMenu();
  setupRevealOnScroll();
  setupNavbarAutoHide();
});
