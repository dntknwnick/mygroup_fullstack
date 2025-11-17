# My Group Platform - API Documentation & UI Design Guide

## Table of Contents
1. [Overview](#overview)
2. [Authentication Endpoints](#authentication-endpoints)
3. [User Management Endpoints](#user-management-endpoints)
4. [Application Endpoints](#application-endpoints)
5. [Dashboard Endpoints](#dashboard-endpoints)
6. [UI Components Mapping](#ui-components-mapping)
7. [Error Handling](#error-handling)
8. [Request/Response Examples](#request-response-examples)

---

## Overview

**Base URL:** `https://api.mygroup.com/v1`

**Authentication:** All authenticated endpoints require a Bearer token in the Authorization header.

```
Authorization: Bearer {access_token}
```

**Content-Type:** `application/json`

---

## Authentication Endpoints

### 1. Admin Login
**Endpoint:** `POST /auth/admin/login`

**UI Page:** `/pages/auth/AdminLogin.tsx`

**Request Body:**
```json
{
  "email": "admin@mygroup.com",
  "password": "securepassword123",
  "rememberMe": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "dGhpcyBpcyBhIHJlZnJl...",
    "user": {
      "id": "user_123",
      "email": "admin@mygroup.com",
      "role": "admin",
      "name": "Admin User",
      "avatar": null
    },
    "expiresIn": 3600
  }
}
```

---

### 2. Group Admin Login
**Endpoint:** `POST /auth/group/:groupName/login`

**UI Page:** `/pages/auth/GroupAdminLogin.tsx`

**Path Parameters:**
- `groupName`: corporate | franchise | services | labor | education

**Request Body:**
```json
{
  "email": "user@corporate.com",
  "password": "password123",
  "rememberMe": false
}
```

**Response:** Same as Admin Login

---

### 3. God Mode Login
**Endpoint:** `POST /auth/god/:groupName/:subGroup/login`

**UI Page:** `/pages/auth/GodLogin.tsx`

**Path Parameters:**
- `groupName`: string
- `subGroup`: string

**Request Body:**
```json
{
  "email": "god@universe.com",
  "password": "masterpassword"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "dGhpcyBpcyBhIHJlZnJl...",
    "user": {
      "id": "god_001",
      "email": "god@universe.com",
      "role": "god",
      "name": "God User",
      "permissions": ["*"]
    },
    "expiresIn": 7200
  }
}
```

---

### 4. Partner Login
**Endpoint:** `POST /auth/partner/login`

**UI Page:** `/pages/auth/PartnerLogin.tsx`

**Request Body:**
```json
{
  "email": "partner@company.com",
  "password": "partnerpass",
  "partnerId": "partner_456"
}
```

**Response:** Similar to Admin Login with role: "partner"

---

### 5. Reporter Login
**Endpoint:** `POST /auth/reporter/login`

**UI Page:** `/pages/auth/ReporterLogin.tsx`

**Request Body:**
```json
{
  "email": "reporter@news.com",
  "password": "reporterpass",
  "mediaOutlet": "News Portal"
}
```

**Response:** Similar to Admin Login with role: "reporter"

---

### 6. Client Login
**Endpoint:** `POST /auth/client/:groupName/login`

**UI Page:** `/pages/auth/ClientLogin.tsx`

**Path Parameters:**
- `groupName`: string (group identifier)

**Request Body:**
```json
{
  "email": "client@example.com",
  "password": "clientpass"
}
```

**Response:** Similar to Admin Login with role: "client"

---

### 7. User Registration
**Endpoint:** `POST /auth/register/:groupName`

**UI Page:** `/pages/auth/RegistrationForm.tsx`

**Path Parameters:**
- `groupName`: string

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepass123",
  "confirmPassword": "securepass123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1 (555) 123-4567",
  "displayName": "Johnny",
  "gender": "Male",
  "dob": "1990-01-15",
  "country": "United States",
  "state": "California",
  "district": "Los Angeles",
  "education": "Bachelor's Degree",
  "profession": "Software Engineer"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "user_789",
    "email": "john@example.com",
    "message": "Registration successful. Please verify your email."
  }
}
```

---

### 8. Logout
**Endpoint:** `POST /auth/logout`

**Headers:** Authorization: Bearer {token}

**Request Body:**
```json
{
  "refreshToken": "dGhpcyBpcyBhIHJlZnJl..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 9. Refresh Token
**Endpoint:** `POST /auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "dGhpcyBpcyBhIHJlZnJl..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 3600
  }
}
```

---

### 10. Forgot Password
**Endpoint:** `POST /auth/forgot-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

---

### 11. Reset Password
**Endpoint:** `POST /auth/reset-password`

**Request Body:**
```json
{
  "token": "reset_token_from_email",
  "newPassword": "newSecurePass123",
  "confirmPassword": "newSecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

---

## User Management Endpoints

### 12. Get Current User Profile
**Endpoint:** `GET /users/me`

**UI Component:** Dashboard Header, Profile Section

**Headers:** Authorization: Bearer {token}

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "displayName": "Johnny",
    "phone": "+1 (555) 123-4567",
    "gender": "Male",
    "dob": "1990-01-15",
    "avatar": "https://cdn.mygroup.com/avatars/user_123.jpg",
    "role": "client",
    "country": "United States",
    "state": "California",
    "district": "Los Angeles",
    "education": "Bachelor's Degree",
    "profession": "Software Engineer",
    "createdAt": "2024-01-15T10:30:00Z",
    "lastLogin": "2025-11-17T08:45:00Z"
  }
}
```

---

### 13. Update User Profile
**Endpoint:** `PATCH /users/me`

**Headers:** Authorization: Bearer {token}

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "+1 (555) 999-8888",
  "displayName": "JS"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "firstName": "John",
    "lastName": "Smith",
    "phone": "+1 (555) 999-8888",
    "displayName": "JS",
    "updatedAt": "2025-11-17T09:00:00Z"
  }
}
```

---

### 14. Upload Avatar
**Endpoint:** `POST /users/me/avatar`

**Headers:** 
- Authorization: Bearer {token}
- Content-Type: multipart/form-data

**Request Body:** FormData with 'avatar' file field

**Response:**
```json
{
  "success": true,
  "data": {
    "avatarUrl": "https://cdn.mygroup.com/avatars/user_123.jpg"
  }
}
```

---

### 15. Get All Users (Admin Only)
**Endpoint:** `GET /users`

**UI Page:** `/pages/dashboard/AdminDashboard.tsx` (User Management Section)

**Headers:** Authorization: Bearer {token}

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 20)
- `role`: admin | client | corporate | franchise | labor | partner | reporter
- `search`: string
- `sortBy`: createdAt | lastLogin | name
- `order`: asc | desc

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_123",
        "username": "johndoe",
        "email": "john@example.com",
        "name": "John Doe",
        "role": "client",
        "avatar": "https://cdn.mygroup.com/avatars/user_123.jpg",
        "createdAt": "2024-01-15T10:30:00Z",
        "lastLogin": "2025-11-17T08:45:00Z",
        "status": "active"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 50,
      "totalUsers": 1000,
      "limit": 20
    }
  }
}
```

---

### 16. Delete User (Admin Only)
**Endpoint:** `DELETE /users/:userId`

**Headers:** Authorization: Bearer {token}

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Application Endpoints

### 17. Get All Applications
**Endpoint:** `GET /applications`

**UI Page:** `/pages/HomePage.tsx`

**Query Parameters:**
- `category`: all | admin | company | media

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "app_001",
      "name": "Corporate Hub",
      "tagline": "Enterprise Management Platform",
      "category": "company",
      "loginPath": "/client-login/corporate",
      "icon": "Building2",
      "color": "from-blue-500 to-blue-600",
      "description": "Comprehensive corporate management solution",
      "isActive": true
    }
  ]
}
```

---

### 18. Get Application Details
**Endpoint:** `GET /applications/:appId`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "app_001",
    "name": "Corporate Hub",
    "tagline": "Enterprise Management Platform",
    "category": "company",
    "loginPath": "/client-login/corporate",
    "icon": "Building2",
    "color": "from-blue-500 to-blue-600",
    "description": "Comprehensive corporate management solution with advanced features",
    "features": [
      "Employee Management",
      "Project Tracking",
      "Financial Reporting",
      "Analytics Dashboard"
    ],
    "pricing": {
      "free": false,
      "plans": ["starter", "professional", "enterprise"]
    },
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

---

## Dashboard Endpoints

### 19. Get Dashboard Statistics
**Endpoint:** `GET /dashboard/stats`

**UI Page:** `/pages/dashboard/AdminDashboard.tsx`

**Headers:** Authorization: Bearer {token}

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 12483,
    "activeGroups": 23,
    "revenue": 48652,
    "newRegistrations": 342,
    "changes": {
      "users": 12.5,
      "groups": 0,
      "revenue": 23.8,
      "registrations": -5.2
    }
  }
}
```

---

### 20. Get User Growth Data
**Endpoint:** `GET /dashboard/user-growth`

**UI Component:** User Growth Chart

**Headers:** Authorization: Bearer {token}

**Query Parameters:**
- `period`: week | month | year
- `startDate`: ISO date
- `endDate`: ISO date

**Response:**
```json
{
  "success": true,
  "data": [
    { "month": "Jan", "users": 4000 },
    { "month": "Feb", "users": 5200 },
    { "month": "Mar", "users": 6100 },
    { "month": "Apr", "users": 7500 },
    { "month": "May", "users": 9200 },
    { "month": "Jun", "users": 12483 }
  ]
}
```

---

### 21. Get Group Activity Data
**Endpoint:** `GET /dashboard/group-activity`

**UI Component:** Group Activity Chart

**Headers:** Authorization: Bearer {token}

**Response:**
```json
{
  "success": true,
  "data": [
    { "name": "Corporate", "value": 3200 },
    { "name": "Franchise", "value": 2800 },
    { "name": "Services", "value": 2400 },
    { "name": "Media", "value": 1900 },
    { "name": "Education", "value": 1200 },
    { "name": "Others", "value": 983 }
  ]
}
```

---

### 22. Get User Distribution
**Endpoint:** `GET /dashboard/user-distribution`

**UI Component:** User Distribution Pie Chart

**Headers:** Authorization: Bearer {token}

**Response:**
```json
{
  "success": true,
  "data": [
    { "name": "Admin", "value": 45, "color": "#3b82f6" },
    { "name": "Client", "value": 6200, "color": "#8b5cf6" },
    { "name": "Corporate", "value": 1800, "color": "#10b981" },
    { "name": "Labor", "value": 3200, "color": "#f59e0b" },
    { "name": "Partner", "value": 800, "color": "#ef4444" },
    { "name": "Reporter", "value": 438, "color": "#06b6d4" }
  ]
}
```

---

### 23. Get Recent Activities
**Endpoint:** `GET /dashboard/recent-activities`

**UI Component:** Recent Activity List

**Headers:** Authorization: Bearer {token}

**Query Parameters:**
- `limit`: number (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "activity_001",
      "user": "John Doe",
      "userId": "user_123",
      "action": "Registered",
      "group": "Corporate Hub",
      "time": "5 min ago",
      "timestamp": "2025-11-17T09:55:00Z",
      "avatar": "JD"
    },
    {
      "id": "activity_002",
      "user": "Jane Smith",
      "userId": "user_124",
      "action": "Updated Profile",
      "group": "Franchise Manager",
      "time": "12 min ago",
      "timestamp": "2025-11-17T09:48:00Z",
      "avatar": "JS"
    }
  ]
}
```

---

## UI Components Mapping

### Authentication Pages

| UI Component | Endpoint | HTTP Method | Purpose |
|-------------|----------|-------------|---------|
| `/pages/HomePage.tsx` | `/applications` | GET | Display all applications |
| `/pages/auth/AdminLogin.tsx` | `/auth/admin/login` | POST | Admin authentication |
| `/pages/auth/GroupAdminLogin.tsx` | `/auth/group/:groupName/login` | POST | Group admin authentication |
| `/pages/auth/GodLogin.tsx` | `/auth/god/:groupName/:subGroup/login` | POST | God mode authentication |
| `/pages/auth/PartnerLogin.tsx` | `/auth/partner/login` | POST | Partner authentication |
| `/pages/auth/ReporterLogin.tsx` | `/auth/reporter/login` | POST | Reporter authentication |
| `/pages/auth/ClientLogin.tsx` | `/auth/client/:groupName/login` | POST | Client authentication |
| `/pages/auth/RegistrationForm.tsx` | `/auth/register/:groupName` | POST | User registration |

### Dashboard Components

| UI Component | Endpoint | HTTP Method | Purpose |
|-------------|----------|-------------|---------|
| StatsCard | `/dashboard/stats` | GET | Display statistics |
| User Growth Chart | `/dashboard/user-growth` | GET | Show user growth trends |
| Group Activity Chart | `/dashboard/group-activity` | GET | Display group activities |
| User Distribution Chart | `/dashboard/user-distribution` | GET | Show user role distribution |
| Recent Activity List | `/dashboard/recent-activities` | GET | List recent user actions |

### Reusable Components

| Component Path | Data Source | Props |
|---------------|-------------|-------|
| `/components/ApplicationCard.tsx` | Application object | `{ application, onClick }` |
| `/components/StatsCard.tsx` | Stats API | `{ title, value, icon, change, color }` |
| `/components/Sidebar.tsx` | Static/Session | `{ collapsed, onToggle }` |
| `/components/Input.tsx` | Form controlled | `{ label, type, placeholder, leftIcon, value, onChange }` |
| `/components/Button.tsx` | Props | `{ variant, size, loading, leftIcon, rightIcon }` |
| `/components/Card.tsx` | Props | `{ variant, padding, children }` |
| `/components/ProgressBar.tsx` | Props | `{ steps, currentStep }` |

---

## Error Handling

### Standard Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email or password",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    }
  }
}
```

### HTTP Status Codes

| Status Code | Meaning | Usage |
|------------|---------|-------|
| 200 | OK | Successful request |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 422 | Unprocessable Entity | Validation error |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

### Common Error Codes

| Error Code | Description | HTTP Status |
|-----------|-------------|-------------|
| `INVALID_CREDENTIALS` | Wrong email/password | 401 |
| `VALIDATION_ERROR` | Input validation failed | 422 |
| `USER_NOT_FOUND` | User doesn't exist | 404 |
| `EMAIL_ALREADY_EXISTS` | Email already registered | 409 |
| `TOKEN_EXPIRED` | Access token expired | 401 |
| `INSUFFICIENT_PERMISSIONS` | User lacks permissions | 403 |
| `RATE_LIMIT_EXCEEDED` | Too many requests | 429 |
| `SERVER_ERROR` | Internal server error | 500 |

---

## Request/Response Examples

### Example 1: Complete Login Flow

**Step 1: Login Request**
```bash
curl -X POST https://api.mygroup.com/v1/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mygroup.com",
    "password": "securepass123",
    "rememberMe": true
  }'
```

**Step 2: Use Access Token**
```bash
curl -X GET https://api.mygroup.com/v1/users/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

---

### Example 2: User Registration Flow

**Step 1: Register**
```bash
curl -X POST https://api.mygroup.com/v1/auth/register/corporate \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepass123",
    "confirmPassword": "securepass123",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1 (555) 123-4567",
    "displayName": "Johnny",
    "gender": "Male",
    "dob": "1990-01-15",
    "country": "United States",
    "state": "California",
    "district": "Los Angeles",
    "education": "Bachelor'\''s Degree",
    "profession": "Software Engineer"
  }'
```

**Step 2: Verify Email** (User clicks link in email)

**Step 3: Login**
```bash
curl -X POST https://api.mygroup.com/v1/auth/client/corporate/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepass123"
  }'
```

---

### Example 3: Dashboard Data Loading

**Fetch All Dashboard Data**
```javascript
// In React component
const loadDashboardData = async () => {
  const token = localStorage.getItem('accessToken');
  
  const [stats, userGrowth, groupActivity, distribution, activities] = await Promise.all([
    fetch('https://api.mygroup.com/v1/dashboard/stats', {
      headers: { 'Authorization': `Bearer ${token}` }
    }),
    fetch('https://api.mygroup.com/v1/dashboard/user-growth?period=month', {
      headers: { 'Authorization': `Bearer ${token}` }
    }),
    fetch('https://api.mygroup.com/v1/dashboard/group-activity', {
      headers: { 'Authorization': `Bearer ${token}` }
    }),
    fetch('https://api.mygroup.com/v1/dashboard/user-distribution', {
      headers: { 'Authorization': `Bearer ${token}` }
    }),
    fetch('https://api.mygroup.com/v1/dashboard/recent-activities?limit=5', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
  ]);

  return {
    stats: await stats.json(),
    userGrowth: await userGrowth.json(),
    groupActivity: await groupActivity.json(),
    distribution: await distribution.json(),
    activities: await activities.json()
  };
};
```

---

## WebSocket Endpoints (Real-time Updates)

### 24. Connect to Real-time Updates
**WebSocket URL:** `wss://api.mygroup.com/v1/ws`

**Connection:**
```javascript
const ws = new WebSocket('wss://api.mygroup.com/v1/ws');

// Authenticate
ws.send(JSON.stringify({
  type: 'auth',
  token: 'your_access_token'
}));

// Subscribe to events
ws.send(JSON.stringify({
  type: 'subscribe',
  channels: ['user-activities', 'stats-updates']
}));

// Receive updates
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Real-time update:', data);
};
```

**Event Types:**
- `user-activity`: New user activities
- `stats-update`: Dashboard statistics changed
- `new-registration`: New user registered
- `user-login`: User logged in
- `user-logout`: User logged out

---

## Rate Limiting

All endpoints are rate-limited based on the user's role:

| Role | Requests per minute | Burst limit |
|------|-------------------|-------------|
| God | Unlimited | Unlimited |
| Admin | 1000 | 1500 |
| Partner | 500 | 750 |
| Client | 100 | 150 |
| Unauthenticated | 20 | 30 |

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1700225400
```

---

## Pagination

For endpoints that return lists, use these query parameters:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)
- `sortBy`: Field to sort by
- `order`: asc | desc

**Response includes pagination metadata:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 50,
    "totalItems": 1000,
    "limit": 20,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## API Versioning

The API uses URL versioning. Current version: `v1`

Future versions will be accessible at `/v2`, `/v3`, etc.

---

## Security Best Practices

1. **Always use HTTPS** in production
2. **Store tokens securely** (httpOnly cookies or secure storage)
3. **Implement CSRF protection** for state-changing operations
4. **Validate all inputs** on both client and server
5. **Use refresh tokens** for long-lived sessions
6. **Implement logout** to invalidate tokens
7. **Monitor for suspicious activity** and implement rate limiting

---

## Contact & Support

- **API Documentation:** https://docs.mygroup.com
- **Support Email:** support@mygroup.com
- **Developer Portal:** https://developers.mygroup.com
- **Status Page:** https://status.mygroup.com

---

**Last Updated:** November 17, 2025  
**API Version:** 1.0.0
