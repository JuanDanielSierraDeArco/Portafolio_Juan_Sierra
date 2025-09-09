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

