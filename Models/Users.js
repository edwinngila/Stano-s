const { DataTypes } = require('sequelize');
const sequelize = require('../Config/Database'); 
const bcrypt = require('bcrypt');
const Role = require('./Role')

const User = sequelize.define('User', {
  UserId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
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
  roleId: {
    type: DataTypes.INTEGER,
    defaultValue: 2,
  },
});

sequelize.sync()
  .then(async () => {
    try {
      const superAdminData = {
        userName: 'Stano',
        email: 'admin@gmail.com',
        password: 'Admin123.',
        contact: '123456789',
        location: 'Nairobi',
        roleId: 1,
      };

      const existingSuperAdmin = await User.findOne({
        where: {
          email: superAdminData.email,
        }
      });

      if (!existingSuperAdmin) {
        const hashedPassword = await bcrypt.hash(superAdminData.password, 10); 
        superAdminData.Password = hashedPassword;

       
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

  User.belongsTo(Role, { foreignKey:"roleId"});

module.exports = User;
