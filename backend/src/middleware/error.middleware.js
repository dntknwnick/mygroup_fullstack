import logger from '../config/logger.js';
import { MESSAGES } from '../config/constants.js';

/**
 * Custom error class
 */
export class AppError extends Error {
  constructor(message, statusCode = 500, code = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Not found error handler
 */
export const notFound = (req, res, next) => {
  const error = new AppError(`Route not found: ${req.originalUrl}`, 404, 'NOT_FOUND');
  next(error);
};

/**
 * Global error handler
 */
export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.stack = err.stack;

  // Log error
  logger.error(`Error: ${error.message}`, {
    stack: error.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    user: req.user?.username,
  });

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    const messages = err.errors.map(e => e.message);
    error = new AppError(messages.join(', '), 400, 'VALIDATION_ERROR');
  }

  // Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors[0]?.path || 'field';
    error = new AppError(`${field} already exists`, 400, 'DUPLICATE_ENTRY');
  }

  // Sequelize foreign key constraint error
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    error = new AppError('Invalid reference to related resource', 400, 'FOREIGN_KEY_ERROR');
  }

  // Sequelize database error
  if (err.name === 'SequelizeDatabaseError') {
    error = new AppError('Database error occurred', 500, 'DATABASE_ERROR');
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new AppError('Invalid token', 401, 'INVALID_TOKEN');
  }

  if (err.name === 'TokenExpiredError') {
    error = new AppError('Token expired', 401, 'TOKEN_EXPIRED');
  }

  // Multer file upload errors
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      error = new AppError('File size too large', 400, 'FILE_TOO_LARGE');
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      error = new AppError('Unexpected file field', 400, 'UNEXPECTED_FILE');
    } else {
      error = new AppError('File upload error', 400, 'UPLOAD_ERROR');
    }
  }

  // Default to 500 server error
  const statusCode = error.statusCode || 500;
  const message = error.message || MESSAGES.ERROR.SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message,
    code: error.code,
    ...(process.env.NODE_ENV === 'development' && {
      stack: error.stack,
      error: err,
    }),
  });
};

export default { AppError, notFound, errorHandler };

