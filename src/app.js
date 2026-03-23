// src/app.js
const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');

const sequelize       = require('./config/database');
const { swaggerUi, specs } = require('./config/swagger');
const articleRoutes   = require('./routes/articleRoutes');

// ─── Initialisation ─────────────────────────────────────────────────────────
const app  = express();
const PORT = process.env.PORT || 3000;

// ─── Middlewares globaux ─────────────────────────────────────────────────────
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Documentation Swagger ───────────────────────────────────────────────────
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/articles', articleRoutes);

// Route d'accueil
app.get('/', (req, res) => {
  res.json({
    message: '🎉 Blog API – INF222 EC1',
    version: '1.0.0',
    documentation: `http://localhost:${PORT}/api-docs`,
    endpoints: {
      articles: `http://localhost:${PORT}/api/articles`,
    },
  });
});

// ─── Gestion des routes inexistantes ─────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} introuvable.` });
});

// ─── Gestion globale des erreurs ──────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur serveur interne.', details: err.message });
});

// ─── Connexion DB et démarrage ────────────────────────────────────────────────
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('✅  Base de données SQLite synchronisée.');
    app.listen(PORT, () => {
      console.log(`🚀  Serveur démarré sur http://localhost:${PORT}`);
      console.log(`📖  Swagger UI disponible sur http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('❌  Erreur de connexion à la base de données :', err);
    process.exit(1);
  });

module.exports = app;
