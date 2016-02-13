
--
-- Table structure for table `poll_details`
--

CREATE TABLE IF NOT EXISTS `poll_details` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pollsId` int(11) DEFAULT NULL,
  `pollAnswer` varchar(255) DEFAULT NULL,
  `pollComment` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `approvalStatus` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

