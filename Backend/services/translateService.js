const path = require("path");
const fs = require("fs");

const TRANSLATIONS_PATH = path.join(process.cwd(), "data", "translations.json");

let translations = {};

function loadTranslations() {
  if (fs.existsSync(TRANSLATIONS_PATH)) {
    try {
      const raw = fs.readFileSync(TRANSLATIONS_PATH, "utf8");
      translations = JSON.parse(raw || "{}");
    } catch (err) {
      console.error("Failed to load translations:", err);
      translations = {};
    }
  } else {
    translations = {};
  }
}

// load at startup
loadTranslations();

function getTranslations(lang = "en") {
  if (!lang) lang = "en";
  return translations[lang] || translations["en"] || {};
}

module.exports = {
  getTranslations,
  loadTranslations,
};
