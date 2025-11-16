import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.js';
import logger from '../config/logger.js';

/**
 * Generate access token
 */
export const generateAccessToken = (user, roles = []) => {
  try {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: roles,
      groupId: user.groupId,
    };

    return jwt.sign(payload, jwtConfig.secret, {
      expiresIn: jwtConfig.accessTokenExpiry,
      issuer: jwtConfig.issuer,
      audience: jwtConfig.audience,
    });
  } catch (error) {
    logger.error('Error generating access token:', error);
    throw error;
  }
};

/**
 * Generate refresh token
 */
export const generateRefreshToken = (user) => {
  try {
    const payload = {
      id: user.id,
      username: user.username,
      type: 'refresh',
    };

    return jwt.sign(payload, jwtConfig.secret, {
      expiresIn: jwtConfig.refreshTokenExpiry,
      issuer: jwtConfig.issuer,
      audience: jwtConfig.audience,
    });
  } catch (error) {
    logger.error('Error generating refresh token:', error);
    throw error;
  }
};

/**
 * Verify token
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtConfig.secret, {
      issuer: jwtConfig.issuer,
      audience: jwtConfig.audience,
    });
  } catch (error) {
    logger.error('Error verifying token:', error);
    throw error;
  }
};

/**
 * Decode token without verification
 */
export const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    logger.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Generate password reset token
 */
export const generatePasswordResetToken = (userId, email) => {
  try {
    const payload = {
      id: userId,
      email: email,
      type: 'password_reset',
    };

    return jwt.sign(payload, jwtConfig.secret, {
      expiresIn: '1h', // Password reset tokens expire in 1 hour
      issuer: jwtConfig.issuer,
      audience: jwtConfig.audience,
    });
  } catch (error) {
    logger.error('Error generating password reset token:', error);
    throw error;
  }
};

/**
 * Generate email verification token
 */
export const generateEmailVerificationToken = (userId, email) => {
  try {
    const payload = {
      id: userId,
      email: email,
      type: 'email_verification',
    };

    return jwt.sign(payload, jwtConfig.secret, {
      expiresIn: '24h', // Email verification tokens expire in 24 hours
      issuer: jwtConfig.issuer,
      audience: jwtConfig.audience,
    });
  } catch (error) {
    logger.error('Error generating email verification token:', error);
    throw error;
  }
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  decodeToken,
  generatePasswordResetToken,
  generateEmailVerificationToken,
};

