-- MySQL Script generated by MySQL Workbench
-- 06/08/18 11:10:25
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema MenuServerDB
-- -----------------------------------------------------
-- 4S店CRM系统数据库
DROP SCHEMA IF EXISTS `MenuServerDB` ;

-- -----------------------------------------------------
-- Schema MenuServerDB
--
-- 4S店CRM系统数据库
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `MenuServerDB` DEFAULT CHARACTER SET utf8 ;
USE `MenuServerDB` ;

-- -----------------------------------------------------
-- Table `MenuServerDB`.`MenuOrganizations`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MenuServerDB`.`MenuOrganizations` ;

CREATE TABLE IF NOT EXISTS `MenuServerDB`.`MenuOrganizations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL COMMENT '名字。',
  `description` VARCHAR(200) NULL COMMENT '描述。',
  `status` VARCHAR(45) NULL COMMENT '状态。',
  `ownerHref` VARCHAR(200) NULL COMMENT '拥有者链接。',
  `ownerUUID` VARCHAR(45) NULL COMMENT '拥有者UUID',
  `ownerType` CHAR(20) NULL COMMENT '拥有者类型，application:应用，businessFormat:业态。',
  `version` CHAR(30) NULL COMMENT '当前系统的菜单版本。',
  `createdAt` TIMESTAMP(0) NULL,
  `modifiedAt` TIMESTAMP(0) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC),
  UNIQUE INDEX `applicationUUID_UNIQUE` (`ownerUUID` ASC))
ENGINE = InnoDB
COMMENT = '菜单组织。';


-- -----------------------------------------------------
-- Table `MenuServerDB`.`MenuGroups`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MenuServerDB`.`MenuGroups` ;

CREATE TABLE IF NOT EXISTS `MenuServerDB`.`MenuGroups` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(45) NULL COMMENT '主键。',
  `name` VARCHAR(80) NULL,
  `description` VARCHAR(100) NULL COMMENT '描述。',
  `uiOrder` INT NULL COMMENT '排序号。',
  `upLevelMenuGroupUUID` VARCHAR(45) NULL COMMENT '上级菜单分组UUID.',
  `status` VARCHAR(45) NULL COMMENT '状态。',
  `menuOrganizationUUID` VARCHAR(45) NULL COMMENT '组织UUID.',
  `createdAt` TIMESTAMP(0) NULL,
  `modifiedAt` TIMESTAMP(0) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC),
  INDEX `menuGroup_organizaitonUUID_idx_idx` (`menuOrganizationUUID` ASC))
ENGINE = InnoDB
COMMENT = '菜单分组。';


-- -----------------------------------------------------
-- Table `MenuServerDB`.`MetaMenus`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MenuServerDB`.`MetaMenus` ;

CREATE TABLE IF NOT EXISTS `MenuServerDB`.`MetaMenus` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(30) NULL,
  `name` VARCHAR(45) NULL COMMENT '名称。',
  `menuId` VARCHAR(45) NULL COMMENT '菜单ID.',
  `menuOrganizationUUID` CHAR(30) NULL COMMENT '拥有者菜单组织UUID,此处一般是指应用系统。',
  `status` CHAR(20) NULL COMMENT '状态。',
  `createdAt` TIMESTAMP(0) NULL COMMENT '创建时间。',
  `modifiedAt` TIMESTAMP(0) NULL COMMENT '修改时间。',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC),
  UNIQUE INDEX `menuId_UNIQUE` (`menuId` ASC))
ENGINE = InnoDB
COMMENT = '元菜单。';


-- -----------------------------------------------------
-- Table `MenuServerDB`.`Menus`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MenuServerDB`.`Menus` ;

CREATE TABLE IF NOT EXISTS `MenuServerDB`.`Menus` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL COMMENT '名称。',
  `description` VARCHAR(100) NULL COMMENT '描述。',
  `type` INT NULL COMMENT '0:功能菜单，1:主页菜单',
  `number` VARCHAR(45) NULL COMMENT '菜单编号。',
  `menuId` VARCHAR(45) NULL COMMENT '菜单ID.',
  `iconHref` VARCHAR(200) NULL COMMENT '图标链接。',
  `uiOrder` INT NULL COMMENT 'UI序号。',
  `menuGroupUUID` VARCHAR(45) NULL COMMENT '所属菜单分组UUID.',
  `isValid` INT NULL COMMENT '是否有效，1为有效，0为失效。',
  `status` VARCHAR(45) NULL COMMENT '状态。',
  `menuOrganizationUUID` VARCHAR(45) NULL COMMENT '应用UUID.',
  `createdAt` TIMESTAMP(0) NULL,
  `modifiedAt` TIMESTAMP(0) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC),
  INDEX `menuGroupUUID_idx_idx` (`menuGroupUUID` ASC))
ENGINE = InnoDB
COMMENT = '菜单 。';


-- -----------------------------------------------------
-- Table `MenuServerDB`.`MetaOperators`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MenuServerDB`.`MetaOperators` ;

CREATE TABLE IF NOT EXISTS `MenuServerDB`.`MetaOperators` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(30) NULL,
  `name` VARCHAR(45) NULL COMMENT '名称。',
  `operatorId` VARCHAR(45) NULL COMMENT '操作ID.',
  `metaMenuUUID` CHAR(30) NULL COMMENT '所属的元菜单UUID.',
  `status` CHAR(20) NULL,
  `createdAt` TIMESTAMP(0) NULL COMMENT '创建时间。',
  `modifiedAt` TIMESTAMP(0) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC),
  UNIQUE INDEX `operatorId_UNIQUE` (`operatorId` ASC))
ENGINE = InnoDB
COMMENT = '元操作。';


-- -----------------------------------------------------
-- Table `MenuServerDB`.`Operators`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MenuServerDB`.`Operators` ;

CREATE TABLE IF NOT EXISTS `MenuServerDB`.`Operators` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL COMMENT '名称。',
  `operatorId` VARCHAR(45) NULL COMMENT '操作ID.',
  `uiOrder` INT NULL COMMENT 'UI序号。',
  `menuUUID` VARCHAR(45) NULL COMMENT '所属菜单UUID.',
  `isValid` INT NULL COMMENT '是否有效，1为有效，0为失效。',
  `status` VARCHAR(45) NULL COMMENT '状态。',
  `createdAt` TIMESTAMP(0) NULL,
  `modifiedAt` TIMESTAMP(0) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC),
  INDEX `menuUUID_idx_idx` (`menuUUID` ASC),
  INDEX `metaOperatorId_idx_idx` (`operatorId` ASC))
ENGINE = InnoDB
COMMENT = '操作。';


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
