CREATE DATABASE IF NOT EXISTS collage_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE collage_db;


CREATE TABLE IF NOT EXISTS media (
id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255),
s3_key VARCHAR(1024) NOT NULL,
mime_type VARCHAR(255),
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- create a user (run as root or admin):
-- CREATE USER 'collage_user'@'%' IDENTIFIED BY 'strongpassword';
-- GRANT ALL PRIVILEGES ON collage_db.* TO 'collage_user'@'%';
-- FLUSH PRIVILEGES;
