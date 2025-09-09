/*//Modo oscuro/claro
const root = document.documentElement;
const modeBtn = document.getElementById("modeBtn");
const THEME_KEY = "juan-theme";
const saved = localStorage.getItem(THEME_KEY);

// 1. Ver si hay un tema guardado en localStorage
if (saved === 'light'){
root.classList.add('light');
modeBtn.textContent = "☀️";
};

modeBtn.addEventListener("click", () =>{
    root.classList.toggle("light");
    const isLight = root.classList.contains("light");

    localStorage.setItem(THEME_KEY, isLight ? "light" : "dark");

    modeBtn.textContent = isLight ? "☀️" : "🌙";


  // Recargar partículas con nuevos colores
  tsParticles.load("tsparticles", getParticlesConfig());
});

const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Abrir / cerrar menú
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});

// Cerrar al hacer clic en un enlace
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
});

// Función para leer variables CSS
function getCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// Configuración dinámica según el tema actual
function getParticlesConfig() {
  return {
    background: {
      color: getCssVar("--bg"),
    },
    particles: {
      number: { value: 50 },
      color: { value: getCssVar("--accent") },
      links: { enable: true, color: getCssVar("--accent-2") },
      move: { enable: true, speed: 1 },
    },
  };
}

// === Funciones para partículas ===
function getCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function getParticlesConfig() {
  const isLight = document.documentElement.classList.contains("light");

  if (isLight) {
    // ===== Tema Claro =====
    return {
      background: { color: getCssVar("--bg") },
      particles: {
        number: { value: 60 },
        color: { value: getCssVar("--accent-2") }, // Doradas
        links: { enable: true, color: getCssVar("--muted") }, // Gris azulado
        move: { enable: true, speed: 1 }
      }
    };
  } else {
    // ===== Tema Oscuro =====
    return {
      background: { color: getCssVar("--bg") },
      particles: {
        number: { value: 80 },
        color: { value: getCssVar("--accent") }, // Azul eléctrico
        links: { enable: true, color: getCssVar("--accent-2") }, // Verde agua
        move: { enable: true, speed: 1.5 }
      }
    };
  }
}

// === Inicializar partículas al cargar la página ===
document.addEventListener("DOMContentLoaded", () => {
  tsParticles.load("tsparticles", getParticlesConfig());
});*/
// app.js (sustituye el contenido existente)
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const modeBtn = document.getElementById("modeBtn");
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const THEME_KEY = "juan-theme";

  // Recuperar tema guardado
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light") {
    root.classList.add("light");
    if (modeBtn) modeBtn.textContent = "☀️";
  }

  // Lee variable CSS
  function getCssVar(name) {
    return getComputedStyle(root).getPropertyValue(name).trim();
  }

  // Genera la config según tema (solo una función)
  function getParticlesConfig() {
    const isLight = root.classList.contains("light");
    const particleColor = isLight ? getCssVar("--accent-2") : getCssVar("--accent");
    const linkColor = isLight ? getCssVar("--muted") : getCssVar("--accent-2");
    const number = isLight ? 60 : 80;
    const speed = isLight ? 1 : 1.5;

    return {
      fullScreen: { enable: true, zIndex: -1 },
      background: { color: getCssVar("--bg") },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
          onClick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          repulse: { distance: 120, duration: 0.4 },
          push: { quantity: 4 }
        }
      },
      particles: {
        number: { value: number, density: { enable: true, area: 800 } },
        color: { value: particleColor },
        links: { enable: true, color: linkColor, distance: 160, opacity: 0.35, width: 1 },
        move: { enable: true, speed: speed, outModes: { default: "bounce" } },
        shape: { type: ["circle", "triangle"] },
        opacity: { value: 0.8, animation: { enable: true, speed: 1, minimumValue: 0.3 } },
        size: { value: { min: 2, max: 6 }, animation: { enable: true, speed: 3, minimumValue: 1 } }
      }
    };
  }

  // Carga/recarga partículas (comprueba que la librería exista)
  function loadParticles() {
    if (typeof tsParticles === "undefined") {
      console.error("tsParticles no está cargado. Asegúrate de incluir la librería antes de app.js.");
      return;
    }
    tsParticles.load("tsparticles", getParticlesConfig());
  }

  // Inicializar partículas
  loadParticles();

  // Botón de tema
  if (modeBtn) {
    modeBtn.addEventListener("click", () => {
      root.classList.toggle("light");
      const isLight = root.classList.contains("light");
      localStorage.setItem(THEME_KEY, isLight ? "light" : "dark");
      modeBtn.textContent = isLight ? "☀️" : "🌙";

      // Recarga partículas con los nuevos colores
      loadParticles();
    });
  } else {
    console.warn("No se encontró #modeBtn en el DOM.");
  }

  // Menú móvil (si existe)
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("active"));
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => mobileMenu.classList.remove("active"));
    });
  } else {
    console.warn("No se encontró #menuBtn o #mobileMenu en el DOM.");
  }
});
