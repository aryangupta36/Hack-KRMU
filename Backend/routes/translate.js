const router = require('express').Router();
const { getTranslations } = require('../services/translateService');

// GET /translate - returns translations for session language or query ?lang=xx
router.get('/', (req, res) => {
  const lang = req.session && req.session.language ? req.session.language : (req.query.lang || 'en');
  const translations = getTranslations(lang);
  res.json({ lang, translations });
});

module.exports = router;
