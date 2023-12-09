const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('realestate', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});


module.exports = sequelize;