--
-- Table structure for table `adpage`
--

CREATE TABLE IF NOT EXISTS `adpage` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `cost` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

--
-- Dumping data for table `adpage`
--

INSERT INTO `adpage` (`id`, `name`, `description`, `cost`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Contact Us', 'contact us desc', 33, 'active', '2016-02-09 14:14:13', '2016-02-09 18:07:34'),
(2, 'Home ', 'home desc', 2352, 'active', '2016-02-09 12:38:37', '2016-02-09 12:38:37'),
(3, 'Terms & Conditions', '5686', 34, 'inactive', '2016-02-09 12:38:52', '2016-02-09 16:01:52');
