const DEFAULT_LANG = "es";
const SUPPORTED_LANGS = ["es", "en"];

function getSavedLang() {
  const saved = localStorage.getItem("lang");
  return SUPPORTED_LANGS.includes(saved) ? saved : DEFAULT_LANG;
}

async function loadTranslations(lang) {
  const isSubfolder = window.location.pathname.includes('/layout/');
  const path = isSubfolder ? `../scripts/i18n/${lang}.json` : `./scripts/i18n/${lang}.json`;
  
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`No se pudo cargar el archivo: ${lang}`);
  return res.json();
}

function applyTranslations(translations, lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[key] != null) {
      if (translations[key].includes('\n') || translations[key].includes('<br>')) {
        el.innerHTML = translations[key].replace(/\n/g, '<br>');
      } else {
        el.textContent = translations[key];
      }
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[key] != null) el.setAttribute("placeholder", translations[key]);
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const raw = el.getAttribute("data-i18n-attr") || "";
    const pairs = raw.split(";").map((s) => s.trim()).filter(Boolean);

    pairs.forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      if (attr && key && translations[key] != null) {
        el.setAttribute(attr, translations[key]);
      }
    });
  });
}

async function setLanguage(lang) {
  const normalized = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
  localStorage.setItem("lang", normalized);

  try {
    const translations = await loadTranslations(normalized);
    applyTranslations(translations, normalized);

    document.querySelectorAll("select.lang").forEach((sel) => {
      sel.value = normalized;
    });
  } catch (error) {
    console.error("Error al cambiar el idioma:", error);
  }
}

function bindLanguageSelectors() {
  document.querySelectorAll("select.lang").forEach((sel) => {
    sel.addEventListener("change", (e) => setLanguage(e.target.value));
  });
}

// Inicialización rápida
if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", () => {
    bindLanguageSelectors();
    setLanguage(getSavedLang());
  });
} else {
  bindLanguageSelectors();
  setLanguage(getSavedLang());
}