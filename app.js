//Modo oscuro/claro
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
});
