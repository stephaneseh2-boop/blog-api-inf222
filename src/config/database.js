// src/config/database.js
const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.db'),
  logging: false,            // désactiver les logs SQL en production
});

module.exports = sequelize;
