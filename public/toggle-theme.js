// ==========================================
// Konfiguration & State
// ==========================================
const primaryColorScheme = ""; // "light" | "dark"
let themeValue = getPreferTheme();

function getPreferTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) return savedTheme;
  if (primaryColorScheme) return primaryColorScheme;
  
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// ==========================================
// Kern-Logik (Theme spiegeln)
// ==========================================
function reflectPreference() {
  document.documentElement.setAttribute("data-theme", themeValue);

  document.querySelector("#theme-btn")?.setAttribute("aria-label", `Theme: ${themeValue}`);
  if (document.body) {
    const bgColor = window.getComputedStyle(document.body).backgroundColor;
    document.querySelector("meta[name='theme-color']")?.setAttribute("content", bgColor);
  }
}

function setPreference() {
  localStorage.setItem("theme", themeValue);
  reflectPreference();
}

reflectPreference();

// ==========================================
// Event-Handling & Astro Lifecycle
// ==========================================
function initThemeFeature() {
  reflectPreference();

  const themeBtn = document.querySelector("#theme-btn");
  if (themeBtn) {
    themeBtn.replaceWith(themeBtn.cloneNode(true)); 
    document.querySelector("#theme-btn").addEventListener("click", () => {
      themeValue = themeValue === "light" ? "dark" : "light";
      setPreference();
    });
  }
}


document.addEventListener("DOMContentLoaded", reflectPreference);


window.addEventListener("load", initThemeFeature);
document.addEventListener("astro:after-swap", initThemeFeature);

window.matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    if (!localStorage.getItem("theme")) {
      themeValue = isDark ? "dark" : "light";
      reflectPreference();
    }
  });
