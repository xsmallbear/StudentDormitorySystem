-- 创建数据库
CREATE DATABASE IF NOT EXISTS dormitory_management_system;
USE dormitory_management_system;

-- 创建楼宇表
CREATE TABLE IF NOT EXISTS Buildings (
    building_id INT PRIMARY KEY,
    building_name VARCHAR(50) NOT NULL
);

-- 创建宿舍表
CREATE TABLE IF NOT EXISTS Dormitories (
    dormitory_id INT PRIMARY KEY AUTO_INCREMENT,
    dormitory_name VARCHAR(50) NOT NULL,
    dormitory_floor INT NOT NULL,
    dormitory_type VARCHAR(50) NOT NULL,
    building_id INT NOT NULL,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建院系表
CREATE TABLE IF NOT EXISTS Departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_nane VARCHAR(50) NOT NULL,
    department_person VARCHAR(50) NOT NULL,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建学生表
CREATE TABLE IF NOT EXISTS Students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    student_nane VARCHAR(255) NOT NULL,
    dormitory_id INT NOT NULL,
    department_id INT NOT NULL,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建电费使用表
CREATE TABLE IF NOT EXISTS ElectricityUsage (
    usage_id INT PRIMARY KEY AUTO_INCREMENT,
    dormitory_id INT NOT NULL,
    usage_date DATE,
    consumption DECIMAL(10, 2),
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建管理员表
CREATE TABLE IF NOT EXISTS Managers (
    manager_id INT PRIMARY KEY AUTO_INCREMENT,
    manager_username VARCHAR(50) NOT NULL,
    manager_password_hash VARCHAR(255) NOT NULL,
    manager_salt VARCHAR(50) NOT NULL,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建访客表
CREATE TABLE IF NOT EXISTS Visitors (
    visitor_id INT PRIMARY KEY AUTO_INCREMENT,
    visitor_name VARCHAR(50) NOT NULL,
    visitor_id_card VARCHAR(20) NOT NULL,
    visit_datetime DATETIME NOT NULL,
    student_id INT,
    visit_purpose VARCHAR(100),
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建财产表
CREATE TABLE IF NOT EXISTS Assets (
    asset_id INT PRIMARY KEY AUTO_INCREMENT,
    asset_name VARCHAR(50) NOT NULL,
    asset_model VARCHAR(50) NOT NULL,
    asset_status VARCHAR(50) NOT NULL,
    department_id INT NOT NULL,
    dormitory_id INT NOT NULL,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建报修表
CREATE TABLE IF NOT EXISTS Repairs (
    repair_id INT PRIMARY KEY AUTO_INCREMENT,
    dormitory_id INT NOT NULL,
    repair_purpose VARCHAR(100) NOT NULL,
    report_date DATE NOT NULL,
    asset_status VARCHAR(50),
    repair_date DATE,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建报废记录表
CREATE TABLE IF NOT EXISTS DisposalRecords (
    disposal_id INT PRIMARY KEY AUTO_INCREMENT,
    asset_id INT NOT NULL,
    asset_status VARCHAR(50),
    disposal_purpose VARCHAR(100) NOT NULL,
    disposal_date DATE NOT NULL,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
