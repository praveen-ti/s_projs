--
-- Table structure for table `subscription_package_log`
--

CREATE TABLE IF NOT EXISTS `subscription_package_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `subscriptionPackageId` int(11) NOT NULL,
  `subscribedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
