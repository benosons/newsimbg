/*
 Navicat Premium Data Transfer

 Source Server         : phpmyadmin
 Source Server Type    : MySQL
 Source Server Version : 80030 (8.0.30)
 Source Host           : localhost:3306
 Source Schema         : newsimbg

 Target Server Type    : MySQL
 Target Server Version : 80030 (8.0.30)
 File Encoding         : 65001

 Date: 30/08/2023 14:22:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for m_user
-- ----------------------------
DROP TABLE IF EXISTS `m_user`;
CREATE TABLE `m_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `username` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `id_role` int NOT NULL,
  `status` tinyint NULL DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  `create_by` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `update_by` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of m_user
-- ----------------------------
INSERT INTO `m_user` VALUES (1, 'super admin', 're.sonjaya@gmail.com', 'superadmin', '827ccb0eea8a706c4c34a16891f84e7b', 100, 1, '2023-07-16 16:43:24', NULL, '1', '1');
INSERT INTO `m_user` VALUES (3, 'benosons', 'beno.sons@gmail.com', 'benosons', 'd1bb80a489b51ed9c862380fbcdf7ea3', 200, 1, '2023-07-16 21:21:20', '2023-07-16 21:21:20', '1', '1');
INSERT INTO `m_user` VALUES (8, 'Operator Teknis', 'opteknis@simbg.pu.go.id', 'opteknis', '827ccb0eea8a706c4c34a16891f84e7b', 20, 1, '2023-08-29 21:51:13', '2023-08-29 21:51:13', '1', '1');
INSERT INTO `m_user` VALUES (9, 'Pengawas Teknis', 'pengawastekis@simbg.pu.go.id', 'pengawasteknis', '827ccb0eea8a706c4c34a16891f84e7b', 30, 1, '2023-08-29 21:51:49', '2023-08-29 21:51:49', '1', '1');
INSERT INTO `m_user` VALUES (10, 'Kepala Dinas Teknis', 'kadintek@simbg.pu.go.id', 'kadintek', '827ccb0eea8a706c4c34a16891f84e7b', 40, 1, '2023-08-29 21:52:14', '2023-08-29 21:52:14', '1', '1');
INSERT INTO `m_user` VALUES (11, 'Operator Perizinan', 'opperizinan@simbg.pu.go.id', 'opperizinan', '827ccb0eea8a706c4c34a16891f84e7b', 50, 1, '2023-08-29 21:52:44', '2023-08-29 21:52:44', '1', '1');
INSERT INTO `m_user` VALUES (12, 'Pengawas Dinas Perizinan', 'pengawasperizinan@simbg.pu.go.id', 'pengawasperizinan', '827ccb0eea8a706c4c34a16891f84e7b', 60, 1, '2023-08-29 21:53:09', '2023-08-29 21:53:09', '1', '1');
INSERT INTO `m_user` VALUES (13, 'Kepala Dinas Perizinan', 'kadinperizinan@simbg.pu.go.id', 'kadinperizinan', '827ccb0eea8a706c4c34a16891f84e7b', 70, 1, '2023-08-29 21:53:38', '2023-08-29 21:53:38', '1', '1');
INSERT INTO `m_user` VALUES (14, 'Pemohon', 'pemohon@simbg.pu.go.id', 'pemohon', '827ccb0eea8a706c4c34a16891f84e7b', 10, 1, '2023-08-29 22:33:08', '2023-08-29 22:33:08', '1', '1');

SET FOREIGN_KEY_CHECKS = 1;
