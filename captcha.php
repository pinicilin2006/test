<?php
session_start();
// Создание изображения
$im = imagecreatetruecolor(100, 30);

// Создание цветов
$white = imagecolorallocate($im, 255, 255, 255);
$grey = imagecolorallocate($im, 128, 128, 128);
$black = imagecolorallocate($im, 0, 0, 0);
imagefilledrectangle($im, 0, 0, 399, 29, $white);

// Текст надписи
$text = substr(md5(uniqid(rand(), true)),0,5);
$font = 'fonts/verdana.ttf';
//Сохраняем в сессию
$_SESSION['captcha'] = $text;
// Тень
imagettftext($im, 20, 0, 11, 21, $grey, $font, $text);

// Текст
imagettftext($im, 20, 0, 10, 20, $black, $font, $text);
imagepng($im);
imagedestroy($im);
?>