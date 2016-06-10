-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu1
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Июн 10 2016 г., 18:21
-- Версия сервера: 5.7.12-0ubuntu1
-- Версия PHP: 5.6.22-4+deb.sury.org~xenial+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `test`
--

-- --------------------------------------------------------

--
-- Структура таблицы `author`
--

CREATE TABLE `author` (
  `id` int(10) NOT NULL,
  `id_book` int(10) NOT NULL,
  `name_author` varchar(1024) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `author`
--

INSERT INTO `author` (`id`, `id_book`, `name_author`) VALUES
(1, 1, 'Иванов'),
(2, 2, 'Иванов'),
(3, 2, 'Петров'),
(4, 3, 'Иванов'),
(5, 3, 'Петров'),
(6, 3, 'Сидоров'),
(7, 4, 'Иванов'),
(8, 4, 'Петров'),
(9, 4, 'Сидоров'),
(10, 4, 'Фёдоров'),
(11, 5, 'Иванов'),
(12, 5, 'Петров');

-- --------------------------------------------------------

--
-- Структура таблицы `book`
--

CREATE TABLE `book` (
  `id` int(10) NOT NULL,
  `name` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `book`
--

INSERT INTO `book` (`id`, `name`) VALUES
(1, 'книга 1'),
(2, 'книга 2'),
(3, 'Книга 3'),
(4, 'Книга 4'),
(5, 'Книга 5');

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
  `id` int(10) NOT NULL,
  `date_create` int(20) NOT NULL,
  `ip` varchar(20) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `homepage` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `browser` varchar(1024) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `messages`
--

INSERT INTO `messages` (`id`, `date_create`, `ip`, `user_name`, `email`, `homepage`, `text`, `browser`) VALUES
(1, 1465552231, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(2, 1465552256, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(3, 1465552258, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(4, 1465552260, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(5, 1465552360, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(6, 1465552460, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(7, 1465552560, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(8, 1465552660, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(9, 1465552760, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(10, 1465552860, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(11, 1465552960, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(12, 1465553060, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(13, 1465553160, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(14, 1465553260, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(15, 1465553360, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(16, 1465553460, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(17, 1465553560, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(18, 1465553660, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(19, 1465553760, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(20, 1465553860, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(21, 1465553960, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(22, 1465554060, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(23, 1465554160, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(24, 1465554260, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(25, 1465555260, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(26, 1465555360, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://www.ya.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(27, 1465554235, '127.0.0.1', 'pinicilin2006', 'pinicilin2006@gmail.com', 'http://h-aa.ru', 'alkhdflkalkdflkjahsdfkhlkasdfkjlkajlsfdkjasdfhaslfdhaslkhfdlkashflkashfdlkashflkashflkahslkdfh sadkjfhklashdfklahskdlfhaklsdhf ksdfhklashdflkhlkjh asdadad', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(28, 1465563400, '127.0.0.1', 'Artur', 'artur@artr.com', '', '<a href="tklient.ru">link</a>', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(29, 1465564294, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://h-aa.ru', 'asdasdasdasd', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(30, 1465564416, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://h-aa.ru', 'sdfsdfsdfsdf', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(31, 1465564461, '127.0.0.1', 'asdasdasd', 'pinicilin2006@gmail.com', 'http://h-aa.ru', 'sadfadfsdfsdf', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'),
(32, 1465564565, '127.0.0.1', 'asdasdasd', 'pinicilin2006@ya.ru', 'http://h-aa.ru', 'asdasdasdad', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `author`
--
ALTER TABLE `author`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT для таблицы `book`
--
ALTER TABLE `book`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
