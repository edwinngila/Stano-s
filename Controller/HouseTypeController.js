const HouseType = require('../Models/HouseType');

const HouseTypeController = {
    addHouseType: async (req, res) => {
        try {
            const { houseTypeName } = req.body;

            if (!houseTypeName) {
                return res.status(400).json({ error: [{ message: 'HouseType Required' }] });

            }
            const HouseTypeExist = await HouseType.findOne({
                where: {
                    houseTypeName: houseTypeName
                }
            })

            if (HouseTypeExist) {
                return res.status(400).json({ error: [{ message: 'HouseType Exists' }] });
            } else {
                const newHouseType = await HouseType.create({
                    houseTypeName: houseTypeName,
                });
                console.log(newHouseType);
                return res.status(200).json({ message: 'HouseType Created' });
            }


        } catch (error) {
            console.log(error);
        }
    },

    getHouseTypes: async (req, res) => {
        try {
            const allRoles = await HouseType.findAll();
            res.status(200).json(allRoles);
        } catch (error) {
            console.log('Error retriving users:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    editHouseType: async (req, res) => {
        try {
          const { houseTypeName } = req.body;
          const houseTypeId = req.params.id;
      
          if (!houseTypeName) {
            return res.status(400).json({ error: [{ message: 'HouseType is required' }] });
          }
      
          const houseTypeExist = await HouseType.findOne({
            where: {
              houseTypeName: houseTypeName,
            },
          });
      
          if (houseTypeExist) {
            return res.status(400).json({ error: [{ message: 'HouseType already exists' }] });
          }
      
          const [updatedRowsCount, updatedHouseTypes] = await HouseType.update(
            { houseTypeName: houseTypeName },
            {
              where: {
                houseTypesId: houseTypeId,
              },
              returning: true,
            }
          );
      
          if (updatedRowsCount === 0 || !updatedHouseTypes || updatedHouseTypes.length === 0) {
            return res.status(404).json({ error: 'HouseType not found' });
          }
      
          res.status(200).json({ message: 'HouseType updated successfully', updatedHouseType: updatedHouseTypes[0] });
      
        } catch (error) {
          console.error('Error updating HouseType:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      },
      

    deleteHouseType: async (req, res) => {
        try {
            const HouseTypeId = req.params.id;

            const HouseTypeToBeDeleted = await HouseType.findByPk(HouseTypeId);

            if (!HouseTypeToBeDeleted) {
                return res.status(404).json({ error: 'HouseType not found' });
            }


            const deletedHouseType = await HouseType.destroy({
                where: {
                    houseTypesId: HouseTypeId,
                },
            });

            if (deletedHouseType) {
                res.status(200).json({ message: 'HouseType deleted successfully' });
            } else {
                res.status(404).json({ error: 'HouseType not found' });
            }
        } catch (error) {
            console.error('Error deleting Housetype:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}
module.exports = HouseTypeController