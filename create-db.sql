-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/WETh9K
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.
CREATE DATABASE IF NOT EXISTS `my-wine-cellar`;
USE `my-wine-cellar`;

CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT  ,
    `firstname` VARCHAR(255)  NOT NULL ,
    `lastname` VARCHAR(255)  NOT NULL ,
    `email` VARCHAR(255)  NOT NULL ,
    `password` VARCHAR(500)  NOT NULL ,
    PRIMARY KEY (
        `id`
    ) ,
    UNIQUE (`email`)
);

CREATE TABLE `wine` (
    `id` INT AUTO_INCREMENT NOT NULL ,
    `name` VARCHAR(255)  NOT NULL ,
    `type_id` INT  NOT NULL ,
    `region_id` INT  NOT NULL ,
    `year` YEAR  NOT NULL ,
    PRIMARY KEY (
        `id`
    ) ,
    UNIQUE (`name`, `type_id`, `region_id`, `year`)
);

CREATE TABLE `type` (
    `id` INT AUTO_INCREMENT NOT NULL ,
    `name` VARCHAR(255)  NOT NULL ,
    PRIMARY KEY (
        `id`
    ),
    UNIQUE (`name`)
);

CREATE TABLE `region` (
    `id` INT AUTO_INCREMENT NOT NULL ,
    `name` VARCHAR(255)  NOT NULL ,
    PRIMARY KEY (
        `id`
    ),
    UNIQUE (`name`)
);

CREATE TABLE `user_wine` (
    `id` INT AUTO_INCREMENT NOT NULL ,
    `wine_id` INT  NOT NULL ,
    `user_id` INT  NOT NULL ,
    `limit_date` YEAR ,
    `best_date` YEAR ,
    `number` INT  NOT NULL ,
    PRIMARY KEY (
        `id`
    ),
    UNIQUE (`wine_id`, `user_id`)
);

ALTER TABLE `wine` ADD CONSTRAINT `fk_wine_type_id` FOREIGN KEY(`type_id`)
REFERENCES `type` (`id`);

ALTER TABLE `wine` ADD CONSTRAINT `fk_wine_region_id` FOREIGN KEY(`region_id`)
REFERENCES `region` (`id`);

ALTER TABLE `user_wine` ADD CONSTRAINT `fk_user_wine_wine_id` FOREIGN KEY(`wine_id`)
REFERENCES `wine` (`id`);

ALTER TABLE `user_wine` ADD CONSTRAINT `fk_user_wine_user_id` FOREIGN KEY(`user_id`)
REFERENCES `user` (`id`);

CREATE INDEX `idx_type` ON `type` (`name`);
CREATE INDEX `idx_region` ON `region` (`name`);
CREATE INDEX `idx_user_wine` ON `user_wine` (`wine_id`, `user_id`);