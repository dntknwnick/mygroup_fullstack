# Quick Start Guide - My Group Backend

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js >= 18.0.0 (`node --version`)
- ✅ MySQL >= 8.0 (`mysql --version`)
- ✅ npm >= 9.0.0 (`npm --version`)

## Step-by-Step Setup

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

Expected output: All packages installed successfully

### Step 2: Configure Environment

```bash
cp .env.example .env
```

Edit `.env` file with your settings:

```env
# Minimum required settings:
DB_HOST=localhost
DB_PORT=3306
DB_NAME=my_group
DB_USER=root
DB_PASSWORD=your_mysql_password

JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-change-this

CORS_ORIGIN=http://localhost:5173
```

### Step 3: Create Database

#### Option A: Using MySQL Command Line

```bash
mysql -u root -p
```

Then run:

```sql
CREATE DATABASE my_group CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;
```

#### Option B: Using MySQL Workbench

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Run: `CREATE DATABASE my_group CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`

### Step 4: Import Database Schema

#### Linux/Mac:

```bash
mysql -u root -p my_group < database/schema.sql
```

#### Windows:

**See `WINDOWS_SETUP.md` for detailed Windows instructions.**

Quick option - Use MySQL Workbench:
1. Open MySQL Workbench
2. Server → Data Import
3. Import from Self-Contained File: `D:\mygroup\backend\database\schema.sql`
4. Default Target Schema: `my_group`
5. Start Import

**Verify**: You should see 50+ tables created in the `my_group` database.

### Step 5: Start the Server

#### Development Mode (with auto-reload)

```bash
npm run dev
```

#### Production Mode

```bash
npm start
```

### Step 6: Test the API

#### Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### Test Registration

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "phone": "1234567890"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": { ... },
    "accessToken": "...",
    "refreshToken": "...",
    "dashboardRoute": "/dashboard/client",
    "roles": ["client"]
  }
}
```

#### Test Login

```bash
curl -X POST http://localhost:5000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

## Common Issues & Solutions

### Issue 1: Database Connection Failed

**Error**: `Unable to connect to the database`

**Solution**:
1. Check MySQL is running: `sudo systemctl status mysql` (Linux) or check Services (Windows)
2. Verify credentials in `.env` file
3. Ensure database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### Issue 2: Port Already in Use

**Error**: `Port 5000 is already in use`

**Solution**:
1. Change PORT in `.env` file: `PORT=5001`
2. Or kill the process using port 5000

### Issue 3: JWT Secret Error

**Error**: `JWT secret must be at least 32 characters`

**Solution**:
Update `JWT_SECRET` in `.env` with a longer string (minimum 32 characters)

### Issue 4: CORS Error

**Error**: `CORS policy blocked`

**Solution**:
Update `CORS_ORIGIN` in `.env` to match your frontend URL

## Testing All Login Types

### 1. Admin Login
```bash
curl -X POST http://localhost:5000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password123"}'
```

### 2. Group Admin Login
```bash
curl -X POST http://localhost:5000/api/auth/group-admin/login/mygroup \
  -H "Content-Type: application/json" \
  -d '{"username": "groupadmin", "password": "password123"}'
```

### 3. Company Login
```bash
curl -X POST http://localhost:5000/api/auth/company/login/mycompany \
  -H "Content-Type: application/json" \
  -d '{"username": "companyuser", "password": "password123"}'
```

### 4. Client Login
```bash
curl -X POST http://localhost:5000/api/auth/client/login/mygroup \
  -H "Content-Type: application/json" \
  -d '{"username": "client", "password": "password123"}'
```

### 5. God/Temple Login
```bash
curl -X POST http://localhost:5000/api/auth/god/login/mygroup/temple1 \
  -H "Content-Type: application/json" \
  -d '{"username": "templeadmin", "password": "password123"}'
```

### 6. Partner Login
```bash
curl -X POST http://localhost:5000/api/auth/partner/login \
  -H "Content-Type: application/json" \
  -d '{"username": "partner", "password": "password123"}'
```

### 7. Reporter Login
```bash
curl -X POST http://localhost:5000/api/auth/reporter/login \
  -H "Content-Type: application/json" \
  -d '{"username": "reporter", "password": "password123"}'
```

## Using with Frontend

1. Start the backend server: `npm run dev`
2. Backend runs on: `http://localhost:5000`
3. Frontend should make API calls to: `http://localhost:5000/api`

Example frontend login:

```javascript
const response = await fetch('http://localhost:5000/api/auth/admin/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'admin',
    password: 'password123',
  }),
});

const data = await response.json();
console.log(data.data.accessToken); // Use this token for authenticated requests
```

## Next Steps

1. ✅ Backend is running
2. ✅ Database is set up
3. ✅ Authentication is working
4. 📝 Create test users in the database
5. 📝 Implement additional controllers (see IMPLEMENTATION_GUIDE.md)
6. 📝 Connect frontend to backend
7. 📝 Add more features as needed

## Useful Commands

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start

# Run tests (when implemented)
npm test

# Check for linting errors
npm run lint

# Fix linting errors
npm run lint:fix
```

## Documentation

- **README.md** - Complete setup guide
- **IMPLEMENTATION_GUIDE.md** - Detailed API documentation
- **PROJECT_SUMMARY.md** - Project overview and status
- **COMPLETE_MIGRATION_GUIDE.md** - Original specifications

## Support

If you encounter any issues:
1. Check the error logs in `logs/` directory
2. Verify all environment variables in `.env`
3. Ensure MySQL is running and accessible
4. Check Node.js and npm versions

Happy coding! 🚀

