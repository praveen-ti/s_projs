--
-- Table structure for table `video`
--

CREATE TABLE IF NOT EXISTS `video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `videoUrl` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `accessType` enum('private','public') NOT NULL DEFAULT 'public',
  `createdDatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

ALTER TABLE `video` ADD `status` ENUM( 'active', 'inactive' ) NOT NULL DEFAULT 'active' AFTER `accessType` ;

