# Windows Setup Guide - My Group Backend

## ✅ Fixed: MySQL Reserved Keywords Issue

The schema has been updated to escape reserved keywords (`groups`, `events`) with backticks.
The import should now work without errors!

## MySQL Database Setup on Windows

### Method 1: MySQL Workbench (Easiest)

1. **Open MySQL Workbench**
2. **Connect to your local MySQL server**
3. **Create Database**:
   - Click on "Server" → "Data Import"
   - Or run this SQL:
   ```sql
   CREATE DATABASE my_group CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

4. **Import Schema**:
   - Click "Server" → "Data Import"
   - Select "Import from Self-Contained File"
   - Browse to: `D:\mygroup\backend\database\schema.sql`
   - Default Target Schema: `my_group`
   - Click "Start Import"

5. **Verify**:
   ```sql
   USE my_group;
   SHOW TABLES;
   ```
   You should see 50+ tables.

---

### Method 2: MySQL Command Line Client

1. **Find MySQL Command Line Client** in Start Menu
2. **Open it** and enter your root password
3. **Run**:
   ```sql
   CREATE DATABASE my_group CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   USE my_group;
   SOURCE D:/mygroup/backend/database/schema.sql;
   ```

---

### Method 3: PowerShell

```powershell
# Navigate to project
cd D:\mygroup\backend

# Run MySQL (adjust path to your MySQL installation)
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p

# In MySQL prompt:
CREATE DATABASE my_group CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE my_group;
SOURCE database/schema.sql;
exit;
```

---

### Method 4: Add MySQL to PATH (Recommended)

**One-time setup to use `mysql` command in any terminal:**

1. **Find your MySQL bin directory**:
   - Usually: `C:\Program Files\MySQL\MySQL Server 8.0\bin`
   - Or: `C:\Program Files\MySQL\MySQL Server 8.4\bin`

2. **Add to PATH**:
   - Press `Win + X` → System
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "System variables", find "Path"
   - Click "Edit" → "New"
   - Add: `C:\Program Files\MySQL\MySQL Server 8.0\bin`
   - Click OK on all dialogs

3. **Restart your terminal** (Git Bash, PowerShell, etc.)

4. **Now you can use**:
   ```bash
   mysql -u root -p
   ```

---

## Node.js Backend Setup on Windows

### Step 1: Install Dependencies

```powershell
cd D:\mygroup\backend
npm install
```

### Step 2: Configure Environment

The `.env.example` file is already configured with:
```env
DB_PASSWORD=root
```

Copy it to `.env`:

```powershell
copy .env.example .env
```

Or manually create `.env` file with:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=my_group
DB_USER=root
DB_PASSWORD=root

# JWT Configuration
JWT_SECRET=my-super-secret-jwt-key-change-this-in-production-minimum-32-chars

# Server Configuration
PORT=5000
NODE_ENV=development
API_PREFIX=/api
API_VERSION=v1

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### Step 3: Start the Server

**Development mode** (with auto-reload):

```powershell
npm run dev
```

**Production mode**:

```powershell
npm start
```

### Step 4: Test the API

Open a new PowerShell window:

```powershell
# Health check
curl http://localhost:5000/api/health

# Or use browser
# Navigate to: http://localhost:5000/api/health
```

---

## Testing with PowerShell

### Register a User

```powershell
$body = @{
    username = "testuser"
    email = "test@example.com"
    password = "password123"
    firstName = "Test"
    lastName = "User"
    phone = "1234567890"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

### Login

```powershell
$body = @{
    username = "testuser"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/admin/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

---

## Common Windows Issues

### Issue 1: `mysql: command not found`

**Solution**: Use MySQL Workbench or add MySQL to PATH (see Method 4 above)

### Issue 2: Port 5000 already in use

**Solution**: Change port in `.env`:
```env
PORT=5001
```

### Issue 3: Cannot find module errors

**Solution**: Delete `node_modules` and reinstall:
```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### Issue 4: MySQL Access Denied Error

**Error**: `Access denied for user 'root'@'localhost' (using password: YES)`

**Solutions**:

#### Solution A: Try Empty Password
Many MySQL installations on Windows have an empty root password by default.

Edit `.env`:
```env
DB_PASSWORD=
```

#### Solution B: Find Your Actual Password
1. Open MySQL Workbench
2. Try connecting with different passwords:
   - Empty (leave blank)
   - `root`
   - Password from installation

3. Once connected, update `.env` with the working password

#### Solution C: Create Dedicated User (Recommended)
In MySQL Workbench, run:
```sql
CREATE USER 'mygroup_user'@'localhost' IDENTIFIED BY 'mygroup_password';
GRANT ALL PRIVILEGES ON my_group.* TO 'mygroup_user'@'localhost';
FLUSH PRIVILEGES;
```

Then update `.env`:
```env
DB_USER=mygroup_user
DB_PASSWORD=mygroup_password
```

#### Solution D: Reset Root Password
See "Reset MySQL Root Password" section below.

### Issue 5: MySQL connection refused

**Solution**:
1. Check MySQL is running (Services → MySQL80)
2. Verify credentials in `.env`
3. Test connection in MySQL Workbench

---

## Reset MySQL Root Password (If Needed)

If you forgot your MySQL root password:

### Step 1: Stop MySQL Service
1. Press `Win + R`, type `services.msc`, press Enter
2. Find `MySQL80` (or your MySQL version)
3. Right-click → Stop

### Step 2: Start MySQL in Safe Mode
Open **Command Prompt as Administrator**:
```cmd
cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
mysqld.exe --skip-grant-tables
```
(Leave this window open)

### Step 3: Connect and Reset Password
Open **another Command Prompt as Administrator**:
```cmd
cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
mysql.exe -u root
```

In MySQL prompt:
```sql
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
FLUSH PRIVILEGES;
exit;
```

### Step 4: Restart MySQL Normally
1. Close both Command Prompt windows (Ctrl+C in the first one)
2. Go back to `services.msc`
3. Right-click `MySQL80` → Start

### Step 5: Update .env
```env
DB_PASSWORD=root
```

---

## Using with Frontend

1. **Start Backend**: `npm run dev` (in `D:\mygroup\backend`)
2. **Start Frontend**: `npm run dev` (in `D:\mygroup`)
3. **Backend URL**: `http://localhost:5000`
4. **Frontend URL**: `http://localhost:5173`

---

## Useful Windows Commands

```powershell
# Check if MySQL is running
Get-Service MySQL80

# Start MySQL service
Start-Service MySQL80

# Stop MySQL service
Stop-Service MySQL80

# Check Node.js version
node --version

# Check npm version
npm --version

# View running processes on port 5000
netstat -ano | findstr :5000

# Kill process by PID
taskkill /PID <PID> /F
```

---

## Next Steps

1. ✅ Import database schema (using one of the methods above)
2. ✅ Configure `.env` file
3. ✅ Run `npm install`
4. ✅ Start server with `npm run dev`
5. ✅ Test API endpoints
6. 📝 Connect frontend to backend
7. 📝 Create test users

---

## Support

If you encounter issues:
1. Check MySQL is running in Services
2. Verify `.env` configuration
3. Check logs in `backend/logs/` directory
4. Ensure Node.js >= 18.0.0

Happy coding! 🚀

