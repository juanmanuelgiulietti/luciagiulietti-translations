const DEFAULT_LANG = "es";

const STORAGE_KEY = "lang";

let currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;

async function loadLanguage(lang) {
  const response = await fetch(`../scripts/i18n/${lang}.json`);

  const translations = await response.json();

  applyTranslations(translations);

  localStorage.setItem(STORAGE_KEY, lang);

  document.documentElement.lang = lang;
}

function applyTranslations(translations) {

  const textElements = document.querySelectorAll("[data-i18n]");

  textElements.forEach(element => {
    const key = element.getAttribute("data-i18n");

    if (translations[key]) {
      element.textContent = translations[key];
    }
  });

  const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]");

  placeholderElements.forEach(element => {
    const key = element.getAttribute("data-i18n-placeholder");

    if (translations[key]) {
      element.placeholder = translations[key];
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {

  loadLanguage(currentLang);

  const langSelect = document.getElementById("lang");

  if (langSelect) {
    langSelect.value = currentLang;

    langSelect.addEventListener("change", event => {
      loadLanguage(event.target.value);
    });
  }

  const langMobileSelect = document.getElementById("lang-mobile");

  if (langMobileSelect) {
    langMobileSelect.value = currentLang;

    langMobileSelect.addEventListener("change", event => {
      loadLanguage(event.target.value);
    });
  }
});
