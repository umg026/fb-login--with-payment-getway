-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2025 at 04:23 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `carnival`
--

-- --------------------------------------------------------

--
-- Table structure for table `card_details`
--

CREATE TABLE `card_details` (
  `user_id` int(11) NOT NULL,
  `customer_id` varchar(255) NOT NULL,
  `card_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `card_no` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `month` varchar(50) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pendingfees`
--

CREATE TABLE `pendingfees` (
  `user_id` int(11) NOT NULL,
  `charge_id` varchar(255) NOT NULL,
  `customer_id` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subcription_details`
--

CREATE TABLE `subcription_details` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `stripe_subscription_id` varchar(255) DEFAULT NULL,
  `stripe_subscription_schedule_id` varchar(255) DEFAULT NULL,
  `stripe_customer_id` varchar(255) NOT NULL,
  `subscription_plan_price_id` int(11) NOT NULL,
  `plan_amount` int(11) NOT NULL,
  `plan_amount_currency` varchar(255) NOT NULL,
  `plan_interval` varchar(200) DEFAULT NULL,
  `plan_interval_count` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `plan_preiod_start` date NOT NULL,
  `plan_preiod_end` date NOT NULL,
  `trial_end` date DEFAULT NULL,
  `status` enum('active','cancelled','','') NOT NULL,
  `cancel` tinyint(1) NOT NULL DEFAULT 0,
  `cancled_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subcription_plan`
--

CREATE TABLE `subcription_plan` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `stripe_price_id` varchar(255) NOT NULL,
  `tiral_days` int(11) NOT NULL,
  `have_trial` tinyint(1) NOT NULL DEFAULT 0,
  `amount` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subcription_plan`
--

INSERT INTO `subcription_plan` (`id`, `name`, `stripe_price_id`, `tiral_days`, `have_trial`, `amount`, `type`, `created_at`) VALUES
(1, 'Monthly', 'prod_RsLUqQvsdAwRQF', 5, 1, 10, 0, '2025-03-18 16:18:20.474264'),
(2, 'Daily', 'prod_RsLXLlAQlzT6rh', 2, 1, 1, 0, '2025-03-18 16:19:47.062925'),
(3, 'Yearly', 'prod_RsLVTE96qJNiRv', 2, 1, 100, 2, '2025-03-18 16:20:33.792375'),
(4, 'Lifetime', 'prod_RsLZ5tf7TzTxXG', 2, 1, 5000, 4, '2025-03-18 16:21:09.861798');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `facebook_id` varchar(255) DEFAULT NULL,
  `profile_pic` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_subscribed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `facebook_id`, `profile_pic`, `created_at`, `is_subscribed`) VALUES
(1, 'Umang Kumar', '1891582741672225@facebook.com', NULL, '1891582741672225', 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1891582741672225&height=50&width=50&ext=1743444357&hash=AbZaqspvXnBMCqICFgZ7nZjV', '2025-03-01 18:06:00', 0),
(2, 'Demo name', 'demo@gmail.com', '$2a$10$rz7r2unHhYVVUxz8nDEIAOScQ88wY1sSo4eEqdlYnHXiuZejXOSMS', NULL, NULL, '2025-03-02 05:05:15', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `card_details`
--
ALTER TABLE `card_details`
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `subcription_details`
--
ALTER TABLE `subcription_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `subcription_details_ibfk_1` (`subscription_plan_price_id`);

--
-- Indexes for table `subcription_plan`
--
ALTER TABLE `subcription_plan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `facebook_id` (`facebook_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `subcription_details`
--
ALTER TABLE `subcription_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subcription_plan`
--
ALTER TABLE `subcription_plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `card_details`
--
ALTER TABLE `card_details`
  ADD CONSTRAINT `card_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `subcription_details`
--
ALTER TABLE `subcription_details`
  ADD CONSTRAINT `subcription_details_ibfk_1` FOREIGN KEY (`subscription_plan_price_id`) REFERENCES `subcription_plan` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
