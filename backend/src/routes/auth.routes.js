import express from 'express';
import {
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
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/auth/admin/login
 * @desc    Admin/Corporate login
 * @access  Public
 */
router.post('/admin/login', adminLogin);

/**
 * @route   POST /api/auth/group-admin/login/:groupName
 * @desc    Group admin login
 * @access  Public
 */
router.post('/group-admin/login/:groupName', groupAdminLogin);

/**
 * @route   POST /api/auth/company/login/:companyName
 * @desc    Company login
 * @access  Public
 */
router.post('/company/login/:companyName', companyLogin);

/**
 * @route   POST /api/auth/client/login/:groupName
 * @desc    Client login
 * @access  Public
 */
router.post('/client/login/:groupName', clientLogin);

/**
 * @route   POST /api/auth/god/login/:groupName/:subGroup
 * @desc    God/Temple login
 * @access  Public
 */
router.post('/god/login/:groupName/:subGroup', godLogin);

/**
 * @route   POST /api/auth/partner/login
 * @desc    Partner login
 * @access  Public
 */
router.post('/partner/login', partnerLogin);

/**
 * @route   POST /api/auth/reporter/login
 * @desc    Reporter login
 * @access  Public
 */
router.post('/reporter/login', reporterLogin);

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post('/register', register);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post('/refresh', refreshToken);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post('/logout', authenticate, logout);

export default router;

