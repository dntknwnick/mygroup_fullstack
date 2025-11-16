import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const GroupCreate = sequelize.define('GroupCreate', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  appsName: {
    type: DataTypes.STRING(100),
    field: 'apps_name',
  },
  dbName: {
    type: DataTypes.STRING(100),
    field: 'db_name',
  },
  status: {
    type: DataTypes.TINYINT,
    defaultValue: 1,
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
  tableName: 'group_create',
  timestamps: true,
});

export default GroupCreate;

