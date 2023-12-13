const { DataTypes } = require('sequelize');
const sequelize = require('../Config/Database');


const House = sequelize.define('HouseProperty', {
  houseId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  PropertyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Propertyprice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  Year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Town: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  County: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  PropertyType: { 
    
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

});



module.exports = House;
