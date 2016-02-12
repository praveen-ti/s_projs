--
-- Table structure for table `admin_privilege`
--

CREATE TABLE IF NOT EXISTS `admin_privilege` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `admin_privilege`
--

INSERT INTO `admin_privilege` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Home Page Edit', 'fsasafsasa', '2016-02-05 16:54:13', '2016-02-05 16:54:13'),
(2, 'AboutUs page', 'fhfdfdhf', '2016-02-05 16:54:22', '2016-02-05 16:54:22'),
(3, 'Terms & Conditions', 'wtwwetewte', '2016-02-05 00:00:00', '2016-02-05 00:00:00');
