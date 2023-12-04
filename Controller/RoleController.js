const Role = require('../Models/Role');

const RoleController = {
  addrole: async (req, res, next) => {
    try {
      const { roleName } = req.body;

      if (!roleName) {
        return res.status(400).json({ error: [{ message: 'Role Required' }] });

      }
      const roleExist = await Role.findOne({
        where: {
          roleName: roleName
        }
      })

      if (roleExist) {
        return res.status(400).json({ error: [{ message: 'Role Exists' }] });
      } else {
        const newRole = await Role.create({
          roleName: roleName,
        });
        console.log(newRole);
        return res.status(200).json({ message: 'Role Created' });
      }
      next()

    } catch (error) {
      console.log(error);
    }
  },


  getAllRoles: async (req, res) => {
    try {
      const allRoles = await Role.findAll();
      res.status(200).json(allRoles);
    } catch (error) {
      console.log('Error retriving users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  editRole: async (req, res) => {
    try {
      const { roleName } = req.body;
      const roleId = req.params.roleId;


      if (!roleName) {
        return res.status(400).json({ error: [{ message: 'Role Name is required' }] });
      }


      if (roleName === 'Admin' || roleName === 'User') {
        return res.status(403).json({ error: 'Cannot edit User or Admin roles' });
      }

      const roleExist = await Role.findOne({
        where: {
          roleName: roleName,
        }
      });

      if (roleExist) {
        return res.status(400).json({ error: [{ message: 'Role name already exists' }] });
      }


      const [updatedRowsCount, updatedRoles] = await Role.update({ roleName: roleName }, {
        where: {
          roleId: roleId,
        },
        returning: true,
      });

      if (updatedRowsCount === 0 || !updatedRoles || updatedRoles.length === 0) {
        return res.status(404).json({ error: 'Role not found' });
      }

      res.status(200).json({ message: 'Role updated successfully', updatedRole: updatedRoles[0] });

    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteRole: async (req, res) => {
    try {
      const roleId = req.params.roleId;

      const roleToBeDeleted = await Role.findByPk(roleId);

      if (!roleToBeDeleted) {
        return res.status(404).json({ error: 'Role not found' });
      }

      const roleName = roleToBeDeleted.roleName;

      if (roleName === 'User' || roleName === 'Admin') {
        return res.status(403).json({ error: 'Cannot delete User or Admin roles' });
      }


      const deletedRole = await Role.destroy({
        where: {
          roleId: roleId,
        },
      });

      if (deletedRole) {
        res.status(200).json({ message: 'Role deleted successfully' });
      } else {
        res.status(404).json({ error: 'Role not found' });
      }
    } catch (error) {
      console.error('Error deleting role:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

}
module.exports = RoleController