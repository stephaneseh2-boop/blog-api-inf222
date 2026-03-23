Blog API – INF222 EC1
API REST pour la gestion d’un blog simple, développée dans le cadre du TAF1 du cours INF222 (Développement Backend).
Technologies utilisées
Technologies utilisées
Composant
Technologie
Langage
Node.js (v18+)
Framework
Express.js 4.x
Base de données
SQLite (via Sequelize O
Documentation
Swagger UI (swagger-js
Installation
# 1. Cloner le dépôt
git clone https://github.com/votre-compte/blog-api-inf222.git
cd blog-api-inf222

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur
npm start
# ou en mode développement (rechargement automatique)
npm run dev
Le serveur démarre sur http://localhost:3000La documentation Swagger est disponible sur http://localhost:3000/api-docs
Endpoints
Créer un article
POST /api/articles
Content-Type: application/json

{
  "titre": "Introduction à Node.js",
  "contenu": "Node.js est un runtime JavaScript côté serveur...",
  "auteur": "Charles",
  "date": "2026-03-23",
  "categorie": "Technologie",
  "tags": ["node", "javascript", "backend"]
}
Réponse 201 :
{
  "message": "Article créé avec succès.",
  "article": { "id": 1, "titre": "...", ... }
}
Lister les articles
GET /api/articles
GET /api/articles?categorie=Technologie
GET /api/articles?auteur=Charles
GET /api/articles?date=2026-03-23
GET /api/articles?categorie=Tech&date=2026-03-18
Réponse 200 :
{
  "articles": [
    { "id": 1, "titre": "Introduction à Node.js", "auteur": "Charles", ... }
  ]
}
Lire un article unique
GET /api/articles/1
Réponse 200 : article complet | 404 : article introuvable
Modifier un article
PUT /api/articles/1
Content-Type: application/json

{
  "titre": "Node.js – Guide complet",
  "categorie": "Développement"
}
Réponse 200 : article mis à jour | 404 : introuvable
Supprimer un article
DELETE /api/articles/1
Réponse 200 :
{ "message": "Article ID 1 supprimé avec succès." }
Rechercher des articles
GET /api/articles/search?query=node
Réponse 200 :
{
  "results": 2,
  "articles": [...]
}
Codes HTTP utilisés
Code
Signification
200
OK - Requête réussie
201
Created - Ressource créée
400
Bad Request - Données invalides
404
Not Found - Article introuvable
500
Internal Server Error - Erreur serveur
Structure du projet
blog-api/
├── src/
│   ├── app.js                    # Point d'entrée principal
│   ├── config/
│   │   ├── database.js           # Connexion SQLite / Sequelize
│   │   └── swagger.js            # Configuration Swagger
│   ├── models/
│   │   └── Article.js            # Modèle Sequelize – table articles
│   ├── controllers/
│   │   └── articleController.js  # Logique métier CRUD
│   └── routes/
│       └── articleRoutes.js      # Définition des routes + JSDoc Swagger
├── database.db                   # Fichier SQLite (auto-généré)
├── package.json
└── README.md




