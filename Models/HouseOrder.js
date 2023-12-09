const { DataTypes } = require('sequelize');
const sequelize = require('../Config/Database');
const User = require('./Users')

const HouseOrders = sequelize.define('HouseOrdes', {
    houseOrderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
    //I DOUBT IF THESE ARE NESSESARY JUU WITH THE USERID WE CAN ABLE TO RETRIVE ALL USER INFO **************************************
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    PhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

sequelize.sync()
   
HouseOrders.belongsTo(User, { foreignKey:"UserId"});

module.exports = HouseOrders;
