// app.js
// Versión robusta y comentada para manejar:
// - Tema claro/oscuro (guardado en localStorage)
// - Inicialización y recarga de tsParticles según el tema
// - Menú móvil
// - Protección contra errores (elementos que no existen, librería no cargada, etc.)

document.addEventListener("DOMContentLoaded", () => {
  // --- Referencias al DOM --------------------------------------------------
  // "root" apunta a <html> para cambiar variables CSS (clase .light)
  const root = document.documentElement;

  // Botón que alterna tema (asegúrate que exista en el HTML: id="modeBtn")
  const modeBtn = document.getElementById("modeBtn");

  // Botones/menu móvil (ids deben existir en HTML)
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  // Clave para almacenar el tema en localStorage
  const THEME_KEY = "juan-theme";

  // --- Recuperar tema guardado (si existe) -------------------------------
  // Si el usuario ya escogió tema antes, aplicamos la clase .light
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light") {
    root.classList.add("light");
    if (modeBtn) modeBtn.textContent = "☀️"; // icono del sol si está en claro
  } else {
    // Si no hay valor guardado, mantenemos el tema por defecto (oscuro).
    // Opcional: podrías usar prefers-color-scheme para detectar preferencia del OS.
  }

  // --- Función auxiliar: leer variables CSS ------------------------------
  // Devuelve el valor de la variable CSS --nombre (ej: --accent)
  function getCssVar(name) {
    // getComputedStyle sobre documentElement para leer las variables definidas en :root o .light
    return getComputedStyle(root).getPropertyValue(name).trim();
  }

  // --- Generar configuración de tsParticles según el tema ---------------
  // Aquí definimos las opciones que pasaremos a tsParticles.load(...)
  function getParticlesConfig() {
    // Detectamos si el tema actual es claro
    const isLight = root.classList.contains("light");

    // Elegimos colores / cantidad / velocidad en función del tema
    const particleColor = isLight ? getCssVar("--accent-2") : getCssVar("--accent");
    const linkColor = isLight ? getCssVar("--muted") : getCssVar("--accent-2");
    const number = isLight ? 60 : 80;        // más partículas en modo oscuro
    const speed = isLight ? 1 : 1.5;         // velocidad ligeramente mayor en oscuro

    // Devolvemos el objeto completo de configuración. Comentarios internos explican cada bloque.
    return {
      // fullScreen hace que el canvas ocupe toda la pantalla; zIndex asegura que quede detrás
      fullScreen: { enable: true, zIndex: -1 },

      // color de fondo (usamos la variable CSS --bg)
      background: { color: getCssVar("--bg") },

      // límite de frames por segundo (opcional para rendimiento)
      fpsLimit: 60,

      // Interactividad (hover, click, resize)
      interactivity: {
        events: {
          // onHover: al pasar el ratón las partículas se repelen (modo "repulse")
          onHover: { enable: true, mode: "repulse" },

          // onClick: al hacer clic se "empujan" nuevas partículas (modo "push")
          onClick: { enable: true, mode: "push" },

          // resize: actualiza el canvas al redimensionar la ventana
          resize: true
        },
        modes: {
          // Configuración del modo "repulse"
          repulse: { distance: 120, duration: 0.4 },

          // Configuración del modo "push" (al hacer clic)
          push: { quantity: 4 }
        }
      },

      // Definición de partículas
particles: {
  number: { value: 15, density: { enable: true, area: 800 } },
  color: { value: getCssVar("--accent") },
  links: {
    enable: true,
    color: getCssVar("--accent-2"),
    distance: 150,
    opacity: 0.4,
    width: 2
  },
  move: {
    enable: true,
    speed: 1,
    direction: "none",
    outModes: { default: "bounce" }
  },
shape: {
  type: "char", // usamos caracteres
  character: [
    { value: "JavaScript", style: "normal", weight: "bold", font: "Verdana"},
    { value: "HTML", style: "normal", weight: "bold", font: "Verdana"},
    { value: "CSS", style: "normal", weight: "bold", font: "Verdana" },
    { value: "Python", style: "normal", weight: "bold", font: "Verdana" },
    { value: "C++", style: "normal", weight: "bold", font: "Verdana" },
    { value: "Java", style: "normal", weight: "bold", font: "Verdana" },
    { value: "C#", style: "normal", weight: "bold", font: "Verdana" }, 
    { value: "Ruby", style: "normal", weight: "bold", font: "Verdana" },
    { value: "PHP", style: "normal", weight: "bold", font: "Verdana" },
    { value: "Swift", style: "normal", weight: "bold", font: "Verdana" },
    { value: "React", style: "normal", weight: "bold", font: "Verdana" },
    { value: "Node.js", style: "normal", weight: "bold", font: "Verdana" }
  ],
},
size: {
  value: { min: 150, max: 300 } // ajusta tamaño de texto
},
color: {
  value: ["#f7df1e", "#e34f26", "#2965f1", "#3776ab", "#00599C", "#b07219", ] 
  // Colores típicos: JS (amarillo), HTML (naranja), CSS (azul), Python (azul), C++ (azul oscuro), Java (marrón)
},
  opacity: {
    value: 0.4,
    animation: { enable: true, speed: 1, minimumValue: 0.9 }
  },
  size: {
    value: { min: 5, max: 20 },
    animation: { enable: true, speed: 2, minimumValue: 8 }
  }
}

    };
  }

  // --- Cargar/recargar partículas ---------------------------------------
  function loadParticles() {
    // Protección: comprobar que la librería tsParticles se haya cargado
    if (typeof tsParticles === "undefined") {
      console.error("tsParticles no está cargado. Asegúrate de incluir la librería antes de app.js");
      return;
    }

    // Cargamos la configuración en el contenedor con id "tsparticles"
    // tsParticles.load(referenciaHTMLid, opciones)
    tsParticles.load("tsparticles", getParticlesConfig());
  }

  // Inicializamos al cargar la página
  loadParticles();

  // --- Control del botón de tema ----------------------------------------
  if (modeBtn) {
    modeBtn.addEventListener("click", () => {
      // Alterna la clase .light en <html>
      root.classList.toggle("light");

      // Actualiza icono y localStorage
      const isLight = root.classList.contains("light");
      localStorage.setItem(THEME_KEY, isLight ? "light" : "dark");
      modeBtn.textContent = isLight ? "☀️" : "🌙";

      // Recargamos partículas para que tomen los nuevos colores/valores
      loadParticles();
    });
  } else {
    // Mensaje útil para depuración si el button no existe
    console.warn("No se encontró #modeBtn en el DOM.");
  }

  // --- Menú móvil -------------------------------------------------------
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("active"));

    // Cerramos el menú cuando se pulsa uno de los enlaces
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => mobileMenu.classList.remove("active"));
    });
  } else {
    console.warn("No se encontró #menuBtn o #mobileMenu en el DOM.");
  }
});

const observer = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: .15 });
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));