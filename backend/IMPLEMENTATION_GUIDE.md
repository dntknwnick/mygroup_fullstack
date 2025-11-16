# My Group Backend - Complete Implementation Guide

## Overview
This document provides a complete guide for implementing the Node.js backend for the My Group multi-tenant CRM platform.

## Database Schema
✅ **COMPLETED**: Full database schema created in `database/schema.sql`
- 50+ tables with proper relationships
- Foreign key constraints
- Indexes for performance
- CRM-style views for reporting
- Supports all 23+ group applications
- Multi-tenant architecture

## Project Structure

```
backend/
├── database/
│   └── schema.sql                    # ✅ Complete MySQL schema
├── src/
│   ├── config/
│   │   ├── database.js               # ✅ Sequelize configuration
│   │   ├── jwt.js                    # ✅ JWT settings
│   │   ├── logger.js                 # ✅ Winston logger
│   │   └── constants.js              # ✅ Application constants
│   ├── models/
│   │   ├── User.js                   # ✅ User model with bcrypt
│   │   ├── Group.js                  # ✅ Role model
│   │   ├── GroupCreate.js            # ✅ Applications model
│   │   ├── UserGroup.js              # Junction table
│   │   ├── UserRegistration.js       # Extended profile
│   │   ├── CreateDetails.js          # Group branding
│   │   ├── Country.js                # Geographic data
│   │   ├── State.js
│   │   ├── District.js
│   │   ├── Education.js
│   │   ├── Profession.js
│   │   ├── NeedyService.js           # Needy module
│   │   ├── NeedyCategory.js
│   │   ├── NeedyReview.js
│   │   ├── LaborProfile.js           # Labor module
│   │   ├── LaborCategory.js
│   │   ├── LaborDocument.js
│   │   ├── UnionOrganization.js      # Unions module
│   │   ├── UnionMember.js
│   │   ├── UnionNews.js
│   │   ├── ShopProduct.js            # Shop module
│   │   ├── ShopCategory.js
│   │   ├── ShopOrder.js
│   │   ├── ShopOrderItem.js
│   │   ├── MediaContent.js           # Media module
│   │   ├── MediaCategory.js
│   │   ├── Gallery.js                # Gallery system
│   │   ├── GalleryImage.js
│   │   ├── FranchiseHolder.js        # Franchise management
│   │   ├── FranchiseStaff.js
│   │   ├── About.js                  # CMS tables
│   │   ├── Newsroom.js
│   │   ├── Events.js
│   │   ├── Careers.js
│   │   ├── Testimonials.js
│   │   ├── Contact.js
│   │   ├── FeedbackSuggestion.js     # Chat/Feedback
│   │   ├── GodDescription.js         # God/Temple module
│   │   ├── GodPhoto.js
│   │   ├── GodTimings.js
│   │   ├── GodFestival.js
│   │   ├── MyadsProduct.js           # Myads module
│   │   ├── MyadsCategory.js
│   │   ├── ActivityLog.js            # System tables
│   │   ├── Notification.js
│   │   ├── SystemSetting.js
│   │   └── index.js                  # Model associations
│   ├── controllers/
│   │   ├── authController.js         # All authentication (6 login types)
│   │   ├── userController.js         # User management
│   │   ├── adminController.js        # Admin operations
│   │   ├── groupController.js        # Group management
│   │   ├── geoController.js          # Geographic data
│   │   ├── needyController.js        # Needy services CRUD
│   │   ├── laborController.js        # Labor management
│   │   ├── unionController.js        # Unions CRUD
│   │   ├── shopController.js         # E-commerce
│   │   ├── mediaController.js        # Media content
│   │   ├── galleryController.js      # Gallery management
│   │   ├── franchiseController.js    # Franchise operations
│   │   ├── cmsController.js          # Content management
│   │   ├── chatController.js         # Chat/Feedback
│   │   ├── godController.js          # God/Temple module
│   │   └── myadsController.js        # Myads module
│   ├── routes/
│   │   ├── auth.routes.js            # Authentication routes
│   │   ├── user.routes.js            # User routes
│   │   ├── admin.routes.js           # Admin routes
│   │   ├── group.routes.js           # Group routes
│   │   ├── geo.routes.js             # Geographic routes
│   │   ├── needy.routes.js           # Needy routes
│   │   ├── labor.routes.js           # Labor routes
│   │   ├── union.routes.js           # Union routes
│   │   ├── shop.routes.js            # Shop routes
│   │   ├── media.routes.js           # Media routes
│   │   ├── gallery.routes.js         # Gallery routes
│   │   ├── franchise.routes.js       # Franchise routes
│   │   ├── cms.routes.js             # CMS routes
│   │   ├── chat.routes.js            # Chat routes
│   │   ├── god.routes.js             # God/Temple routes
│   │   ├── myads.routes.js           # Myads routes
│   │   └── index.js                  # Route aggregator
│   ├── middleware/
│   │   ├── auth.middleware.js        # JWT verification
│   │   ├── role.middleware.js        # Role-based access control
│   │   ├── validate.middleware.js    # Request validation
│   │   ├── upload.middleware.js      # File upload (Multer)
│   │   ├── error.middleware.js       # Error handling
│   │   ├── logger.middleware.js      # Request logging
│   │   └── rateLimit.middleware.js   # Rate limiting
│   ├── services/
│   │   ├── authService.js            # Auth business logic
│   │   ├── emailService.js           # Email sending (Nodemailer)
│   │   ├── smsService.js             # SMS/OTP
│   │   ├── s3Service.js              # AWS S3/Wasabi operations
│   │   └── tokenService.js           # JWT management
│   ├── utils/
│   │   ├── validators.js             # Custom validators (Joi/Zod)
│   │   ├── helpers.js                # Helper functions
│   │   └── errorHandler.js           # Error utilities
│   ├── app.js                        # Express app setup
│   └── server.js                     # Server entry point
├── tests/
│   ├── unit/
│   └── integration/
├── logs/
├── .env.example                      # ✅ Environment variables template
├── .gitignore
├── package.json                      # ✅ Dependencies
└── README.md
```

## Installation & Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Create Database
```bash
mysql -u root -p < database/schema.sql
```

### 4. Run Development Server
```bash
npm run dev
```

## API Endpoints Summary

### Authentication Endpoints (authController.js)

#### 1. Admin/Corporate Login
```
POST /api/auth/admin/login
Body: { username, password }
Response: { user, accessToken, refreshToken, dashboardRoute }
```

#### 2. Group Admin Login
```
POST /api/auth/group-admin/login/:groupName
Body: { username, password }
Response: { user, accessToken, refreshToken, dashboardRoute }
```

#### 3. Company Login
```
POST /api/auth/company/login/:companyName
Body: { username, password }
Response: { user, accessToken, refreshToken, dashboardRoute }
```

#### 4. Client Login
```
POST /api/auth/client/login/:groupName
Body: { username, password }
Response: { user, accessToken, refreshToken, dashboardRoute }
```

#### 5. God/Temple Login
```
POST /api/auth/god/login/:groupName/:subGroup
Body: { username, password }
Response: { user, accessToken, refreshToken, dashboardRoute }
```

#### 6. Partner Login
```
POST /api/auth/partner/login
Body: { username, password }
Response: { user, accessToken, refreshToken, dashboardRoute }
```

#### 7. Reporter Login
```
POST /api/auth/reporter/login
Body: { username, password }
Response: { user, accessToken, refreshToken, dashboardRoute }
```

#### 8. Registration
```
POST /api/auth/register
Body: { username, email, password, firstName, lastName, phone, role }
Response: { user, accessToken, refreshToken }
```

#### 9. Token Refresh
```
POST /api/auth/refresh
Body: { refreshToken }
Response: { accessToken }
```

#### 10. Logout
```
POST /api/auth/logout
Headers: { Authorization: Bearer <token> }
Response: { message }
```

#### 11. Password Reset Request
```
POST /api/auth/forgot-password
Body: { email }
Response: { message }
```

#### 12. Password Reset
```
POST /api/auth/reset-password
Body: { token, newPassword }
Response: { message }
```

### Geographic Data Endpoints (geoController.js)

```
GET /api/geo/countries
GET /api/geo/states/:countryId
GET /api/geo/districts/:stateId
GET /api/geo/education
GET /api/geo/professions
```

### User Management Endpoints (userController.js)

```
GET /api/users                        # List users (admin only)
GET /api/users/:id                    # Get user by ID
PUT /api/users/:id                    # Update user
DELETE /api/users/:id                 # Delete user (admin only)
GET /api/users/profile                # Get current user profile
PUT /api/users/profile                # Update current user profile
POST /api/users/upload-avatar         # Upload profile image
```

### Group Management Endpoints (groupController.js)

```
GET /api/groups                       # List all groups
GET /api/groups/:id                   # Get group details
POST /api/groups                      # Create group (admin only)
PUT /api/groups/:id                   # Update group (admin only)
DELETE /api/groups/:id                # Delete group (admin only)
GET /api/groups/:id/applications      # Get group applications
```

### Needy Services Endpoints (needyController.js)

```
GET /api/needy/categories             # List categories
GET /api/needy/services               # List services (with filters)
GET /api/needy/services/:id           # Get service details
POST /api/needy/services              # Create service
PUT /api/needy/services/:id           # Update service
DELETE /api/needy/services/:id        # Delete service
POST /api/needy/services/:id/review   # Add review
GET /api/needy/services/:id/reviews   # Get reviews
```

### Labor Management Endpoints (laborController.js)

```
GET /api/labor/categories             # List labor categories
GET /api/labor/profiles               # List labor profiles
GET /api/labor/profiles/:id           # Get labor profile
POST /api/labor/profiles              # Create labor profile
PUT /api/labor/profiles/:id           # Update labor profile
DELETE /api/labor/profiles/:id        # Delete labor profile
POST /api/labor/profiles/:id/documents # Upload documents
```

### Union Endpoints (unionController.js)

```
GET /api/unions                       # List unions
GET /api/unions/:id                   # Get union details
POST /api/unions                      # Create union
PUT /api/unions/:id                   # Update union
DELETE /api/unions/:id                # Delete union
POST /api/unions/:id/members          # Add member
GET /api/unions/:id/members           # List members
POST /api/unions/:id/news             # Add news/event
GET /api/unions/:id/news              # List news/events
```

### Shop/E-commerce Endpoints (shopController.js)

```
GET /api/shop/categories              # List categories
GET /api/shop/products                # List products (with filters)
GET /api/shop/products/:id            # Get product details
POST /api/shop/products               # Create product
PUT /api/shop/products/:id            # Update product
DELETE /api/shop/products/:id         # Delete product
POST /api/shop/cart                   # Add to cart
GET /api/shop/cart                    # Get cart
POST /api/shop/orders                 # Create order
GET /api/shop/orders                  # List orders
GET /api/shop/orders/:id              # Get order details
PUT /api/shop/orders/:id/status       # Update order status
```

### Media Endpoints (mediaController.js)

```
GET /api/media/categories             # List media categories
GET /api/media/content                # List media content
GET /api/media/content/:id            # Get content details
POST /api/media/content               # Upload media content
PUT /api/media/content/:id            # Update content
DELETE /api/media/content/:id         # Delete content
POST /api/media/content/:id/view      # Increment view count
POST /api/media/content/:id/like      # Like content
```

### Gallery Endpoints (galleryController.js)

```
GET /api/gallery/albums               # List albums
GET /api/gallery/albums/:id           # Get album details
POST /api/gallery/albums              # Create album
PUT /api/gallery/albums/:id           # Update album
DELETE /api/gallery/albums/:id        # Delete album
POST /api/gallery/albums/:id/images   # Upload images
GET /api/gallery/albums/:id/images    # List images
DELETE /api/gallery/images/:id        # Delete image
```

### Franchise Endpoints (franchiseController.js)

```
GET /api/franchise/holders            # List franchise holders
GET /api/franchise/holders/:id        # Get holder details
POST /api/franchise/holders           # Create holder
PUT /api/franchise/holders/:id        # Update holder
POST /api/franchise/apply             # Apply for franchise
GET /api/franchise/applications       # List applications
PUT /api/franchise/applications/:id   # Update application status
```

### CMS Endpoints (cmsController.js)

```
GET /api/cms/about                    # Get about us
PUT /api/cms/about                    # Update about us
GET /api/cms/newsroom                 # List news
POST /api/cms/newsroom                # Create news
GET /api/cms/events                   # List events
POST /api/cms/events                  # Create event
GET /api/cms/careers                  # List jobs
POST /api/cms/careers                 # Create job
POST /api/cms/careers/:id/apply       # Apply for job
GET /api/cms/testimonials             # List testimonials
POST /api/cms/testimonials            # Create testimonial
GET /api/cms/contact                  # Get contact info
POST /api/cms/contact                 # Submit contact form
```

### God/Temple Endpoints (godController.js)

```
GET /api/god/temples                  # List temples
GET /api/god/temples/:id              # Get temple details
POST /api/god/temples                 # Create temple
PUT /api/god/temples/:id              # Update temple
POST /api/god/temples/:id/photos      # Upload photos
GET /api/god/temples/:id/timings      # Get timings
PUT /api/god/temples/:id/timings      # Update timings
GET /api/god/temples/:id/festivals    # List festivals
POST /api/god/temples/:id/festivals   # Add festival
```

## Next Steps for Implementation

### Phase 1: Core Setup ✅
- [x] Database schema
- [x] Project structure
- [x] Configuration files
- [x] Core models (User, Group, GroupCreate)

### Phase 2: Authentication & Middleware (TODO)
- [ ] Complete all Sequelize models
- [ ] Model associations in index.js
- [ ] Authentication middleware
- [ ] Role-based access control middleware
- [ ] Validation middleware
- [ ] Error handling middleware
- [ ] File upload middleware

### Phase 3: Services (TODO)
- [ ] Auth service (JWT generation, validation)
- [ ] Email service (Nodemailer)
- [ ] SMS service (OTP)
- [ ] S3 service (file uploads)

### Phase 4: Controllers & Routes (TODO)
- [ ] Auth controller (6 login types)
- [ ] User controller
- [ ] Geographic data controller
- [ ] Needy services controller
- [ ] Labor controller
- [ ] Union controller
- [ ] Shop controller
- [ ] Media controller
- [ ] Gallery controller
- [ ] Franchise controller
- [ ] CMS controller
- [ ] God/Temple controller

### Phase 5: Testing & Documentation (TODO)
- [ ] Unit tests
- [ ] Integration tests
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Deployment guide

## Key Implementation Notes

### 1. Multi-Tenant Architecture
- Each group has its own `group_id` in `group_create` table
- Users are associated with groups via `users.group_id`
- Data isolation by group_id in queries

### 2. Role-Based Access Control
- 11 user roles defined in `groups` table
- Junction table `users_groups` for many-to-many relationship
- Middleware checks user roles before allowing access

### 3. Authentication Flow
- 6 different login endpoints for different user types
- JWT access tokens (15 min expiry)
- JWT refresh tokens (7 day expiry)
- Password hashing with bcrypt (10 rounds)

### 4. File Upload Strategy
- Multer for handling multipart/form-data
- AWS S3 / Wasabi for cloud storage
- Pre-signed URLs for secure access
- File type and size validation

### 5. CRM-Style Reporting
- Database views for common reports
- Indexes on frequently queried columns
- Composite indexes for multi-column queries
- Full-text search on text fields

### 6. Security Best Practices
- Helmet for HTTP headers
- CORS configuration
- Rate limiting on authentication endpoints
- Input validation with Joi/Zod
- SQL injection prevention (Sequelize ORM)
- XSS protection

## Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Database Migration
```bash
npm run db:migrate
```

### Run Tests
```bash
npm test
```

## Environment Variables

See `.env.example` for all required environment variables.

Key variables:
- `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` - Database connection
- `JWT_SECRET` - JWT signing key (minimum 32 characters)
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` - S3 credentials
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD` - Email configuration

## Support

For questions or issues, refer to the COMPLETE_MIGRATION_GUIDE.md file for detailed specifications.

