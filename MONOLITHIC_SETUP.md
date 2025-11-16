# My Group - Monolithic Architecture Setup Guide

## 🏗️ Architecture Overview

This project uses a **monolithic architecture** where both frontend and backend run together from a single command.

```
mygroup/
├── src/                    # Frontend (React + Vite)
├── backend/                # Backend (Node.js + Express)
│   ├── src/
│   ├── database/
│   └── package.json
├── package.json            # Root package (runs both)
└── vite.config.ts
```

## 🚀 Quick Start (One Command Setup)

### Step 1: Install All Dependencies

From the **root directory** (`D:\mygroup`):

```bash
npm run install:all
```

This will install dependencies for both frontend and backend.

### Step 2: Setup Database

#### Option A: MySQL Workbench (Recommended)
1. Open MySQL Workbench
2. Connect to your MySQL server
3. **Server** → **Data Import**
4. **Import from Self-Contained File**: `D:\mygroup\backend\database\schema.sql`
5. **Default Target Schema**: `my_group`
6. **Start Import**

#### Option B: MySQL Command Line
```bash
mysql -u root -p
```
```sql
CREATE DATABASE my_group CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE my_group;
SOURCE D:/mygroup/backend/database/schema.sql;
exit;
```

### Step 3: Configure Environment

The backend `.env` file is already configured at `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=my_group
DB_USER=root
DB_PASSWORD=admin
```

**Verify the password matches your MySQL root password!**

### Step 4: Run the Application

From the **root directory**:

```bash
npm run dev
```

This single command will start:
- ✅ **Frontend** on `http://localhost:5173`
- ✅ **Backend** on `http://localhost:5000`

You'll see output like:
```
[FRONTEND] VITE v6.3.5  ready in 500 ms
[FRONTEND] ➜  Local:   http://localhost:5173/
[BACKEND] 🚀 My Group API Server
[BACKEND] Server running at: http://localhost:5000
```

## 📝 Available Scripts

### Development

```bash
# Run both frontend and backend together
npm run dev

# Run only frontend
npm run dev:frontend

# Run only backend
npm run dev:backend
```

### Production

```bash
# Build both frontend and backend
npm run build

# Start production servers
npm start
```

### Maintenance

```bash
# Install all dependencies (frontend + backend)
npm run install:all

# Clean all node_modules and build files
npm run clean

# Run tests
npm test
```

## 🌐 URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | React application |
| Backend API | http://localhost:5000 | Express API server |
| API Health | http://localhost:5000/api/health | Health check endpoint |

## 🔧 Configuration

### Frontend Configuration

**File**: `vite.config.ts`

The frontend is configured to proxy API requests to the backend:

```typescript
export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})
```

### Backend Configuration

**File**: `backend/.env`

Key settings:
- `PORT=5000` - Backend server port
- `DB_*` - Database connection settings
- `JWT_SECRET` - JWT authentication secret
- `CORS_ORIGIN=http://localhost:5173` - Frontend URL

## 🧪 Testing the Setup

### 1. Test Backend Health

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

### 2. Test Frontend

Open browser: `http://localhost:5173`

You should see the My Group login page.

### 3. Test API from Frontend

The frontend can call the backend API using relative URLs:

```javascript
// This will automatically proxy to http://localhost:5000/api/auth/login
fetch('/api/auth/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: 'password123' })
})
```

## 🐛 Troubleshooting

### Issue 1: Port Already in Use

**Error**: `Port 5000 is already in use`

**Solution**: Change port in `backend/.env`:
```env
PORT=5001
```

### Issue 2: Database Connection Failed

**Error**: `Access denied for user 'root'@'localhost'`

**Solution**: Update `backend/.env` with correct MySQL password:
```env
DB_PASSWORD=your_actual_password
```

### Issue 3: Frontend Can't Connect to Backend

**Error**: `Network Error` or `CORS Error`

**Solution**: 
1. Ensure backend is running on port 5000
2. Check `CORS_ORIGIN` in `backend/.env` matches frontend URL
3. Verify proxy configuration in `vite.config.ts`

## 📦 Project Structure

```
mygroup/
├── src/                          # Frontend source
│   ├── components/               # React components
│   ├── pages/                    # Page components
│   ├── App.tsx                   # Main app component
│   └── main.tsx                  # Entry point
├── backend/                      # Backend source
│   ├── src/
│   │   ├── config/               # Configuration files
│   │   ├── controllers/          # Route controllers
│   │   ├── middleware/           # Express middleware
│   │   ├── models/               # Sequelize models
│   │   ├── routes/               # API routes
│   │   ├── services/             # Business logic
│   │   ├── app.js                # Express app
│   │   └── server.js             # Server entry point
│   ├── database/
│   │   └── schema.sql            # Database schema
│   ├── .env                      # Backend environment variables
│   └── package.json              # Backend dependencies
├── package.json                  # Root package (monolithic)
├── vite.config.ts                # Vite configuration
└── MONOLITHIC_SETUP.md           # This file
```

## 🎯 Next Steps

1. ✅ Run `npm run install:all`
2. ✅ Import database schema
3. ✅ Configure `backend/.env`
4. ✅ Run `npm run dev`
5. 📝 Open `http://localhost:5173` in browser
6. 📝 Test login functionality
7. 📝 Start developing features!

## 📚 Additional Documentation

- **Frontend**: See `src/README.md`
- **Backend**: See `backend/README.md`
- **API Documentation**: See `backend/IMPLEMENTATION_GUIDE.md`
- **Windows Setup**: See `backend/WINDOWS_SETUP.md`
- **Migration Guide**: See `COMPLETE_MIGRATION_GUIDE.md`

---

**Happy Coding! 🚀**

