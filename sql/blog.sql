
--
-- Table structure for table `blog`
--

CREATE TABLE IF NOT EXISTS `blog` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `authorId` int(11) DEFAULT NULL,
  `authorType` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `blogStatus` varchar(255) DEFAULT NULL,
  `approvalStatus` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `authorId`, `authorType`, `title`, `description`, `blogStatus`, `approvalStatus`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'user', 'how are u', 'Description', 'inactive', 'pending', '2016-01-20 15:44:21', '2016-02-13 11:44:43'),
(2, 1, 'user', 'blog1-title', 'hdsdffsd', 'inactive', 'approved', '2016-01-20 15:48:34', '2016-02-12 16:49:47'),
