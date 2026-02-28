const DEFAULT_LANG = "es";
const SUPPORTED_LANGS = ["es", "en"];

function getSavedLang() {
  const saved = localStorage.getItem("lang");
  return SUPPORTED_LANGS.includes(saved) ? saved : DEFAULT_LANG;
}

async function loadTranslations(lang) {
  const res = await fetch(`../scripts/i18n/${lang}.json`, { cache: "no-store" });
  if (!res.ok) throw new Error(`No se pudo cargar el archivo de idioma: ${lang}`);
  return res.json();
}

function applyTranslations(translations) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[key] != null) el.textContent = translations[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[key] != null) el.setAttribute("placeholder", translations[key]);
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const raw = el.getAttribute("data-i18n-attr") || "";
    const pairs = raw
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean);

    pairs.forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      if (!attr || !key) return;
      if (translations[key] != null) el.setAttribute(attr, translations[key]);
    });
  });
}

async function setLanguage(lang) {
  const normalized = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;

  localStorage.setItem("lang", normalized);
  document.documentElement.lang = normalized;

  const translations = await loadTranslations(normalized);
  applyTranslations(translations);

  document.querySelectorAll("select.lang").forEach((sel) => {
    sel.value = normalized;
  });
}

function bindLanguageSelectors() {
  document.querySelectorAll("select.lang").forEach((sel) => {
    sel.addEventListener("change", (e) => {
      setLanguage(e.target.value).catch(console.error);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  bindLanguageSelectors();
  setLanguage(getSavedLang()).catch(console.error);
});