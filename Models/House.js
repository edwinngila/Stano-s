const { DataTypes } = require('sequelize');
const sequelize = require('../Config/Database');
const HouseType = require('./HouseType')

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
  Town: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  County: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
  },
  YearBuilt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  houseTypesId:{
    type:DataTypes.INTEGER,
    allowNull: false
  }
  });
  
  House.belongsTo(HouseType, {foreignKey:"houseTypesId"})

module.exports = House;
