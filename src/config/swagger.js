// src/config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API – INF222 EC1',
      version: '1.0.0',
      description:
        'API REST pour la gestion d\'un blog simple (articles). ' +
        'Développée dans le cadre du TP1 du cours INF222.',
      contact: { name: 'INF222 – Charles Njiosseu' },
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Serveur de développement' },
    ],
    components: {
      schemas: {
        ArticleInput: {
          type: 'object',
          required: ['titre', 'contenu', 'auteur'],
          properties: {
            titre:     { type: 'string', example: 'Introduction à Node.js' },
            contenu:   { type: 'string', example: 'Node.js est un environnement…' },
            auteur:    { type: 'string', example: 'Charles' },
            date:      { type: 'string', format: 'date', example: '2026-03-23' },
            categorie: { type: 'string', example: 'Technologie' },
            tags:      { type: 'array', items: { type: 'string' }, example: ['node', 'backend'] },
          },
        },
        Article: {
          allOf: [
            { $ref: '#/components/schemas/ArticleInput' },
            {
              type: 'object',
              properties: {
                id:        { type: 'integer', example: 1 },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
              },
            },
          ],
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
