--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `passwordResetKey` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `profilePic` varchar(255) DEFAULT NULL,
  `emailVerificationStatus` enum('verified','notverified') NOT NULL DEFAULT 'notverified',
  `emailVerificationKey` varchar(255) DEFAULT NULL,
  `subscriptionPackageId` varchar(255) DEFAULT NULL,
  `subscriptionType` varchar(255) DEFAULT NULL,
  `subscriptionExpiredDate` datetime DEFAULT NULL,
  `adPackageId` int(11) DEFAULT NULL,
  `adExpiredDate` datetime DEFAULT NULL,
  `massageFrequency` enum('daily','weekly','monthly') NOT NULL DEFAULT 'weekly',
  `referralBenefit` enum('notable','claimable','claimed') NOT NULL DEFAULT 'notable',
  `blacklisted` enum('no','yes') NOT NULL DEFAULT 'no',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
