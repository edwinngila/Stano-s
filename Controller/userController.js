require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
const nodeMailer = require('nodemailer');

const Users = require('../Models/Users');

const SECRETKEY = process.env.SECRETKEY;

// Password schema

const PasswordSchema = new passwordValidator();

PasswordSchema
  .is().min(8)
  .has().uppercase()
  .has().symbols();

const userController = {
  // Register User
  register: async (req, res, next) => {
    try {
      const { userName, email, password, contact, location} = req.body;

      // Validate required fields
      if (!userName || !email || !password || !contact || !location) {
        return res.status(400).json({ error: [{ message: 'All fields are required' }] });
      }


      const UserExist = await Users.findOne({
        where: {
          email: email
        }
      });

      if (UserExist) {
        return res.status(401).json({ error: [{ message: 'User already exists' }] });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: [{ message: 'Invalid Email!' }] });
      }

  
      if (!PasswordSchema.validate(password)) {
        return res.status(400).json({ error: [{ message: 'Password must have at least 8 characters, one uppercase letter, and one special character' }] });
      }

      const salt = await bcrypt.genSalt();
      const HashedPassword = await bcrypt.hash(password, salt);

      const newUser = await Users.create({
        userName: userName,
        email: email,
        Password: HashedPassword,
        contact : contact,
        location: location 
      });

      if (!newUser.email) {
        return res.status(400).json({ error: [{ message: 'Email is required' }] });
      }

      return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({ error: [{ message: 'Internal server error' }] });
    }
  },

  // Login User
 
login: async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ error: [{ message: 'All fields are requiredn' }] });
    }


    const EmailExist = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (!EmailExist) {
      return res.status(400).json({ error: [{ message: "User doesn't exist! Register instead" }] });
    }

    const isPassword = await bcrypt.compare(password, EmailExist.Password);

    if (!isPassword) {
      return res.status(401).json({ error: [{ message: "Invalid password" }] });
    }

    const token = jwt.sign({ id: EmailExist.id }, SECRETKEY, { expiresIn: '1hr' });

    if (!token) {
      return res
        .status(500)
        .json({ error: [{ message: 'Token generation failed' }] });
    }

   
    const userData = {
      message: 'Login successful',
      userId:EmailExist.UserId,
      userName: EmailExist.userName,
      contact: EmailExist.contact,
      location: EmailExist.location,
      role: EmailExist.roleId, 
      token: token
    };

    res.cookie('userData', JSON.stringify(userData), { httpOnly: true });
  

    return res.json({
      userData
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: [{ message: 'Internal server error' }] });
  }
},
getAllUsers: async (req, res) => {
  try {
    const allusers = await Users.findAll();
    res.status(200).json({allusers:allusers});
  } catch (error) {
    console.log('Error retriving users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
},


DeleteUser: async (req, res) => {

  const userId = req.params.id;

  try {
    const userToDelete = await Users.findByPk(userId);

    if (!userToDelete) {
      return res.status(404).json({ error: 'User not found' })
    }

    //confriming if is admin
    if (userToDelete.roleId === 1) {
      return res.status(401).json({ error: [{ message: "Can't delete an admin user" }] });
    }

    //permision to delete non-admin
    const deleteUser = await Users.destroy({
      where: {
        id: userId
      }
    })


    if (deleteUser) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }

  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

},


};

module.exports = userController