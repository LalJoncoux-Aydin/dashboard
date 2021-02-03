CREATE DATABASE IF NOT EXISTS dashboard_db CHARACTER SET 'utf8';

SHOW WARNINGS;

CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON * . * TO 'user'@'localhost';
FLUSH PRIVILEGES;

USE dashboard_db

CREATE TABLE IF NOT EXISTS accounts (
    user_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR (120) NOT NULL,
    password VARCHAR (128) NOT NULL,
    PRIMARY KEY (user_id)
)
ENGINE=INNODB;

SHOW TABLES;
DESCRIBE accounts;