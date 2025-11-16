# My Group - Backend API

Multi-tenant CRM platform backend built with Node.js, Express, and MySQL.

## 🚀 Features

- **6 Login Types**: Admin, Group Admin, Company, Client, God/Temple, Partner, Reporter
- **11 User Roles**: Role-based access control
- **23+ Applications**: Support for all group applications
- **JWT Authentication**: Secure token-based authentication
- **Multi-tenant Architecture**: Data isolation by group
- **RESTful API**: Clean and consistent API design
- **CRM-Style Database**: Optimized for reporting and analytics
- **File Upload**: AWS S3/Wasabi integration
- **Email & SMS**: Nodemailer and SMS service integration

## 📋 Prerequisites

- Node.js >= 18.0.0
- MySQL >= 8.0
- npm >= 9.0.0

## 🛠 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- Database credentials
- JWT secret (minimum 32 characters)
- AWS S3 credentials
- SMTP settings

### 4. Create database

```bash
mysql -u root -p
```

```sql
CREATE DATABASE my_group CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Import database schema

```bash
mysql -u root -p my_group < database/schema.sql
```

## 🏃 Running the Application

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm start
```

The server will start at `http://localhost:5000`

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Health Check

```
GET /api/health
```

### Authentication Endpoints

#### 1. Admin Login
```http
POST /api/auth/admin/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}
```

#### 2. Group Admin Login
```http
POST /api/auth/group-admin/login/:groupName
Content-Type: application/json

{
  "username": "groupadmin",
  "password": "password123"
}
```

#### 3. Company Login
```http
POST /api/auth/company/login/:companyName
Content-Type: application/json

{
  "username": "company_user",
  "password": "password123"
}
```

#### 4. Client Login
```http
POST /api/auth/client/login/:groupName
Content-Type: application/json

{
  "username": "client",
  "password": "password123"
}
```

#### 5. God/Temple Login
```http
POST /api/auth/god/login/:groupName/:subGroup
Content-Type: application/json

{
  "username": "temple_admin",
  "password": "password123"
}
```

#### 6. Partner Login
```http
POST /api/auth/partner/login
Content-Type: application/json

{
  "username": "partner",
  "password": "password123"
}
```

#### 7. Reporter Login
```http
POST /api/auth/reporter/login
Content-Type: application/json

{
  "username": "reporter",
  "password": "password123"
}
```

#### 8. Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "1234567890"
}
```

#### 9. Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### 10. Logout
```http
POST /api/auth/logout
Authorization: Bearer <access-token>
```

### Response Format

#### Success Response
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "accessToken": "...",
    "refreshToken": "...",
    "dashboardRoute": "/dashboard/admin",
    "roles": ["admin"]
  }
}
```

#### Error Response
```json
{
  "success": false,
  "message": "Invalid credentials",
  "code": "INVALID_CREDENTIALS"
}
```

## 📁 Project Structure

```
backend/
├── database/
│   └── schema.sql              # Complete database schema
├── src/
│   ├── config/
│   │   ├── database.js         # Sequelize configuration
│   │   ├── jwt.js              # JWT settings
│   │   ├── logger.js           # Winston logger
│   │   └── constants.js        # Application constants
│   ├── models/
│   │   ├── User.js             # User model
│   │   ├── Group.js            # Role model
│   │   └── GroupCreate.js      # Applications model
│   ├── controllers/
│   │   └── authController.js   # Authentication logic
│   ├── routes/
│   │   ├── auth.routes.js      # Auth routes
│   │   └── index.js            # Route aggregator
│   ├── middleware/
│   │   ├── auth.middleware.js  # JWT verification
│   │   ├── role.middleware.js  # RBAC
│   │   └── error.middleware.js # Error handling
│   ├── services/
│   │   └── tokenService.js     # JWT management
│   ├── app.js                  # Express app
│   └── server.js               # Server entry point
├── logs/                       # Application logs
├── .env.example                # Environment template
├── .gitignore
├── package.json
├── IMPLEMENTATION_GUIDE.md     # Detailed implementation guide
└── README.md
```

## 🔐 Security

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with expiry
- Helmet for HTTP headers
- CORS configuration
- Rate limiting on auth endpoints
- Input validation
- SQL injection prevention (Sequelize ORM)

## 📝 Environment Variables

See `.env.example` for all available environment variables.

## 🧪 Testing

```bash
npm test
```

## 📖 Additional Documentation

- See `IMPLEMENTATION_GUIDE.md` for detailed implementation guide
- See `COMPLETE_MIGRATION_GUIDE.md` for full specifications
- See `database/schema.sql` for database structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT

## 👥 Support

For questions or issues, please refer to the documentation or create an issue.

