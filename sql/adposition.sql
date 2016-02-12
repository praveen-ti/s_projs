--
-- Table structure for table `adposition`
--

CREATE TABLE IF NOT EXISTS `adposition` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `cost` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `adposition`
--

INSERT INTO `adposition` (`id`, `name`, `description`, `cost`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Header', 'Position1 desc', 345, 'inactive', '2016-01-25 19:35:17', '2016-02-09 18:05:27'),
(2, 'footer--1', 'PositionDescri---1', 10, 'active', '2016-01-25 19:35:23', '2016-02-09 18:05:30'),
(3, 'sidebar--1', 'PositionDescri---1', 10, 'active', '2016-01-25 19:35:30', '2016-02-09 18:05:31');
