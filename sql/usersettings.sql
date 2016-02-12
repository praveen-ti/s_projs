--
-- Table structure for table `usersettings`
--

CREATE TABLE IF NOT EXISTS `usersettings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `searchProfileStatus` varchar(255) DEFAULT NULL,
  `sensualAdStatus` varchar(255) DEFAULT NULL,
  `autoLogin` varchar(255) DEFAULT NULL,
  `setOffLine` varchar(255) DEFAULT NULL,
  `favouriteMailStatus` varchar(255) DEFAULT NULL,
  `provisitMailStatus` varchar(255) DEFAULT NULL,
  `newMailStatus` varchar(255) DEFAULT NULL,
  `pollMailStatus` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

