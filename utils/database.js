const { Sequelize } = require('sequelize');

const database = 'express-rest-practice';
const username = 'root';
const password = 'root';

// Sequelize config
const sequelize = new Sequelize(database, username, password, {
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;