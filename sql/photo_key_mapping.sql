--
-- Table structure for table `photo_key_mapping`
--

CREATE TABLE IF NOT EXISTS `photo_key_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `key` varchar(255) NOT NULL,
  `objectUserId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
