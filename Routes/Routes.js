const express = require('express');
const router = express.Router();

const userController = require('../Controller/userController');
const RoleController = require('../Controller/RoleController');
const HouseController = require('../Controller/HouseController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/addRole', RoleController.addrole);
router.post('/addHouse', HouseController.addHouse);

router.get('/getAllUsers', userController.getAllUsers);
router.get('/getAllRoles', RoleController.getAllRoles);
router.get('/getAllHouses', HouseController.getAllHouses);

router.patch('/editRole/:id', RoleController.editRole);
router.patch('/editHouse/:id', HouseController.editHouses);

router.delete('/deleteUser/:id', userController.DeleteUser);
router.delete('/deleteRole/:id', RoleController.deleteRole);
router.delete('/deleteHouse/:id', HouseController.deleteHouses);

module.exports = router;
