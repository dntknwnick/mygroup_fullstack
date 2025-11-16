import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import logger from './logger.js';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'my_group',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: process.env.NODE_ENV === 'development' ? (msg) => logger.debug(msg) : false,
    pool: {
      max: parseInt(process.env.DB_POOL_MAX) || 5,
      min: parseInt(process.env.DB_POOL_MIN) || 0,
      acquire: parseInt(process.env.DB_POOL_ACQUIRE) || 30000,
      idle: parseInt(process.env.DB_POOL_IDLE) || 10000,
    },
    define: {
      timestamps: false, // We're using custom timestamp fields
      underscored: false, // We're using camelCase in models
    },
    timezone: '+00:00', // UTC timezone
  }
);

// Test database connection
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info('✅ Database connection established successfully');
    return true;
  } catch (error) {
    logger.error('❌ Unable to connect to the database:', error);
    return false;
  }
};

// Sync database (use with caution in production)
export const syncDatabase = async (options = {}) => {
  try {
    await sequelize.sync(options);
    logger.info('✅ Database synchronized successfully');
    return true;
  } catch (error) {
    logger.error('❌ Database synchronization failed:', error);
    return false;
  }
};

export default sequelize;

