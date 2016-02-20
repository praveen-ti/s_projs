--
-- Table structure for table `blog_comment`
--

CREATE TABLE IF NOT EXISTS `blog_comment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `blogId` int(11) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `approvalStatus` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `blog_comment`
--

INSERT INTO `blog_comment` (`id`, `blogId`, `comment`, `userId`, `approvalStatus`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Good One', 1, 'approved', '2016-01-20 19:49:17', '2016-02-12 23:50:30'),
(2, 1, 'Expect More', 1, 'approved', '2016-01-20 19:49:17', '2016-02-12 23:50:30');
