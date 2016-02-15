--
-- Table structure for table `cmspage`
--

CREATE TABLE IF NOT EXISTS `cmspage` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pageName` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `cmspage`
--

INSERT INTO `cmspage` (`id`, `pageName`, `content`, `status`, `createdAt`, `updatedAt`) VALUES
(6, 'About Us dfggghh dfhddf', 'Amesh Ca', 'active', '2016-02-08 15:02:03', '2016-02-09 17:33:24'),
(7, 'tyuyuyfguhfj', 'tiytyiyt 53624+56 bngnjfgnjgfnhjh', 'active', '2016-02-08 16:41:24', '2016-02-09 19:51:36');
