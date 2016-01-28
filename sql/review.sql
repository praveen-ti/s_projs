--
-- Table structure for table `review`
--

CREATE TABLE IF NOT EXISTS `review` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reviewNote` text NOT NULL,
  `userId` int(11) NOT NULL,
  `reviewerId` int(11) NOT NULL,
  `approvalStatus` enum('approved','notapproved') NOT NULL DEFAULT 'notapproved',
  `createdDatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

