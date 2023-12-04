const { DataTypes } = require('sequelize');
const sequelize = require('../Config/Database');


const House = sequelize.define('House', {
  houseId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  houseName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
  },
    // UserId: {
    //   type: DataTypes.INTEGER,
    // },
  });
  

module.exports = House;
