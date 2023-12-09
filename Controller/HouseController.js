const multer = require('multer');
const Houses = require('../Models/House');
const upload = require('../Middlewares/multerConfig')

const HouseController = {
  addHouse: async (req, res) => {
    try {

      upload.single('houseImage')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: 'File upload error' });
        } else if (err) {
          return res.status(500).json({ error: 'Internal server error' });
        }


        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }


        const { houseName, description, price, Town, County, location, YearBuilt, houseTypes } = req.body;
        const houseImage = req.file.filename;

        if (!houseName || !image || !description || !price || !Town || !County || !location || !YearBuilt || !houseTypes) {
          return res.status(400).json({ error: [{ message: 'All fields are required' }] });
        }
        const houseExist = await Houses.findOne({
          where: {
            houseName: houseName
          }
        });

        if (houseExist) {
          return res.status(401).json({ error: [{ message: 'House already exists' }] });
        }

        const newMenu = await Houses.create({
          houseName: houseName,
          image: `./Image/${houseImage}`,
          description: description,
          price: price,
          Town: Town,
          County: County,
          location: location,
          YearBuilt: YearBuilt,
          houseTypes: houseTypes,
        });

        if (newMenu) {
          return res.status(200).json({ message: 'House added successfully' });
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
      res.status(200).json(allItems);
    } catch (error) {
      console.log('Error retriving users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  editHouses: async (req, res) => {
    try {
      upload.single('roomImage')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: 'File upload error' });
        } else if (err) {
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }

        const { houseName, description, price, Town, County, location, YearBuilt, houseTypes } = req.body;
        const houseId = req.params.id
        const houseImage = req.file.filename;

        const house = await Houses.findByPk(houseId);
       

        if (!house) {
          return res.status(404).json({ error: 'House not found' });
        }

        house.houseName = houseName;
        house.image = `./Image/${houseImage}`;
        house.description = description;
        house.price = price;
        house.Town = Town;
        house.County = County;
        house.location = location;
        house.YearBuilt = YearBuilt;
        house.houseTypes = houseTypes;

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

};

  module.exports = HouseController;
