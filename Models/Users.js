const { DataTypes } = require('sequelize');
const sequelize = require('../Config/Database'); 
const bcrypt =require('bcrypt');

const User = sequelize.define('User', {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'User',
  },
});


sequelize.sync()

  .then(async() => {

      try {
        const superAdminData = {
          userName: 'Stano',
          email: 'admin@gmail.com',
          password: 'Admin123.',
          contact: '123456789',
          location: 'nairobi',
          role: 'Admin',
        };

        const existingSuperAdmin = await User.findOne({
          where: {
            email: superAdminData.email,
          }
        });

        if (!existingSuperAdmin) {
          const hashedPassword = await bcrypt.hash(superAdminData.Password, 10);
          superAdminData.Password = hashedPassword;

          // Creating the super admin user
          const superAdmin = await User.create(superAdminData);
          console.log('Super admin created:', superAdmin);
        } else {
          console.log('Super admin already exists:', existingSuperAdmin);
        }
      } catch (error) {
        console.error('Error creating super admin:', error);
      }
  })
  .catch((err) => {
    console.error('Users error:', err);
  });

module.exports = User;
