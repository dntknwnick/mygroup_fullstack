import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.js';
import logger from '../config/logger.js';
import { MESSAGES } from '../config/constants.js';

/**
 * Middleware to verify JWT token
 */
export const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: MESSAGES.ERROR.UNAUTHORIZED,
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = jwt.verify(token, jwtConfig.secret, {
      issuer: jwtConfig.issuer,
      audience: jwtConfig.audience,
    });

    // Attach user info to request
    req.user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
      roles: decoded.roles,
      groupId: decoded.groupId,
    };

    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired',
        code: 'TOKEN_EXPIRED',
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
        code: 'INVALID_TOKEN',
      });
    }

    return res.status(401).json({
      success: false,
      message: MESSAGES.ERROR.UNAUTHORIZED,
    });
  }
};

/**
 * Optional authentication - doesn't fail if no token
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, jwtConfig.secret);
      
      req.user = {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
        roles: decoded.roles,
        groupId: decoded.groupId,
      };
    }
    
    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};

export default { authenticate, optionalAuth };

