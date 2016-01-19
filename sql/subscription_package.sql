--
-- Table structure for table `subscription_package`
--

CREATE TABLE IF NOT EXISTS `subscription_package` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` text,
  `cost` float NOT NULL DEFAULT '0',
  `validDays` int(11) NOT NULL,
  `status` enum('active','inactive','delete') NOT NULL DEFAULT 'active',
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
