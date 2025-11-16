// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  GROUPS: 'groups',
  LABOR: 'labor',
  CLIENT: 'client',
  CORPORATE: 'corporate',
  HEAD_OFFICE: 'head_office',
  REGIONAL: 'regional',
  BRANCH: 'branch',
  CLIENT_GOD: 'client_god',
  PARTNER: 'partner',
  REPORTER: 'reporter',
};

// Dashboard Routes by Role
export const DASHBOARD_ROUTES = {
  [USER_ROLES.ADMIN]: '/dashboard/admin',
  [USER_ROLES.GROUPS]: '/dashboard/admin',
  [USER_ROLES.CLIENT]: '/dashboard/client',
  [USER_ROLES.CLIENT_GOD]: '/dashboard/client',
  [USER_ROLES.CORPORATE]: '/dashboard/corporate',
  [USER_ROLES.HEAD_OFFICE]: '/dashboard/franchise',
  [USER_ROLES.REGIONAL]: '/dashboard/franchise',
  [USER_ROLES.BRANCH]: '/dashboard/franchise',
  [USER_ROLES.LABOR]: '/dashboard/labor',
  [USER_ROLES.PARTNER]: '/dashboard/partner',
  [USER_ROLES.REPORTER]: '/dashboard/reporter',
};

// Service Types
export const SERVICE_TYPES = {
  DOORSTEP: 'doorstep',
  CENTER: 'center',
  MANPOWER: 'manpower',
  ONLINE: 'online',
  HELP: 'help',
};

// Shop Types
export const SHOP_TYPES = {
  SHOP: 'shop',
  LOCAL: 'local',
  RESALE: 'resale',
  BRAND: 'brand',
  WHOLESALE: 'wholesale',
  ECOSHOP: 'ecoshop',
};

// Media Types
export const MEDIA_TYPES = {
  TV: 'tv',
  RADIO: 'radio',
  EPAPER: 'epaper',
  MAGAZINE: 'magazine',
  WEB: 'web',
  YOUTUBE: 'youtube',
};

// Content Types
export const CONTENT_TYPES = {
  VIDEO: 'video',
  AUDIO: 'audio',
  ARTICLE: 'article',
  IMAGE: 'image',
  LIVE: 'live',
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

// Application Status
export const APPLICATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: parseInt(process.env.MAX_FILE_SIZE) || 10485760, // 10MB
  ALLOWED_TYPES: {
    IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    DOCUMENT: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    VIDEO: ['video/mp4', 'video/mpeg', 'video/quicktime'],
    AUDIO: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  },
};

// Response Messages
export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Login successful',
    LOGOUT: 'Logout successful',
    REGISTER: 'Registration successful',
    UPDATE: 'Updated successfully',
    DELETE: 'Deleted successfully',
    CREATE: 'Created successfully',
    UPLOAD: 'File uploaded successfully',
  },
  ERROR: {
    INVALID_CREDENTIALS: 'Invalid credentials',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access forbidden',
    NOT_FOUND: 'Resource not found',
    VALIDATION_ERROR: 'Validation error',
    SERVER_ERROR: 'Internal server error',
    DUPLICATE_ENTRY: 'Duplicate entry',
    INACTIVE_ACCOUNT: 'Account is inactive',
  },
};

export default {
  USER_ROLES,
  DASHBOARD_ROUTES,
  SERVICE_TYPES,
  SHOP_TYPES,
  MEDIA_TYPES,
  CONTENT_TYPES,
  ORDER_STATUS,
  PAYMENT_STATUS,
  APPLICATION_STATUS,
  PAGINATION,
  FILE_UPLOAD,
  MESSAGES,
};

