const express = require('express');
const router = express.Router();

const userController = require('../Controller/userController');
const RoleController = require('../Controller/RoleController');
const HouseController = require('../Controller/HouseController');
const HouseTypeController = require('../Controller/HouseTypeController');
const { ContactSeller } = require('../Controller/MakesellController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/addRole', RoleController.addrole);
router.post('/addHouse', HouseController.addHouse);
router.post('/addHouseTypes', HouseTypeController.addHouseType);
router.post('/ContactSeller',ContactSeller)

router.get('/getAllUsers', userController.getAllUsers);
router.get('/getAllRoles', RoleController.getAllRoles);
router.get('/getAllHouses', HouseController.getAllHouses);
router.get('/getAllHouseTypes', HouseTypeController.getHouseTypes);
router.get('/getHouseById/:id', HouseController.getHouseById);

router.patch('/editRole/:id', RoleController.editRole);
router.patch('/editHouse/:id', HouseController.editHouses);
router.patch('/editHouseType/:id', HouseTypeController.editHouseType);

router.delete('/deleteUser/:id', userController.DeleteUser);
router.delete('/deleteRole/:id', RoleController.deleteRole);
router.delete('/deleteHouse/:id', HouseController.deleteHouses);
router.delete('/deleteHouseType/:id', HouseTypeController.deleteHouseType);

module.exports = router;
