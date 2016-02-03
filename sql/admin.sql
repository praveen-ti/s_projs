--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `adminType` varchar(255) DEFAULT NULL,
  `blockStatus` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `firstname`, `lastname`, `password`, `adminType`, `blockStatus`, `createdAt`, `updatedAt`) VALUES
(1, 'superadmin', 'Super', 'Admin', '0192023a7bbd73250516f069df18b500', 'super_admin', 'false', '2016-01-30 12:14:26', '2016-01-12 12:14:26'),
(2, 'subadmin', 'Sub', 'Admin', '0192023a7bbd73250516f069df18b500', 'sub', 'false', '2016-01-30 12:14:26', '2016-01-12 12:14:26');
