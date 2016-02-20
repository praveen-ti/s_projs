--
-- Table structure for table `aduser`
--

CREATE TABLE IF NOT EXISTS `aduser` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `banner` varchar(255) DEFAULT NULL,
  `bannerType` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `adPageId` int(11) DEFAULT NULL,
  `adPositionId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `totalCost` int(11) DEFAULT NULL,
  `adStartDate` datetime DEFAULT NULL,
  `adEndDate` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

--
-- Dumping data for table `aduser`
--

INSERT INTO `aduser` (`id`, `banner`, `bannerType`, `status`, `adPageId`, `adPositionId`, `userId`, `totalCost`, `adStartDate`, `adEndDate`, `createdAt`, `updatedAt`) VALUES
(1, 'bannerImg', 'therapeutic', 'inactive', 1, 5, 1, 230, '2016-02-08 06:21:18', '2016-02-26 03:16:06', '2016-01-27 09:59:52', '2016-02-10 15:25:28'),
(2, 'bannerImg2', 'therapeutic', 'active', 1, 1, 1, 240, '2016-02-09 00:00:00', '2016-02-26 04:08:00', '2016-01-27 12:56:07', '2016-02-10 13:21:41');
