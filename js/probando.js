// app.js

document.addEventListener("DOMContentLoaded", () => {
    // -----Variables globales-----
    const root = document.documentElement;
    const THEME_KEY = "juan-theme";
    const modeBtn = document.getElementById("modeBtn");

    // Función para leer variables CSS
    function getCssVar(name) {
        return getComputedStyle(root).getPropertyValue(name).trim();
    }

    // -----Recuperar tema guardado-----
    function initTheme() {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved === "light") {
            root.classList.add("light");
            if (modeBtn) modeBtn.textContent = "☀️";
        }
    }

    // -----Alternar tema con botón-----
    function setupThemeToggle() {
        if (!modeBtn) return console.warn("No se encontró #modeBtn en el DOM.");

        modeBtn.addEventListener("click", () => {
            root.classList.toggle("light");
            const isLight = root.classList.contains("light");

            // Guardar tema en localStorage
            localStorage.setItem(THEME_KEY, () => {
                if (isLight) {
                    return "light";
                } else {
                    return "dark";
                }
            });

            // Cambiar icono => modeBtn.textContent = isLight ? "☀️" : "🌙";
            if (isLight) {
                modeBtn.textContent = "☀️";
            } else {
                modeBtn.textContent = "🌙";
            }

        });
    }

    // --- Inicializar ---
    initTheme();
    setupThemeToggle();
});
