import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(254),
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING(50),
    field: 'first_name',
  },
  lastName: {
    type: DataTypes.STRING(50),
    field: 'last_name',
  },
  company: {
    type: DataTypes.STRING(100),
  },
  phone: {
    type: DataTypes.STRING(20),
  },
  profileImg: {
    type: DataTypes.STRING(255),
    field: 'profile_img',
  },
  displayName: {
    type: DataTypes.STRING(100),
    field: 'display_name',
  },
  alterNumber: {
    type: DataTypes.STRING(20),
    field: 'alter_number',
  },
  createdOn: {
    type: DataTypes.INTEGER,
    field: 'created_on',
  },
  lastLogin: {
    type: DataTypes.INTEGER,
    field: 'last_login',
  },
  active: {
    type: DataTypes.TINYINT,
    defaultValue: 1,
  },
  groupId: {
    type: DataTypes.INTEGER,
    field: 'group_id',
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 10);
        user.password = await bcrypt.hash(user.password, salt);
      }
      user.createdOn = Math.floor(Date.now() / 1000);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
});

// Instance methods
User.prototype.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

User.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

export default User;

