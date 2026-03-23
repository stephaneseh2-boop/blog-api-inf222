// src/controllers/articleController.js
const { Op } = require('sequelize');
const Article = require('../models/Article');

// ─── Créer un article ───────────────────────────────────────────────────────
// POST /api/articles
exports.createArticle = async (req, res) => {
  try {
    const { titre, contenu, auteur, date, categorie, tags } = req.body;
    const article = await Article.create({ titre, contenu, auteur, date, categorie, tags });
    return res.status(201).json({
      message: 'Article créé avec succès.',
      article,
    });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const messages = err.errors.map((e) => e.message);
      return res.status(400).json({ error: 'Validation échouée.', details: messages });
    }
    return res.status(500).json({ error: 'Erreur serveur.', details: err.message });
  }
};

// ─── Lister les articles (avec filtres optionnels) ──────────────────────────
// GET /api/articles?categorie=Tech&auteur=Charles&date=2026-03-18
exports.getArticles = async (req, res) => {
  try {
    const { categorie, auteur, date } = req.query;
    const where = {};
    if (categorie) where.categorie = { [Op.like]: `%${categorie}%` };
    if (auteur)    where.auteur    = { [Op.like]: `%${auteur}%` };
    if (date)      where.date      = date;

    const articles = await Article.findAll({ where, order: [['date', 'DESC']] });
    return res.status(200).json({ articles });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur.', details: err.message });
  }
};

// ─── Lire un article par ID ─────────────────────────────────────────────────
// GET /api/articles/:id
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: `Article avec l'ID ${req.params.id} introuvable.` });
    }
    return res.status(200).json({ article });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur.', details: err.message });
  }
};

// ─── Modifier un article ────────────────────────────────────────────────────
// PUT /api/articles/:id
exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: `Article avec l'ID ${req.params.id} introuvable.` });
    }

    const { titre, contenu, auteur, date, categorie, tags } = req.body;
    await article.update({ titre, contenu, auteur, date, categorie, tags });

    return res.status(200).json({ message: 'Article mis à jour avec succès.', article });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const messages = err.errors.map((e) => e.message);
      return res.status(400).json({ error: 'Validation échouée.', details: messages });
    }
    return res.status(500).json({ error: 'Erreur serveur.', details: err.message });
  }
};

// ─── Supprimer un article ───────────────────────────────────────────────────
// DELETE /api/articles/:id
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: `Article avec l'ID ${req.params.id} introuvable.` });
    }
    await article.destroy();
    return res.status(200).json({ message: `Article ID ${req.params.id} supprimé avec succès.` });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur.', details: err.message });
  }
};

// ─── Recherche full-text ────────────────────────────────────────────────────
// GET /api/articles/search?query=texte
exports.searchArticles = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.trim() === '') {
      return res.status(400).json({ error: 'Le paramètre "query" est requis.' });
    }
    const articles = await Article.findAll({
      where: {
        [Op.or]: [
          { titre:   { [Op.like]: `%${query}%` } },
          { contenu: { [Op.like]: `%${query}%` } },
          { auteur:  { [Op.like]: `%${query}%` } },
        ],
      },
      order: [['date', 'DESC']],
    });
    return res.status(200).json({ results: articles.length, articles });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur.', details: err.message });
  }
};
