--
-- Table structure for table `userinfo`
--

CREATE TABLE IF NOT EXISTS `userinfo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `dob` datetime DEFAULT NULL,
  `age` int(3) DEFAULT NULL,
  `gender` enum('male','female','male_female_couple','gay_couple','lesbian_couple') DEFAULT NULL,
  `telephone` varchar(15) DEFAULT NULL,
  `zipcode` varchar(10) DEFAULT NULL,
  `country` varchar(30) DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `latitude` varchar(100) DEFAULT NULL,
  `longitude` varchar(100) DEFAULT NULL,
  `userLevel` enum('professional_body_worker_or_CMT','massage_student','aficionado') DEFAULT NULL,
  `expYear` enum('none_at_all','0-1','1-2','2-5','5-10','10-20','more_than_20_years') DEFAULT NULL,
  `bodyType` enum('muscular','gymfit','average','slender','few_extra_pounds','this_question_is_not_important') DEFAULT NULL,
  `height` int(4) DEFAULT NULL,
  `massageFrequency` enum('daily_or_almost_daily','about_once_a_week','every_few_weeks','about_once_a_month','every_few_months','about_every_six_months','about_once_a_year') DEFAULT NULL,
  `drinkingHabit` enum('gave_it_up','socially','regularly','non_alcoholic_beverages_only') DEFAULT NULL,
  `smokingHabit` enum('never','ex-smoker','occasionally','daily','socially','i_will_tell_you_later') DEFAULT NULL,
  `trainingHours` enum('no_formal_training','under_100hours','101-200hours','201-300hours','301-500hours','501-1000hours','more_than_1000hours') DEFAULT NULL,
  `languages` text,
  `therapeuticStatus` enum('yes','no') DEFAULT NULL,
  `therapeuticGender` varchar(250) DEFAULT NULL,
  `therapeuticDesc` text,
  `sensualStatus` enum('yes','no') DEFAULT NULL,
  `sensualGender` varchar(250) DEFAULT NULL,
  `sensualDesc` text,
  `relationshipTypes` text,
  `preferedMassageTypes` text,
  `serviceType` text,
  `referredUserId` int(11) DEFAULT NULL,
  `lastLoggedin` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

