# Database Setup Guide

## Prerequisites
- MySQL 8.0+ installed
- MySQL Workbench (recommended) or MySQL CLI

## Step 1: Create Database

### Option A: Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your MySQL server (localhost)
3. Click on "File" → "Open SQL Script"
4. Navigate to `backend/database/schema.sql`
5. Click "Execute" (⚡ icon) to run the script

### Option B: Using MySQL CLI
```bash
# Login to MySQL
mysql -u root -p

# Run the schema file
source backend/database/schema.sql;

# Or in one command
mysql -u root -p < backend/database/schema.sql
```

## Step 2: Verify Database Creation

```sql
-- Check if database exists
SHOW DATABASES LIKE 'my_group';

-- Use the database
USE my_group;

-- Check tables
SHOW TABLES;

-- You should see 50+ tables including:
-- - users
-- - groups
-- - group_create
-- - create_details
-- - etc.
```

## Step 3: Verify Default Data

```sql
-- Check default groups
SELECT * FROM `groups`;

-- Check default applications
SELECT * FROM group_create;

-- You should see:
-- - 11 default groups (admin, groups, labor, client, etc.)
-- - 23 applications (Mygroup, Mychat, Mydiary, etc.)
```

## Step 4: Create Test User (Optional)

```sql
-- Insert a test admin user
-- Password: 'admin123' (hashed with bcrypt)
INSERT INTO users (username, email, password, first_name, last_name, active, created_on)
VALUES (
  'admin',
  'admin@mygroup.com',
  '$2b$10$YourHashedPasswordHere',
  'Admin',
  'User',
  1,
  UNIX_TIMESTAMP()
);

-- Get the user ID
SET @user_id = LAST_INSERT_ID();

-- Assign admin role
INSERT INTO users_groups (user_id, group_id)
VALUES (@user_id, 1); -- 1 = admin group
```

## Step 5: Update Backend .env

Make sure your `backend/.env` file has the correct database credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=my_group
DB_USER=root
DB_PASSWORD=admin
DB_DIALECT=mysql
```

## Step 6: Test Connection

```bash
# Start the backend server
cd backend
npm run dev

# You should see:
# ✅ Database connection established successfully
# 🚀 My Group API Server running at: http://localhost:5000
```

## Troubleshooting

### Error: "Access denied for user"
- Check your MySQL username and password in `backend/.env`
- Make sure MySQL server is running

### Error: "Unknown database 'my_group'"
- Run the schema.sql file again
- Check if the database was created: `SHOW DATABASES;`

### Error: "Table doesn't exist"
- Make sure all tables were created
- Check for errors in the schema.sql execution
- Run: `USE my_group; SHOW TABLES;`

### Error: "Reserved keyword"
- The schema uses backticks for reserved keywords (groups, events)
- Make sure you're using MySQL 8.0+

## Database Structure

The database includes:
- **Core Tables**: users, groups, group_create
- **Authentication**: users_groups, login_attempts
- **Applications**: 23 different application tables
- **Features**: Events, Posts, Media, Finance, etc.

## Next Steps

1. ✅ Database created and verified
2. ✅ Backend connected to database
3. ✅ Frontend connected to backend API
4. 🚀 Ready to test login functionality!

## Testing Login

Once the database is set up, you can test the login functionality:

1. Create a test user (see Step 4 above)
2. Start the dev server: `npm run dev`
3. Navigate to: http://localhost:5173/auth/login
4. Login with your test credentials

---

**Need Help?**
- Check backend logs: `backend/logs/app.log`
- Check MySQL error log
- Verify all environment variables are set correctly

