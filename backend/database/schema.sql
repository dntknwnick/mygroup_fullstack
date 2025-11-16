-- ============================================
-- MY GROUP - COMPLETE DATABASE SCHEMA
-- CRM-Style Multi-Tenant Platform
-- MySQL 8.0+
-- ============================================
--
-- NOTE: Reserved keywords (groups, events) are escaped with backticks
-- to avoid MySQL syntax errors.
-- ============================================

-- Drop existing database if needed (CAUTION: Use only in development)
-- DROP DATABASE IF EXISTS my_group;

CREATE DATABASE IF NOT EXISTS my_group CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE my_group;

-- ============================================
-- SECTION 1: CORE AUTHENTICATION & USER MANAGEMENT
-- ============================================

-- User Roles/Groups Table
CREATE TABLE `groups` (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL UNIQUE,
  description VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default groups
INSERT INTO `groups` (id, name, description) VALUES
(1, 'admin', 'Super Administrator'),
(2, 'groups', 'Group Manager'),
(3, 'labor', 'Labor User'),
(4, 'client', 'Regular Client'),
(5, 'corporate', 'Corporate/Franchise Head'),
(6, 'head_office', 'Head Office Staff'),
(7, 'regional', 'Regional Office Staff'),
(8, 'branch', 'Branch Office Staff'),
(9, 'client_god', 'Special Client (God Mode)'),
(10, 'partner', 'Partner User'),
(11, 'reporter', 'Reporter User');

-- Group Applications (23+ Applications)
CREATE TABLE group_create (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  apps_name VARCHAR(100),
  db_name VARCHAR(100),
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name (name),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert group applications
INSERT INTO group_create (id, name, apps_name, db_name) VALUES
(1, 'Mygroup', 'My Group', 'mygroup'),
(2, 'Mychat', 'My Chat', 'mychat'),
(3, 'Mydiary', 'My Diary', 'mydiary'),
(4, 'Myneedy', 'My Needy', 'myneedy'),
(5, 'Myjoy', 'My Joy', 'myjoy'),
(6, 'Mymedia', 'My Media', 'mymedia'),
(7, 'Myunions', 'My Unions', 'myunions'),
(8, 'Mytv', 'My TV', 'mytv'),
(9, 'Myfin', 'My Finance', 'myfin'),
(10, 'Myshop', 'My Shop', 'myshop'),
(11, 'Myfriend', 'My Friend', 'myfriend'),
(12, 'Mybiz', 'My Business', 'mybiz'),
(13, 'Mybank', 'My Bank', 'mybank'),
(14, 'Mygo', 'My Go', 'mygo'),
(15, 'Mycreations', 'My Creations', 'mycreations'),
(16, 'Myads', 'My Ads', 'myads'),
(17, 'Mycharity', 'My Charity', 'mycharity'),
(18, 'Myteam', 'My Team', 'myteam'),
(19, 'Myinstitutions', 'My Institutions', 'myinstitutions'),
(20, 'Myindustries', 'My Industries', 'myindustries'),
(21, 'Myview', 'My View', 'myview'),
(22, 'Mytrack', 'My Track', 'mytrack'),
(23, 'Myminiapps', 'My Mini Apps', 'myminiapps');

-- Group Branding Details
CREATE TABLE create_details (
  id INT PRIMARY KEY AUTO_INCREMENT,
  create_id INT NOT NULL,
  icon VARCHAR(255),
  logo VARCHAR(255),
  name_image VARCHAR(255),
  background_color VARCHAR(50),
  banner VARCHAR(255),
  url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (create_id) REFERENCES group_create(id) ON DELETE CASCADE,
  INDEX idx_create_id (create_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Main Users Table (Ion Auth Compatible)
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(254) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  company VARCHAR(100),
  phone VARCHAR(20),
  profile_img VARCHAR(255),
  display_name VARCHAR(100),
  alter_number VARCHAR(20),
  created_on INT,
  last_login INT,
  active TINYINT DEFAULT 1,
  group_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES group_create(id) ON DELETE SET NULL,
  INDEX idx_email (email),
  INDEX idx_username (username),
  INDEX idx_active (active),
  INDEX idx_group_id (group_id),
  INDEX idx_last_login (last_login)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User-Group Junction Table (Many-to-Many)
CREATE TABLE users_groups (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  group_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (group_id) REFERENCES `groups`(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_group (user_id, group_id),
  INDEX idx_user_id (user_id),
  INDEX idx_group_id (group_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SECTION 2: GEOGRAPHIC & REFERENCE DATA
-- ============================================

-- Countries Table
CREATE TABLE country_tbl (
  id INT PRIMARY KEY AUTO_INCREMENT,
  country_name VARCHAR(100) NOT NULL,
  country_code VARCHAR(10),
  phone_code VARCHAR(10),
  flag_icon VARCHAR(255),
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_country_name (country_name),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- States Table
CREATE TABLE state_tbl (
  id INT PRIMARY KEY AUTO_INCREMENT,
  country_id INT NOT NULL,
  state_name VARCHAR(100) NOT NULL,
  state_code VARCHAR(10),
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (country_id) REFERENCES country_tbl(id) ON DELETE CASCADE,
  INDEX idx_country_id (country_id),
  INDEX idx_state_name (state_name),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Districts Table
CREATE TABLE district_tbl (
  id INT PRIMARY KEY AUTO_INCREMENT,
  state_id INT NOT NULL,
  district_name VARCHAR(100) NOT NULL,
  district_code VARCHAR(10),
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (state_id) REFERENCES state_tbl(id) ON DELETE CASCADE,
  INDEX idx_state_id (state_id),
  INDEX idx_district_name (district_name),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Education Levels
CREATE TABLE education (
  id INT PRIMARY KEY AUTO_INCREMENT,
  education_name VARCHAR(100) NOT NULL,
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_education_name (education_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Professions
CREATE TABLE profession (
  id INT PRIMARY KEY AUTO_INCREMENT,
  profession_name VARCHAR(100) NOT NULL,
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_profession_name (profession_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SECTION 3: USER PROFILE & REGISTRATION
-- ============================================

-- Extended User Registration Profile
CREATE TABLE user_registration_form (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  country_flag VARCHAR(255),
  country_code VARCHAR(10),
  gender ENUM('Male', 'Female', 'Other'),
  dob DATE,
  country INT,
  state INT,
  district INT,
  education INT,
  profession INT,
  education_others VARCHAR(255),
  work_others VARCHAR(255),
  dob_date INT,
  dob_month VARCHAR(20),
  dob_year INT,
  address TEXT,
  pincode VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (country) REFERENCES country_tbl(id) ON DELETE SET NULL,
  FOREIGN KEY (state) REFERENCES state_tbl(id) ON DELETE SET NULL,
  FOREIGN KEY (district) REFERENCES district_tbl(id) ON DELETE SET NULL,
  FOREIGN KEY (education) REFERENCES education(id) ON DELETE SET NULL,
  FOREIGN KEY (profession) REFERENCES profession(id) ON DELETE SET NULL,
  UNIQUE KEY unique_user_profile (user_id),
  INDEX idx_country (country),
  INDEX idx_state (state),
  INDEX idx_district (district)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Client Registration Status
CREATE TABLE client_registration (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  status ENUM('pending', 'active', 'inactive') DEFAULT 'pending',
  approval_date TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_client_user (user_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Client Name/Branding
CREATE TABLE client_name (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(255),
  color VARCHAR(50),
  logo VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Client Documents
CREATE TABLE client_document (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  document_name VARCHAR(255),
  document_path VARCHAR(255),
  document_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Client Awards
CREATE TABLE client_awards (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  awards_name VARCHAR(255),
  awards_path VARCHAR(255),
  award_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Client Objectives
CREATE TABLE client_objectivies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  objectivies_name VARCHAR(255),
  objectivies_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Client About
CREATE TABLE client_about (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  about_name VARCHAR(255),
  about_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Client Newsletter
CREATE TABLE client_news_letter (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  news_letter_name VARCHAR(255),
  news_letter_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SECTION 4: FRANCHISE MANAGEMENT
-- ============================================

-- Franchise Holders
CREATE TABLE franchise_holder (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  country INT,
  state INT,
  district INT,
  franchise_type ENUM('corporate', 'head_office', 'regional', 'branch') NOT NULL,
  status TINYINT DEFAULT 1,
  approved_date TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (country) REFERENCES country_tbl(id) ON DELETE SET NULL,
  FOREIGN KEY (state) REFERENCES state_tbl(id) ON DELETE SET NULL,
  FOREIGN KEY (district) REFERENCES district_tbl(id) ON DELETE SET NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_franchise_type (franchise_type),
  INDEX idx_status (status),
  INDEX idx_location (country, state, district)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Franchise Staff
CREATE TABLE franchise_staff (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  franchise_holder_id INT,
  designation VARCHAR(100),
  department VARCHAR(100),
  status TINYINT DEFAULT 1,
  joining_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (franchise_holder_id) REFERENCES franchise_holder(id) ON DELETE SET NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_franchise_holder_id (franchise_holder_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Franchise Staff Documents
CREATE TABLE franchise_staff_document (
  id INT PRIMARY KEY AUTO_INCREMENT,
  franchise_staff_id INT NOT NULL,
  document_name VARCHAR(255),
  imagepath VARCHAR(255),
  document_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (franchise_staff_id) REFERENCES franchise_staff(id) ON DELETE CASCADE,
  INDEX idx_franchise_staff_id (franchise_staff_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Franchise Advertisements
CREATE TABLE franchise_ads (
  id INT PRIMARY KEY AUTO_INCREMENT,
  franchise_holder_id INT,
  ads_image VARCHAR(255),
  ads_url VARCHAR(255),
  ads_title VARCHAR(255),
  status TINYINT DEFAULT 1,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (franchise_holder_id) REFERENCES franchise_holder(id) ON DELETE CASCADE,
  INDEX idx_franchise_holder_id (franchise_holder_id),
  INDEX idx_status (status),
  INDEX idx_dates (start_date, end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Franchise Applications
CREATE TABLE apply_franchise_now (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100),
  email VARCHAR(254) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  franchise_country INT,
  franchise_state INT,
  franchise_district INT,
  franchise_type ENUM('corporate', 'head_office', 'regional', 'branch'),
  resume_path VARCHAR(255),
  cover_letter TEXT,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  reviewed_by INT,
  reviewed_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (franchise_country) REFERENCES country_tbl(id) ON DELETE SET NULL,
  FOREIGN KEY (franchise_state) REFERENCES state_tbl(id) ON DELETE SET NULL,
  FOREIGN KEY (franchise_district) REFERENCES district_tbl(id) ON DELETE SET NULL,
  FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_email (email),
  INDEX idx_location (franchise_country, franchise_state, franchise_district)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SECTION 5: NEEDY SERVICES MODULE
-- ============================================

-- Needy Service Categories
CREATE TABLE needy_category (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(100) NOT NULL,
  category_icon VARCHAR(255),
  description TEXT,
  status TINYINT DEFAULT 1,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category_name (category_name),
  INDEX idx_status (status),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Needy Services
CREATE TABLE needy_services (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  category_id INT,
  service_name VARCHAR(255) NOT NULL,
  service_description TEXT,
  service_image VARCHAR(255),
  service_type ENUM('doorstep', 'center', 'manpower', 'online', 'help') DEFAULT 'doorstep',
  price DECIMAL(10, 2),
  price_type ENUM('fixed', 'hourly', 'daily', 'negotiable') DEFAULT 'fixed',
  country INT,
  state INT,
  district INT,
  address TEXT,
  contact_number VARCHAR(20),
  email VARCHAR(254),
  availability VARCHAR(255),
  rating DECIMAL(3, 2) DEFAULT 0.00,
  total_reviews INT DEFAULT 0,
  status TINYINT DEFAULT 1,
  featured TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES needy_category(id) ON DELETE SET NULL,
  FOREIGN KEY (country) REFERENCES country_tbl(id) ON DELETE SET NULL,
  FOREIGN KEY (state) REFERENCES state_tbl(id) ON DELETE SET NULL,
  FOREIGN KEY (district) REFERENCES district_tbl(id) ON DELETE SET NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_category_id (category_id),
  INDEX idx_service_type (service_type),
  INDEX idx_status (status),
  INDEX idx_featured (featured),
  INDEX idx_rating (rating),
  INDEX idx_location (country, state, district),
  FULLTEXT idx_search (service_name, service_description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Needy Service Reviews
CREATE TABLE needy_reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  service_id INT NOT NULL,
  user_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (service_id) REFERENCES needy_services(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_service_review (user_id, service_id),
  INDEX idx_service_id (service_id),
  INDEX idx_user_id (user_id),
  INDEX idx_rating (rating),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SECTION 6: LABOR MANAGEMENT MODULE
-- ============================================

-- Labor Categories
CREATE TABLE labor_category (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(100) NOT NULL,
  description TEXT,
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_category_name (category_name),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Labor Profiles
CREATE TABLE labor_profile (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  category_id INT,
  full_name VARCHAR(255) NOT NULL,
  profile_image VARCHAR(255),
  skills TEXT,
  experience_years INT,
  hourly_rate DECIMAL(10, 2),
  daily_rate DECIMAL(10, 2),
  country INT,
  state INT,
  district INT,
  address TEXT,
  contact_number VARCHAR(20),
  availability ENUM('available', 'busy', 'unavailable') DEFAULT 'available',
  rating DECIMAL(3, 2) DEFAULT 0.00,
  total_jobs INT DEFAULT 0,
  status TINYINT DEFAULT 1,
  verified TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES labor_category(id) ON DELETE SET NULL,
  FOREIGN KEY (country) REFERENCES country_tbl(id) ON DELETE SET NULL,
  FOREIGN KEY (state) REFERENCES state_tbl(id) ON DELETE SET NULL,
  FOREIGN KEY (district) REFERENCES district_tbl(id) ON DELETE SET NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_category_id (category_id),
  INDEX idx_availability (availability),
  INDEX idx_status (status),
  INDEX idx_verified (verified),
  INDEX idx_location (country, state, district),
  FULLTEXT idx_search (full_name, skills)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Labor Documents
CREATE TABLE labor_documents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  labor_id INT NOT NULL,
  document_type VARCHAR(50),
  document_name VARCHAR(255),
  document_path VARCHAR(255),
  verified TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (labor_id) REFERENCES labor_profile(id) ON DELETE CASCADE,
  INDEX idx_labor_id (labor_id),
  INDEX idx_verified (verified)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SECTION 7: UNIONS MODULE
-- ============================================

-- Union Organizations
CREATE TABLE union_organization (
  id INT PRIMARY KEY AUTO_INCREMENT,
  union_name VARCHAR(255) NOT NULL,
  union_type ENUM('union', 'federation', 'association') DEFAULT 'union',
  registration_number VARCHAR(100),
  founded_date DATE,
  description TEXT,
  logo VARCHAR(255),
  country INT,
  state INT,
  district INT,
  address TEXT,
  contact_number VARCHAR(20),
  email VARCHAR(254),
  website VARCHAR(255),
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (country) REFERENCES country_tbl(id) ON DELETE SET NULL,
  FOREIGN KEY (state) REFERENCES state_tbl(id) ON DELETE SET NULL,
  FOREIGN KEY (district) REFERENCES district_tbl(id) ON DELETE SET NULL,
  INDEX idx_union_name (union_name),
  INDEX idx_union_type (union_type),
  INDEX idx_status (status),
  INDEX idx_location (country, state, district)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Union Members
CREATE TABLE union_members (
  id INT PRIMARY KEY AUTO_INCREMENT,
  union_id INT NOT NULL,
  user_id INT NOT NULL,
  member_id VARCHAR(50),
  member_type ENUM('member', 'director', 'staff', 'volunteer') DEFAULT 'member',
  designation VARCHAR(100),
  joining_date DATE,
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (union_id) REFERENCES union_organization(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_union_user (union_id, user_id),
  INDEX idx_union_id (union_id),
  INDEX idx_user_id (user_id),
  INDEX idx_member_type (member_type),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Union News & Events
CREATE TABLE union_news (
  id INT PRIMARY KEY AUTO_INCREMENT,
  union_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  news_type ENUM('news', 'event', 'notice', 'announcement') DEFAULT 'news',
  image VARCHAR(255),
  event_date DATE,
  status TINYINT DEFAULT 1,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (union_id) REFERENCES union_organization(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_union_id (union_id),
  INDEX idx_news_type (news_type),
  INDEX idx_status (status),
  INDEX idx_event_date (event_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SECTION 8: SHOP MODULE (E-COMMERCE)
-- ============================================

-- Shop Categories
CREATE TABLE shop_category (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(100) NOT NULL,
  parent_category_id INT,
  category_icon VARCHAR(255),
  description TEXT,
  status TINYINT DEFAULT 1,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_category_id) REFERENCES shop_category(id) ON DELETE SET NULL,
  INDEX idx_category_name (category_name),
  INDEX idx_parent_category_id (parent_category_id),
  INDEX idx_status (status),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Shop Products
CREATE TABLE shop_products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  category_id INT,
  product_name VARCHAR(255) NOT NULL,
  product_description TEXT,
  product_image VARCHAR(255),
  price DECIMAL(10, 2) NOT NULL,
  discount_price DECIMAL(10, 2),
  stock_quantity INT DEFAULT 0,
  sku VARCHAR(100),
  shop_type ENUM('shop', 'local', 'resale', 'brand', 'wholesale', 'ecoshop') DEFAULT 'shop',
  country INT,
  state INT,
  district INT,
  rating DECIMAL(3, 2) DEFAULT 0.00,
  total_reviews INT DEFAULT 0,
  total_sales INT DEFAULT 0,
  status TINYINT DEFAULT 1,
  featured TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES shop_category(id) ON DELETE SET NULL,
  FOREIGN KEY (country) REFERENCES country_tbl(id) ON DELETE SET NULL,
  FOREIGN KEY (state) REFERENCES state_tbl(id) ON DELETE SET NULL,
  FOREIGN KEY (district) REFERENCES district_tbl(id) ON DELETE SET NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_category_id (category_id),
  INDEX idx_shop_type (shop_type),
  INDEX idx_status (status),
  INDEX idx_featured (featured),
  INDEX idx_price (price),
  INDEX idx_location (country, state, district),
  FULLTEXT idx_search (product_name, product_description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Shop Product Images
CREATE TABLE shop_product_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  image_path VARCHAR(255),
  is_primary TINYINT DEFAULT 0,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES shop_products(id) ON DELETE CASCADE,
  INDEX idx_product_id (product_id),
  INDEX idx_is_primary (is_primary)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Shop Orders
CREATE TABLE shop_orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  discount_amount DECIMAL(10, 2) DEFAULT 0.00,
  tax_amount DECIMAL(10, 2) DEFAULT 0.00,
  shipping_amount DECIMAL(10, 2) DEFAULT 0.00,
  final_amount DECIMAL(10, 2) NOT NULL,
  payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
  order_status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  shipping_address TEXT,
  billing_address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_order_number (order_number),
  INDEX idx_payment_status (payment_status),
  INDEX idx_order_status (order_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Shop Order Items
CREATE TABLE shop_order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES shop_orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES shop_products(id) ON DELETE CASCADE,
  INDEX idx_order_id (order_id),
  INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SECTION 9: MEDIA MODULE
-- ============================================

-- Media Categories
CREATE TABLE media_category (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(100) NOT NULL,
  media_type ENUM('tv', 'radio', 'epaper', 'magazine', 'web', 'youtube') NOT NULL,
  description TEXT,
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_category_name (category_name),
  INDEX idx_media_type (media_type),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Media Content
CREATE TABLE media_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  category_id INT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content_type ENUM('video', 'audio', 'article', 'image', 'live') NOT NULL,
  media_url VARCHAR(255),
  thumbnail VARCHAR(255),
  duration INT,
  views INT DEFAULT 0,
  likes INT DEFAULT 0,
  status TINYINT DEFAULT 1,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES media_category(id) ON DELETE SET NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_category_id (category_id),
  INDEX idx_content_type (content_type),
  INDEX idx_status (status),
  INDEX idx_published_at (published_at),
  INDEX idx_views (views),
  FULLTEXT idx_search (title, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SECTION 10: GALLERY MANAGEMENT
-- ============================================

-- Main Gallery Albums
CREATE TABLE gallery_list (
  gallery_id INT PRIMARY KEY AUTO_INCREMENT,
  gallery_name VARCHAR(255) NOT NULL,
  gallery_description TEXT,
  group_id INT,
  cover_image VARCHAR(255),
  total_images INT DEFAULT 0,
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES group_create(id) ON DELETE CASCADE,
  INDEX idx_group_id (group_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Gallery Images
CREATE TABLE gallery_images_master (
  image_id INT PRIMARY KEY AUTO_INCREMENT,
  gallery_id INT NOT NULL,
  image_name VARCHAR(255) NOT NULL,
  image_description TEXT,
  group_id INT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (gallery_id) REFERENCES gallery_list(gallery_id) ON DELETE CASCADE,
  FOREIGN KEY (group_id) REFERENCES group_create(id) ON DELETE CASCADE,
  INDEX idx_gallery_id (gallery_id),
  INDEX idx_group_id (group_id),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- God/Temple Gallery Albums
CREATE TABLE god_gallery_list (
  gallery_id INT PRIMARY KEY AUTO_INCREMENT,
  gallery_name VARCHAR(255) NOT NULL,
  gallery_description TEXT,
  user_id INT,
  cover_image VARCHAR(255),
  total_images INT DEFAULT 0,
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- God/Temple Gallery Images
CREATE TABLE god_gallery_images_master (
  image_id INT PRIMARY KEY AUTO_INCREMENT,
  gallery_id INT NOT NULL,
  image_name VARCHAR(255) NOT NULL,
  image_description TEXT,
  user_id INT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (gallery_id) REFERENCES god_gallery_list(gallery_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_gallery_id (gallery_id),
  INDEX idx_user_id (user_id),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SECTION 11: CONTENT MANAGEMENT (CMS)
-- ============================================

-- About Us
CREATE TABLE about (
  id INT PRIMARY KEY AUTO_INCREMENT,
  group_id INT,
  image VARCHAR(255),
  title VARCHAR(255),
  content TEXT,
  tag_line VARCHAR(255),
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES group_create(id) ON DELETE CASCADE,
  INDEX idx_group_id (group_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Newsroom
CREATE TABLE newsroom (
  id INT PRIMARY KEY AUTO_INCREMENT,
  group_id INT,
  image VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  tag_line VARCHAR(255),
  published_date DATE,
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES group_create(id) ON DELETE CASCADE,
  INDEX idx_group_id (group_id),
  INDEX idx_status (status),
  INDEX idx_published_date (published_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Events
CREATE TABLE `events` (
  id INT PRIMARY KEY AUTO_INCREMENT,
  group_id INT,
  image VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  event_date DATE,
  event_time TIME,
  location VARCHAR(255),
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES group_create(id) ON DELETE CASCADE,
  INDEX idx_group_id (group_id),
  INDEX idx_status (status),
  INDEX idx_event_date (event_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Careers/Jobs
CREATE TABLE careers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  group_id INT,
  job_title VARCHAR(255) NOT NULL,
  job_description TEXT,
  requirements TEXT,
  location VARCHAR(255),
  job_type ENUM('full-time', 'part-time', 'contract', 'internship') DEFAULT 'full-time',
  experience_required VARCHAR(50),
  salary_range VARCHAR(100),
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES group_create(id) ON DELETE CASCADE,
  INDEX idx_group_id (group_id),
  INDEX idx_status (status),
  INDEX idx_job_type (job_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Job Applications
CREATE TABLE apply_job_now (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100),
  email VARCHAR(254) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  franchise_country INT,
  resume_path VARCHAR(255),
  cover_letter TEXT,
  career_id INT,
  status ENUM('pending', 'shortlisted', 'interviewed', 'rejected', 'hired') DEFAULT 'pending',
  reviewed_by INT,
  reviewed_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (franchise_country) REFERENCES country_tbl(id) ON DELETE SET NULL,
  FOREIGN KEY (career_id) REFERENCES careers(id) ON DELETE CASCADE,
  FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_email (email),
  INDEX idx_career_id (career_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Clients/Partners
CREATE TABLE clients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  group_id INT,
  client_name VARCHAR(255) NOT NULL,
  client_logo VARCHAR(255),
  description TEXT,
  website VARCHAR(255),
  display_order INT DEFAULT 0,
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES group_create(id) ON DELETE CASCADE,
  INDEX idx_group_id (group_id),
  INDEX idx_status (status),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Milestones
CREATE TABLE milestones (
  id INT PRIMARY KEY AUTO_INCREMENT,
  group_id INT,
  milestone_title VARCHAR(255) NOT NULL,
  milestone_description TEXT,
  milestone_date DATE,
  image VARCHAR(255),
  display_order INT DEFAULT 0,
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES group_create(id) ON DELETE CASCADE,
  INDEX idx_group_id (group_id),
  INDEX idx_status (status),
  INDEX idx_milestone_date (milestone_date),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Testimonials
CREATE TABLE testimonials (
  id INT PRIMARY KEY AUTO_INCREMENT,
  group_id INT,
  name VARCHAR(255) NOT NULL,
  designation VARCHAR(255),
  company VARCHAR(255),
  image VARCHAR(255),
  testimonial TEXT NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  display_order INT DEFAULT 0,
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES group_create(id) ON DELETE CASCADE,
  INDEX idx_group_id (group_id),
  INDEX idx_status (status),
  INDEX idx_rating (rating),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact Information
CREATE TABLE contact (
  id INT PRIMARY KEY AUTO_INCREMENT,
  group_id INT,
  address TEXT,
  email VARCHAR(254),
  contact_number VARCHAR(20),
  alternate_number VARCHAR(20),
  whatsapp_number VARCHAR(20),
  map_location TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES group_create(id) ON DELETE CASCADE,
  INDEX idx_group_id (group_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact Form Submissions
CREATE TABLE contact_form (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100),
  email VARCHAR(254) NOT NULL,
  phone_number VARCHAR(20),
  subject VARCHAR(255),
  comment TEXT NOT NULL,
  status ENUM('new', 'read', 'replied', 'closed') DEFAULT 'new',
  replied_by INT,
  replied_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (replied_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Terms & Conditions
CREATE TABLE tnc_details (
  id INT PRIMARY KEY AUTO_INCREMENT,
  group_id INT,
  tnc_content TEXT NOT NULL,
  version VARCHAR(20),
  effective_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES group_create(id) ON DELETE CASCADE,
  INDEX idx_group_id (group_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Privacy Policy
CREATE TABLE pnp_details (
  id INT PRIMARY KEY AUTO_INCREMENT,
  group_id INT,
  pnp_content TEXT NOT NULL,
  version VARCHAR(20),
  effective_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES group_create(id) ON DELETE CASCADE,
  INDEX idx_group_id (group_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copyright Information
CREATE TABLE copy_rights (
  id INT PRIMARY KEY AUTO_INCREMENT,
  content TEXT NOT NULL,
  year INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SECTION 12: CHAT & FEEDBACK SYSTEM
-- ============================================

-- Feedback & Suggestions (Chat Messages)
CREATE TABLE feedback_suggetions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  replyed_by INT,
  display_name VARCHAR(100),
  in_out ENUM('in', 'out') DEFAULT 'in',
  message TEXT NOT NULL,
  status TINYINT DEFAULT 0,
  is_read TINYINT DEFAULT 0,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (replyed_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_replyed_by (replyed_by),
  INDEX idx_status (status),
  INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User Feedback Submissions
CREATE TABLE feedback_suggetions_user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  feedback_type ENUM('feedback', 'suggestion', 'complaint', 'query') DEFAULT 'feedback',
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status ENUM('pending', 'in-progress', 'resolved', 'closed') DEFAULT 'pending',
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_feedback_type (feedback_type),
  INDEX idx_status (status),
  INDEX idx_priority (priority)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SECTION 13: GOD/TEMPLE MODULE
-- ============================================

-- God/Temple Description
CREATE TABLE god_description (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  temple_name VARCHAR(255),
  deity_name VARCHAR(255),
  description TEXT,
  history TEXT,
  significance TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_temple (user_id),
  INDEX idx_temple_name (temple_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- God/Temple Photos
CREATE TABLE god_photo (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  photo_path VARCHAR(255),
  photo_type ENUM('main', 'deity', 'architecture', 'festival', 'other') DEFAULT 'other',
  caption VARCHAR(255),
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_photo_type (photo_type),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Temple Timings
CREATE TABLE god_timings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'All Days'),
  opening_time TIME,
  closing_time TIME,
  special_timings VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Temple Festivals
CREATE TABLE god_festivals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  festival_name VARCHAR(255) NOT NULL,
  festival_date DATE,
  description TEXT,
  duration_days INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_festival_date (festival_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Temple Pooja/Services
CREATE TABLE god_pooja (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  pooja_name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  duration VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- How to Reach Temple
CREATE TABLE god_how_to_reach (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  transport_mode ENUM('road', 'rail', 'air', 'other') NOT NULL,
  directions TEXT,
  distance VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Must Visit Places Near Temple
CREATE TABLE god_must_visit (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  place_name VARCHAR(255) NOT NULL,
  description TEXT,
  distance VARCHAR(50),
  image VARCHAR(255),
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Nearest Places to Temple
CREATE TABLE god_nearest_places (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  place_name VARCHAR(255) NOT NULL,
  place_type ENUM('hotel', 'restaurant', 'hospital', 'atm', 'parking', 'other') DEFAULT 'other',
  distance VARCHAR(50),
  contact_number VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_place_type (place_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SECTION 14: MYADS MODULE
-- ============================================

-- Myads About
CREATE TABLE myads_about (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image VARCHAR(255),
  title VARCHAR(255),
  content TEXT,
  tag_line VARCHAR(255),
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Myads Product Categories
CREATE TABLE myads_product_category (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(255) NOT NULL,
  category_icon VARCHAR(255),
  description TEXT,
  status TINYINT DEFAULT 1,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category_name (category_name),
  INDEX idx_status (status),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Myads Product Sub-Categories
CREATE TABLE myads_product_sub_category (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT NOT NULL,
  sub_category_name VARCHAR(255) NOT NULL,
  description TEXT,
  status TINYINT DEFAULT 1,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES myads_product_category(id) ON DELETE CASCADE,
  INDEX idx_category_id (category_id),
  INDEX idx_status (status),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Myads Products
CREATE TABLE myads_product (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT,
  sub_category_id INT,
  product_name VARCHAR(255) NOT NULL,
  product_description TEXT,
  product_image VARCHAR(255),
  price DECIMAL(10, 2),
  features TEXT,
  specifications TEXT,
  status TINYINT DEFAULT 1,
  featured TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES myads_product_category(id) ON DELETE SET NULL,
  FOREIGN KEY (sub_category_id) REFERENCES myads_product_sub_category(id) ON DELETE SET NULL,
  INDEX idx_category_id (category_id),
  INDEX idx_sub_category_id (sub_category_id),
  INDEX idx_status (status),
  INDEX idx_featured (featured),
  FULLTEXT idx_search (product_name, product_description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Myads Gallery
CREATE TABLE myads_gallery_list (
  gallery_id INT PRIMARY KEY AUTO_INCREMENT,
  gallery_name VARCHAR(255) NOT NULL,
  gallery_description TEXT,
  group_id INT,
  cover_image VARCHAR(255),
  total_images INT DEFAULT 0,
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES group_create(id) ON DELETE CASCADE,
  INDEX idx_group_id (group_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Myads Gallery Images
CREATE TABLE myads_gallery_images_master (
  image_id INT PRIMARY KEY AUTO_INCREMENT,
  gallery_id INT NOT NULL,
  image_name VARCHAR(255) NOT NULL,
  image_description TEXT,
  group_id INT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (gallery_id) REFERENCES myads_gallery_list(gallery_id) ON DELETE CASCADE,
  FOREIGN KEY (group_id) REFERENCES group_create(id) ON DELETE CASCADE,
  INDEX idx_gallery_id (gallery_id),
  INDEX idx_group_id (group_id),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SECTION 15: SYSTEM & AUDIT TABLES
-- ============================================

-- Activity Logs (Audit Trail)
CREATE TABLE activity_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id INT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  changes JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_action (action),
  INDEX idx_entity (entity_type, entity_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Notifications
CREATE TABLE notifications (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  notification_type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
  is_read TINYINT DEFAULT 0,
  link VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_is_read (is_read),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- System Settings
CREATE TABLE system_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
  description TEXT,
  is_public TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_setting_key (setting_key),
  INDEX idx_is_public (is_public)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- END OF SCHEMA
-- ============================================

-- Create views for reporting (CRM-style)

-- User Summary View
CREATE OR REPLACE VIEW vw_user_summary AS
SELECT
  u.id,
  u.username,
  u.email,
  u.first_name,
  u.last_name,
  u.display_name,
  u.active,
  u.created_on,
  u.last_login,
  gc.name AS group_name,
  gc.apps_name,
  GROUP_CONCAT(g.name) AS roles,
  urf.country,
  c.country_name,
  urf.state,
  s.state_name,
  urf.gender,
  urf.dob
FROM users u
LEFT JOIN group_create gc ON u.group_id = gc.id
LEFT JOIN users_groups ug ON u.id = ug.user_id
LEFT JOIN `groups` g ON ug.group_id = g.id
LEFT JOIN user_registration_form urf ON u.id = urf.user_id
LEFT JOIN country_tbl c ON urf.country = c.id
LEFT JOIN state_tbl s ON urf.state = s.id
GROUP BY u.id;

-- Service Provider Summary View
CREATE OR REPLACE VIEW vw_service_providers AS
SELECT
  ns.id,
  ns.service_name,
  ns.service_type,
  u.username,
  u.email,
  u.phone,
  nc.category_name,
  ns.price,
  ns.rating,
  ns.total_reviews,
  c.country_name,
  s.state_name,
  d.district_name,
  ns.status,
  ns.created_at
FROM needy_services ns
JOIN users u ON ns.user_id = u.id
LEFT JOIN needy_category nc ON ns.category_id = nc.id
LEFT JOIN country_tbl c ON ns.country = c.id
LEFT JOIN state_tbl s ON ns.state = s.id
LEFT JOIN district_tbl d ON ns.district = d.id;

-- Sales Summary View
CREATE OR REPLACE VIEW vw_sales_summary AS
SELECT
  so.id,
  so.order_number,
  u.username,
  u.email,
  so.total_amount,
  so.final_amount,
  so.payment_status,
  so.order_status,
  COUNT(soi.id) AS total_items,
  so.created_at,
  so.updated_at
FROM shop_orders so
JOIN users u ON so.user_id = u.id
LEFT JOIN shop_order_items soi ON so.id = soi.order_id
GROUP BY so.id;

-- Database schema creation completed successfully!

