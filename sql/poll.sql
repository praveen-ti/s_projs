--- Table structure for table `poll`
--

CREATE TABLE IF NOT EXISTS `poll` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `question` varchar(255) DEFAULT NULL,
  `authorId` int(11) DEFAULT NULL,
  `authorType` varchar(255) DEFAULT NULL,
  `pollStatus` varchar(255) DEFAULT NULL,
  `commentStatus` varchar(255) DEFAULT NULL,
  `approvalStatus` varchar(255) DEFAULT NULL,
  `answerType` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

--
-- Dumping data for table `poll`
--

INSERT INTO `poll` (`id`, `title`, `question`, `authorId`, `authorType`, `pollStatus`, `commentStatus`, `approvalStatus`, `answerType`, `createdAt`, `updatedAt`) VALUES
(1, 'Primary Photos Important?', 'How important is a members Primary (Profile) Photo?', 1, 'user', 'active', 'show', 'rejected', 'radio', '2016-01-21 12:25:58', '2016-01-21 14:15:36'),
(2, 'Safety', 'When is an exchange safe? Do you have safety improvement suggestions?', 1, 'user', 'inactive', 'show', 'pending', 'checkbox', '2016-01-21 14:56:49', '2016-01-21 15:03:17'),
(3, 'Number of E-mails', 'How many e-mails before you schedule your first massage?', 1, 'user', 'inactive', 'show', 'pending', 'checkbox', '2016-01-21 14:56:49', '2016-01-21 15:03:17');

ALTER TABLE poll CHANGE answerType ansOptionType VARCHAR(50);

