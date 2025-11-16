import User from '../models/User.js';
import Group from '../models/Group.js';
import GroupCreate from '../models/GroupCreate.js';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../services/tokenService.js';
import { USER_ROLES, DASHBOARD_ROUTES, MESSAGES } from '../config/constants.js';
import { AppError } from '../middleware/error.middleware.js';
import logger from '../config/logger.js';

/**
 * Helper function to get user roles
 */
const getUserRoles = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      include: [{
        model: Group,
        through: { attributes: [] },
        attributes: ['name'],
      }],
    });
    
    return user?.Groups?.map(g => g.name) || [];
  } catch (error) {
    logger.error('Error getting user roles:', error);
    return [];
  }
};

/**
 * Helper function to create auth response
 */
const createAuthResponse = async (user, roles) => {
  const accessToken = generateAccessToken(user, roles);
  const refreshToken = generateRefreshToken(user);
  
  // Determine dashboard route based on primary role
  const primaryRole = roles[0] || USER_ROLES.CLIENT;
  const dashboardRoute = DASHBOARD_ROUTES[primaryRole] || '/dashboard';

  // Update last login
  await user.update({ lastLogin: Math.floor(Date.now() / 1000) });

  return {
    user: user.toJSON(),
    accessToken,
    refreshToken,
    dashboardRoute,
    roles,
  };
};

/**
 * 1. Admin/Corporate Login
 * POST /api/auth/admin/login
 */
export const adminLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new AppError('Username and password are required', 400, 'VALIDATION_ERROR');
    }

    // Find user
    const user = await User.findOne({ where: { username } });
    
    if (!user) {
      throw new AppError(MESSAGES.ERROR.INVALID_CREDENTIALS, 401, 'INVALID_CREDENTIALS');
    }

    // Check if account is active
    if (!user.active) {
      throw new AppError(MESSAGES.ERROR.INACTIVE_ACCOUNT, 403, 'INACTIVE_ACCOUNT');
    }

    // Validate password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new AppError(MESSAGES.ERROR.INVALID_CREDENTIALS, 401, 'INVALID_CREDENTIALS');
    }

    // Get user roles
    const roles = await getUserRoles(user.id);
    
    // Check if user has admin or corporate role
    const hasAdminRole = roles.some(role => 
      [USER_ROLES.ADMIN, USER_ROLES.GROUPS, USER_ROLES.CORPORATE, 
       USER_ROLES.HEAD_OFFICE, USER_ROLES.REGIONAL, USER_ROLES.BRANCH].includes(role)
    );

    if (!hasAdminRole) {
      throw new AppError('Access denied. Admin or corporate role required.', 403, 'FORBIDDEN');
    }

    // Create auth response
    const authResponse = await createAuthResponse(user, roles);

    logger.info(`Admin login successful: ${username}`);

    res.status(200).json({
      success: true,
      message: MESSAGES.SUCCESS.LOGIN,
      data: authResponse,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 2. Group Admin Login
 * POST /api/auth/group-admin/login/:groupName
 */
export const groupAdminLogin = async (req, res, next) => {
  try {
    const { groupName } = req.params;
    const { username, password } = req.body;

    if (!username || !password) {
      throw new AppError('Username and password are required', 400, 'VALIDATION_ERROR');
    }

    // Find group
    const group = await GroupCreate.findOne({ where: { name: groupName } });
    if (!group) {
      throw new AppError('Group not found', 404, 'NOT_FOUND');
    }

    // Find user in this group
    const user = await User.findOne({ 
      where: { 
        username,
        groupId: group.id,
      } 
    });
    
    if (!user) {
      throw new AppError(MESSAGES.ERROR.INVALID_CREDENTIALS, 401, 'INVALID_CREDENTIALS');
    }

    if (!user.active) {
      throw new AppError(MESSAGES.ERROR.INACTIVE_ACCOUNT, 403, 'INACTIVE_ACCOUNT');
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new AppError(MESSAGES.ERROR.INVALID_CREDENTIALS, 401, 'INVALID_CREDENTIALS');
    }

    const roles = await getUserRoles(user.id);
    const authResponse = await createAuthResponse(user, roles);

    logger.info(`Group admin login successful: ${username} (Group: ${groupName})`);

    res.status(200).json({
      success: true,
      message: MESSAGES.SUCCESS.LOGIN,
      data: authResponse,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 3. Company Login
 * POST /api/auth/company/login/:companyName
 */
export const companyLogin = async (req, res, next) => {
  try {
    const { companyName } = req.params;
    const { username, password } = req.body;

    if (!username || !password) {
      throw new AppError('Username and password are required', 400, 'VALIDATION_ERROR');
    }

    const user = await User.findOne({
      where: {
        username,
        company: companyName,
      }
    });

    if (!user) {
      throw new AppError(MESSAGES.ERROR.INVALID_CREDENTIALS, 401, 'INVALID_CREDENTIALS');
    }

    if (!user.active) {
      throw new AppError(MESSAGES.ERROR.INACTIVE_ACCOUNT, 403, 'INACTIVE_ACCOUNT');
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new AppError(MESSAGES.ERROR.INVALID_CREDENTIALS, 401, 'INVALID_CREDENTIALS');
    }

    const roles = await getUserRoles(user.id);
    const authResponse = await createAuthResponse(user, roles);

    logger.info(`Company login successful: ${username} (Company: ${companyName})`);

    res.status(200).json({
      success: true,
      message: MESSAGES.SUCCESS.LOGIN,
      data: authResponse,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 4. Client Login
 * POST /api/auth/client/login/:groupName
 */
export const clientLogin = async (req, res, next) => {
  try {
    const { groupName } = req.params;
    const { username, password } = req.body;

    if (!username || !password) {
      throw new AppError('Username and password are required', 400, 'VALIDATION_ERROR');
    }

    const group = await GroupCreate.findOne({ where: { name: groupName } });
    if (!group) {
      throw new AppError('Group not found', 404, 'NOT_FOUND');
    }

    const user = await User.findOne({
      where: {
        username,
        groupId: group.id,
      }
    });

    if (!user) {
      throw new AppError(MESSAGES.ERROR.INVALID_CREDENTIALS, 401, 'INVALID_CREDENTIALS');
    }

    if (!user.active) {
      throw new AppError(MESSAGES.ERROR.INACTIVE_ACCOUNT, 403, 'INACTIVE_ACCOUNT');
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new AppError(MESSAGES.ERROR.INVALID_CREDENTIALS, 401, 'INVALID_CREDENTIALS');
    }

    const roles = await getUserRoles(user.id);

    const hasClientRole = roles.some(role =>
      [USER_ROLES.CLIENT, USER_ROLES.CLIENT_GOD].includes(role)
    );

    if (!hasClientRole) {
      throw new AppError('Access denied. Client role required.', 403, 'FORBIDDEN');
    }

    const authResponse = await createAuthResponse(user, roles);

    logger.info(`Client login successful: ${username} (Group: ${groupName})`);

    res.status(200).json({
      success: true,
      message: MESSAGES.SUCCESS.LOGIN,
      data: authResponse,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 5. God/Temple Login
 * POST /api/auth/god/login/:groupName/:subGroup
 */
export const godLogin = async (req, res, next) => {
  try {
    const { groupName, subGroup } = req.params;
    const { username, password } = req.body;

    if (!username || !password) {
      throw new AppError('Username and password are required', 400, 'VALIDATION_ERROR');
    }

    const group = await GroupCreate.findOne({ where: { name: groupName } });
    if (!group) {
      throw new AppError('Group not found', 404, 'NOT_FOUND');
    }

    const user = await User.findOne({
      where: {
        username,
        groupId: group.id,
      }
    });

    if (!user) {
      throw new AppError(MESSAGES.ERROR.INVALID_CREDENTIALS, 401, 'INVALID_CREDENTIALS');
    }

    if (!user.active) {
      throw new AppError(MESSAGES.ERROR.INACTIVE_ACCOUNT, 403, 'INACTIVE_ACCOUNT');
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new AppError(MESSAGES.ERROR.INVALID_CREDENTIALS, 401, 'INVALID_CREDENTIALS');
    }

    const roles = await getUserRoles(user.id);

    const hasGodRole = roles.includes(USER_ROLES.CLIENT_GOD);
    if (!hasGodRole) {
      throw new AppError('Access denied. God/Temple role required.', 403, 'FORBIDDEN');
    }

    const authResponse = await createAuthResponse(user, roles);

    logger.info(`God/Temple login successful: ${username} (Group: ${groupName}, SubGroup: ${subGroup})`);

    res.status(200).json({
      success: true,
      message: MESSAGES.SUCCESS.LOGIN,
      data: authResponse,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 6. Partner Login
 * POST /api/auth/partner/login
 */
export const partnerLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new AppError('Username and password are required', 400, 'VALIDATION_ERROR');
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new AppError(MESSAGES.ERROR.INVALID_CREDENTIALS, 401, 'INVALID_CREDENTIALS');
    }

    if (!user.active) {
      throw new AppError(MESSAGES.ERROR.INACTIVE_ACCOUNT, 403, 'INACTIVE_ACCOUNT');
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new AppError(MESSAGES.ERROR.INVALID_CREDENTIALS, 401, 'INVALID_CREDENTIALS');
    }

    const roles = await getUserRoles(user.id);

    const hasPartnerRole = roles.includes(USER_ROLES.PARTNER);
    if (!hasPartnerRole) {
      throw new AppError('Access denied. Partner role required.', 403, 'FORBIDDEN');
    }

    const authResponse = await createAuthResponse(user, roles);

    logger.info(`Partner login successful: ${username}`);

    res.status(200).json({
      success: true,
      message: MESSAGES.SUCCESS.LOGIN,
      data: authResponse,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 7. Reporter Login
 * POST /api/auth/reporter/login
 */
export const reporterLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new AppError('Username and password are required', 400, 'VALIDATION_ERROR');
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new AppError(MESSAGES.ERROR.INVALID_CREDENTIALS, 401, 'INVALID_CREDENTIALS');
    }

    if (!user.active) {
      throw new AppError(MESSAGES.ERROR.INACTIVE_ACCOUNT, 403, 'INACTIVE_ACCOUNT');
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new AppError(MESSAGES.ERROR.INVALID_CREDENTIALS, 401, 'INVALID_CREDENTIALS');
    }

    const roles = await getUserRoles(user.id);

    const hasReporterRole = roles.includes(USER_ROLES.REPORTER);
    if (!hasReporterRole) {
      throw new AppError('Access denied. Reporter role required.', 403, 'FORBIDDEN');
    }

    const authResponse = await createAuthResponse(user, roles);

    logger.info(`Reporter login successful: ${username}`);

    res.status(200).json({
      success: true,
      message: MESSAGES.SUCCESS.LOGIN,
      data: authResponse,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 8. Register
 * POST /api/auth/register
 */
export const register = async (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName, phone, role = USER_ROLES.CLIENT } = req.body;

    if (!username || !email || !password) {
      throw new AppError('Username, email, and password are required', 400, 'VALIDATION_ERROR');
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      phone,
      displayName: `${firstName} ${lastName}`.trim(),
      active: 1,
    });

    // Assign role
    const roleRecord = await Group.findOne({ where: { name: role } });
    if (roleRecord) {
      await user.addGroup(roleRecord);
    }

    const roles = await getUserRoles(user.id);
    const authResponse = await createAuthResponse(user, roles);

    logger.info(`New user registered: ${username}`);

    res.status(201).json({
      success: true,
      message: MESSAGES.SUCCESS.REGISTER,
      data: authResponse,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 9. Refresh Token
 * POST /api/auth/refresh
 */
export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      throw new AppError('Refresh token is required', 400, 'VALIDATION_ERROR');
    }

    const decoded = verifyToken(token);

    if (decoded.type !== 'refresh') {
      throw new AppError('Invalid token type', 400, 'INVALID_TOKEN');
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new AppError('User not found', 404, 'NOT_FOUND');
    }

    if (!user.active) {
      throw new AppError(MESSAGES.ERROR.INACTIVE_ACCOUNT, 403, 'INACTIVE_ACCOUNT');
    }

    const roles = await getUserRoles(user.id);
    const accessToken = generateAccessToken(user, roles);

    res.status(200).json({
      success: true,
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 10. Logout
 * POST /api/auth/logout
 */
export const logout = async (req, res, next) => {
  try {
    // In a stateless JWT system, logout is handled client-side
    // Here we can log the event or invalidate tokens if using a blacklist

    logger.info(`User logged out: ${req.user?.username}`);

    res.status(200).json({
      success: true,
      message: MESSAGES.SUCCESS.LOGOUT,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  adminLogin,
  groupAdminLogin,
  companyLogin,
  clientLogin,
  godLogin,
  partnerLogin,
  reporterLogin,
  register,
  refreshToken,
  logout,
};
