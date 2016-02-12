--
-- Table structure for table `admin_privilege_log`
--

CREATE TABLE IF NOT EXISTS `admin_privilege_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `adminId` int(11) DEFAULT NULL,
  `privilegeId` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=189 ;

--
-- Dumping data for table `admin_privilege_log`
--
