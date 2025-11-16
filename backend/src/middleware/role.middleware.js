import { USER_ROLES, MESSAGES } from '../config/constants.js';
import logger from '../config/logger.js';

/**
 * Middleware to check if user has required role(s)
 * @param {string|string[]} allowedRoles - Single role or array of roles
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: MESSAGES.ERROR.UNAUTHORIZED,
        });
      }

      const userRoles = req.user.roles || [];
      
      // Check if user has any of the allowed roles
      const hasRole = allowedRoles.some(role => userRoles.includes(role));

      if (!hasRole) {
        logger.warn(`User ${req.user.username} attempted to access restricted resource. Required roles: ${allowedRoles.join(', ')}`);
        return res.status(403).json({
          success: false,
          message: MESSAGES.ERROR.FORBIDDEN,
        });
      }

      next();
    } catch (error) {
      logger.error('Authorization error:', error);
      return res.status(500).json({
        success: false,
        message: MESSAGES.ERROR.SERVER_ERROR,
      });
    }
  };
};

/**
 * Check if user is admin
 */
export const isAdmin = authorize(USER_ROLES.ADMIN, USER_ROLES.GROUPS);

/**
 * Check if user is corporate
 */
export const isCorporate = authorize(USER_ROLES.CORPORATE, USER_ROLES.HEAD_OFFICE, USER_ROLES.REGIONAL, USER_ROLES.BRANCH);

/**
 * Check if user is client
 */
export const isClient = authorize(USER_ROLES.CLIENT, USER_ROLES.CLIENT_GOD);

/**
 * Check if user is partner
 */
export const isPartner = authorize(USER_ROLES.PARTNER);

/**
 * Check if user is reporter
 */
export const isReporter = authorize(USER_ROLES.REPORTER);

/**
 * Check if user owns the resource
 */
export const isOwner = (resourceUserIdField = 'userId') => {
  return (req, res, next) => {
    try {
      const resourceUserId = req.params[resourceUserIdField] || req.body[resourceUserIdField];
      
      if (!resourceUserId) {
        return next(); // Let the controller handle missing resource
      }

      if (parseInt(resourceUserId) !== req.user.id) {
        // Check if user is admin (admins can access all resources)
        const isAdmin = req.user.roles.includes(USER_ROLES.ADMIN) || req.user.roles.includes(USER_ROLES.GROUPS);
        
        if (!isAdmin) {
          return res.status(403).json({
            success: false,
            message: MESSAGES.ERROR.FORBIDDEN,
          });
        }
      }

      next();
    } catch (error) {
      logger.error('Ownership check error:', error);
      return res.status(500).json({
        success: false,
        message: MESSAGES.ERROR.SERVER_ERROR,
      });
    }
  };
};

export default { authorize, isAdmin, isCorporate, isClient, isPartner, isReporter, isOwner };

