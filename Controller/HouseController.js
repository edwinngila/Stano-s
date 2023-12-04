const multer = require('multer');
const Houses = require('../Models/House');

const MenuController = {
  addHouse: async (req, res) => {
    try {

        const { houseName, description, price, location } = req.body;

        if (!houseName || !description || !price || !location ) {
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
          description: description,
          price: price,
          location: location,
      
        });

        if (newMenu) {
          return res.status(200).json({ message: 'Menu item added successfully' });
        }
      }
     catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }},
 

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
 
        const { houseName ,description, price, location } = req.body;

        const menuItem = await Houses.findByPk(req.params.houseId);
        console.log(menuItem);

        if (!menuItem) {
          return res.status(404).json({ error: 'Houese not found' });
        }

        menuItem.houseName = houseName;
        menuItem.description = description;
        menuItem.price = price;
        menuItem.location = location;
     

        await menuItem.save();

        return res.status(200).json({ message: 'Menu item updated successfully' });
      }
     catch (error) {

      return res.status(500).json({ error: 'Internal server error' });
    }
},

  deleteHouses: async (req, res) => {
    const houseId = req.params.houseId;

    try {
      const deletedItem = await Houses.destroy({
        where: {
          houseId: houseId,
        },
      });

      if (deletedItem) {
        res.status(200).json({ message: 'Item deleted successfully' });
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

};

module.exports = MenuController;
