
--
-- Table structure for table `admintoken`
--

CREATE TABLE IF NOT EXISTS `admintoken` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `adminId` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `expiryDate` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `admintoken`
--
