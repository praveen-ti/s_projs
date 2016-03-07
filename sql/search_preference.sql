--
-- Table structure for table `search_preference`
--

CREATE TABLE IF NOT EXISTS `search_preference` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `therapeuticMassage` enum('therapeutic') DEFAULT NULL,
  `sensualMassage` enum('sensual') DEFAULT NULL,
  `genderMale` enum('male') DEFAULT NULL,
  `genderFemale` enum('female') DEFAULT NULL,
  `genderMaleFemaleCouple` enum('male_female_couple') DEFAULT NULL,
  `genderGayCouple` enum('gay_couple') DEFAULT NULL,
  `genderLesbianCouple` enum('lesbian_couple') DEFAULT NULL,
  `minAge` int(3) DEFAULT NULL,
  `maxAge` int(3) DEFAULT NULL,
  `language` varchar(50) DEFAULT NULL,
  `bodyType` enum('slim_palette','average','gym_fit','muscular','few_pound_average','large') DEFAULT NULL,
  `height` int(4) DEFAULT NULL,
  `drinkingHabit` enum('occasionally_socially','frequently','never','stopped_drinking') DEFAULT NULL,
  `smokingHabit` enum('occasionally_socially','frequently','never','stopped_smoking') DEFAULT NULL,
  `levelType` enum('professional_cmt','student','aficionado') DEFAULT NULL,
  `levelTypeOther` varchar(150) DEFAULT NULL,
  `massageStyle` enum('deep_tissue_strong','thai','reflexology','swedish','chinese','others') DEFAULT NULL,
  `massageStyleOther` varchar(150) DEFAULT NULL,
  `serviceReceiveOnly` enum('receive_only') DEFAULT NULL,
  `serviceGiveOnly` enum('give_only') DEFAULT NULL,
  `serviceExchange` enum('exchange') DEFAULT NULL,
  `servicePayRightMasseur` enum('pay_right_masseur') DEFAULT NULL,
  `relationshipPartner` enum('partner') DEFAULT NULL,
  `relationshipFriendship` enum('friendship') DEFAULT NULL,
  `relationshipIntimate` enum('intimate') DEFAULT NULL,
  `relationshipRomance` enum('romance') DEFAULT NULL,
  `massageFrequency` enum('daily','every_week','every_month','every_six_months','once_a_year','never') DEFAULT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


