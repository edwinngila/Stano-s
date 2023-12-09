const { DataTypes } = require('sequelize');
const sequelize = require('../Config/Database');

const HouseType = sequelize.define('HouseType', {
    houseTypesId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
  houseTypeName: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync()
  .then(async () => {
    try {
     
      const existingHouseTypes = await HouseType.findAll();

      if (existingHouseTypes.length === 0) {
      
        const houseTypesData = [
          { houseTypeName: 'home' },
          { houseTypeName: 'office' },
          { houseTypeName: 'land' },
          { houseTypeName: 'town' },
        ];

        await HouseType.bulkCreate(houseTypesData);
        console.log('House types added successfully');
      } else {
        console.log('House types already exist');
      }
    } catch (error) {
      console.error('Error seeding house types:', error);
    }
  })
  .catch((err) => {
    console.error('HouseType sync error:', err);
  });

module.exports = HouseType;
