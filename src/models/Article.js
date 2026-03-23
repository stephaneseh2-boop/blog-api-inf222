// src/models/Article.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titre: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Le titre ne peut pas être vide.' },
      len: { args: [3, 255], msg: 'Le titre doit contenir entre 3 et 255 caractères.' },
    },
  },
  contenu: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Le contenu ne peut pas être vide.' },
    },
  },
  auteur: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: "L'auteur est obligatoire." },
    },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  categorie: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: 'Général',
  },
  tags: {
    type: DataTypes.TEXT,  // stocké en JSON stringifié
    allowNull: true,
    defaultValue: '[]',
    get() {
      const raw = this.getDataValue('tags');
      try { return JSON.parse(raw); } catch { return []; }
    },
    set(val) {
      this.setDataValue('tags', JSON.stringify(Array.isArray(val) ? val : []));
    },
  },
}, {
  tableName: 'articles',
  timestamps: true,   // createdAt, updatedAt automatiques
});

module.exports = Article;
