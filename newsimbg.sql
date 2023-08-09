/*
 Navicat Premium Data Transfer

 Source Server         : MYSQL-LOCAL
 Source Server Type    : MySQL
 Source Server Version : 50733 (5.7.33)
 Source Host           : localhost:3306
 Source Schema         : new_simbg

 Target Server Type    : MySQL
 Target Server Version : 50733 (5.7.33)
 File Encoding         : 65001

 Date: 09/08/2023 23:38:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for m_role
-- ----------------------------
DROP TABLE IF EXISTS `m_role`;
CREATE TABLE `m_role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NULL DEFAULT NULL,
  `role` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `status` tinyint(4) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of m_role
-- ----------------------------
INSERT INTO `m_role` VALUES (1, 100, 'Super Administrator', 1);
INSERT INTO `m_role` VALUES (2, 200, 'Administrator', 1);
INSERT INTO `m_role` VALUES (3, 10, 'Pemohon', 1);
INSERT INTO `m_role` VALUES (4, 20, 'Operator Teknis', 1);
INSERT INTO `m_role` VALUES (5, 30, 'Pengawas Teknis', 1);
INSERT INTO `m_role` VALUES (6, 40, 'Kepala Dinas Teknis', 1);
INSERT INTO `m_role` VALUES (7, 50, 'Dinas Perizinan', 1);
INSERT INTO `m_role` VALUES (8, 60, 'Pengawas Dinas Perizinan', 1);
INSERT INTO `m_role` VALUES (9, 70, 'Kepala Dinas', 1);

-- ----------------------------
-- Table structure for m_user
-- ----------------------------
DROP TABLE IF EXISTS `m_user`;
CREATE TABLE `m_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `username` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `id_role` int(11) NOT NULL,
  `status` tinyint(4) NULL DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  `create_by` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `update_by` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of m_user
-- ----------------------------
INSERT INTO `m_user` VALUES (1, 'super admin', 're.sonjaya@gmail.com', 'superadmin', '827ccb0eea8a706c4c34a16891f84e7b', 100, 1, '2023-07-16 16:43:24', NULL, '1', '1');
INSERT INTO `m_user` VALUES (3, 'benosons', 'beno.sons@gmail.com', 'benosons', 'd1bb80a489b51ed9c862380fbcdf7ea3', 200, 1, '2023-07-16 21:21:20', '2023-07-16 21:21:20', '1', '1');

SET FOREIGN_KEY_CHECKS = 1;
