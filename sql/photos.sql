--
-- Table structure for table `photos`
--

CREATE TABLE IF NOT EXISTS `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `imageName` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `accessType` enum('private','public') NOT NULL DEFAULT 'public',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

ALTER TABLE `photos` ADD `status` ENUM( 'active', 'inactive', 'delete' ) NOT NULL DEFAULT 'active' AFTER `accessType` ;

ALTER TABLE `photos` ADD `createdAt` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `status` ;

