const multer = require('multer');
const users =require('../Models/Users');
const Houses = require('../Models/House');
const upload = require('../Middlewares/multerConfig');
const { where } = require('sequelize');

const HouseController = {
  addHouse: async (req, res) => {
    try {


      upload.single('propertyImage')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: 'File upload error' });
        } else if (err) {
          return res.status(500).json({ error: 'Internal server error' });
        }


        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }

        const { propertyName, PropertyPrice, Year, Town, County, PropertyType, description,UserId } = req.body;
        const propertyImg = req.file.filename;

        if (!propertyName || !PropertyPrice || !Year || !Town || !County || !PropertyType || !description || !propertyImg ||!UserId) {
          return res.status(400).json({ error: [{ message: 'All fields are required' }] });
        }
        const houseExist = await Houses.findOne({
          where: {
            PropertyName: propertyName
          }
        });

        if (houseExist) {
          return res.status(401).json({ error: [{ message: 'HouseProperty already exists' }] });
        }

        const newHouseProperty = await Houses.create({
          PropertyName: propertyName,
          Propertyprice: PropertyPrice,
          UserId:UserId,
          Year: Year,
          Town: Town,
          County: County,
          PropertyType: PropertyType,
          description: description,
          image: `${propertyImg}`,
        });

        if (newHouseProperty) {
          return res.status(200).json({ message: 'HouseProperty added successfully' });
        }

      })
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  getAllHouses: async (req, res) => {
    try {
      const allItems = await Houses.findAll();
      res.status(200).json({allItems:allItems});
    } catch (error) {
      console.log('Error retriving users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  editHouses: async (req, res) => {
    try {
      upload.single('propertyImage')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: 'File upload error' });
        } else if (err) {
          return res.status(500).json({ error: 'Internal server error' });
        }

        const { propertyName, PropertyPrice, Year, Town, County, PropertyType, description } = req.body;
        const houseId = req.params.id

        const house = await Houses.findByPk(houseId);

        if (!house) {
          return res.status(404).json({ error: 'House not found' });
        }

        house.propertyName = propertyName;
        house.PropertyPrice = PropertyPrice;
        house.Year = Year;
        house.Town = Town;
        house.County = County;
        house.PropertyType = PropertyType;
        house.description = description;

        await house.save();

        return res.status(200).json({ message: 'Houese updated successfully' });
      })
    }
    catch (error) {

      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteHouses: async (req, res) => {
    const houseId = req.params.id;

    try {
      const deletedItem = await Houses.destroy({
        where: {
          houseId: houseId,
        },
      });

      if (deletedItem) {
        res.status(200).json({ message: 'House deleted successfully' });
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getHouseById: async (req, res) => {
    const houseId = req.params.id;

    try {
      const allItems = await Houses.findOne(
        {
          where:{
            houseId:houseId
          },
          include:[
            {
              model:users
            }
          ]
        }
      );
      res.status(200).json({allItems:allItems});
    } catch (error) {
      console.log('Error retriving users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },


};


module.exports = HouseController;
