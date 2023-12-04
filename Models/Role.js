const { DataTypes } = require('sequelize');
const sequelize = require('../Config/Database');

const Role = sequelize.define('Roles', {
  roleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  roleName: {
    type: DataTypes.STRING,
 
  },
});

sequelize.sync()
  .then(async () => {
    try {
     
      const adminRole = {
        roleId: 1,
        roleName: 'Admin',
      };

      const existingAdminRole = await Role.findOne({
        where: {
          roleName: adminRole.roleName,
        }
      });

      if (!existingAdminRole) {
        const adminRoleRecord = await Role.create(adminRole);
        console.log('Admin role created:', adminRoleRecord);
      } else {
        console.log('Admin role already exists:', existingAdminRole);
      }

      // Role 2: User
      const userRole = {
        roleId: 2,
        roleName: 'User',
      };

      const existingUserRole = await Role.findOne({
        where: {
          roleName: userRole.roleName,
        }
      });

      if (!existingUserRole) {
        const userRoleRecord = await Role.create(userRole);
        console.log('User role created:', userRoleRecord);
      } else {
        console.log('User role already exists:', existingUserRole);
      }
    } catch (error) {
      console.error('Error creating roles:', error);
    }
  })
  .catch((err) => {
    console.error('Roles error:', err);
  });

module.exports = Role;


