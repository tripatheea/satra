SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;


-- --------------------------------------------------------

--
-- Table structure for table `fold_count`
--

CREATE TABLE IF NOT EXISTS `fold_count` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `count` int(11) NOT NULL,
  `frequency` int(11) NOT NULL,
  `player` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=35 ;

--
-- Dumping data for table `fold_count`
--

INSERT INTO `fold_count` (`id`, `count`, `frequency`, `player`) VALUES
(1, 1, 0, 0),
(2, 2, 0, 0),
(3, 3, 0, 0),
(4, 4, 0, 0),
(5, 5, 0, 0),
(6, 6, 0, 0),
(7, 7, 0, 0),
(8, 8, 0, 0),
(9, 9, 0, 0),
(10, 10, 0, 0),
(11, 11, 0, 0),
(12, 12, 0, 0),
(13, 13, 0, 0),
(14, 14, 0, 0),
(15, 15, 0, 0),
(16, 16, 0, 0),
(17, 17, 0, 0),
(18, 1, 0, 1),
(19, 2, 0, 1),
(20, 3, 0, 1),
(21, 4, 0, 1),
(22, 5, 0, 1),
(23, 6, 0, 1),
(24, 7, 0, 1),
(25, 8, 0, 1),
(26, 9, 0, 1),
(27, 10, 0, 1),
(28, 11, 0, 1),
(29, 12, 0, 1),
(30, 13, 0, 1),
(31, 14, 0, 1),
(32, 15, 0, 1),
(33, 16, 0, 1),
(34, 17, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `win`
--

CREATE TABLE IF NOT EXISTS `win` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player` int(1) NOT NULL,
  `frequency` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `win`
--

INSERT INTO `win` (`id`, `player`, `frequency`) VALUES
(1, 0, 0),
(2, 1, 0),
(3, 9, 0);

-- --------------------------------------------------------

--
-- Table structure for table `winning_score`
--

CREATE TABLE IF NOT EXISTS `winning_score` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `winningScore` int(11) NOT NULL,
  `player` int(1) NOT NULL,
  `frequency` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=52 ;

--
-- Dumping data for table `winning_score`
--

INSERT INTO `winning_score` (`id`, `winningScore`, `player`, `frequency`) VALUES
(1, 1, 0, 0),
(2, 2, 0, 0),
(3, 3, 0, 0),
(4, 4, 0, 0),
(5, 5, 0, 0),
(6, 6, 0, 0),
(7, 7, 0, 0),
(8, 8, 0, 0),
(9, 9, 0, 0),
(10, 10, 0, 0),
(11, 11, 0, 0),
(12, 12, 0, 0),
(13, 13, 0, 0),
(14, 14, 0, 0),
(15, 15, 0, 0),
(16, 16, 0, 0),
(17, 17, 0, 0),
(18, 1, 1, 0),
(19, 2, 1, 0),
(20, 3, 1, 0),
(21, 4, 1, 0),
(22, 5, 1, 0),
(23, 6, 1, 0),
(24, 7, 1, 0),
(25, 8, 1, 0),
(26, 9, 1, 0),
(27, 10, 1, 0),
(28, 11, 1, 0),
(29, 12, 1, 0),
(30, 13, 1, 0),
(31, 14, 1, 0),
(32, 15, 1, 0),
(33, 16, 1, 0),
(34, 17, 1, 0),
(35, 1, 9, 0),
(36, 2, 9, 0),
(37, 3, 9, 0),
(38, 4, 9, 0),
(39, 5, 9, 0),
(40, 6, 9, 0),
(41, 7, 9, 0),
(42, 8, 9, 0),
(43, 9, 9, 0),
(44, 10, 9, 0),
(45, 11, 9, 0),
(46, 12, 9, 0),
(47, 13, 9, 0),
(48, 14, 9, 0),
(49, 15, 9, 0),
(50, 16, 9, 0),
(51, 17, 9, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
