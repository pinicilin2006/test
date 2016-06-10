<?php
session_start();
require_once('../config.php');
require_once('../function.php');
connect_to_base();
// echo '<pre>';
// print_r($_POST);
// echo '</pre>';
//echo 'success';
foreach($_POST as $key => $val){
	$$key = mysql_escape_string($val);
	//echo $key."<br>";
}
$result = '';
//Проверка данных
if(!$user_name)
{
	$err[]='Не указано имя пользователя';
}

if($user_name && !preg_match("/^[0-9a-z]+$/i", $user_name))
{
	$err[]='В поле имя пользователя допускается использовать только цифры и буквы латинского алфавита';
}

if(!$email)
{
	$err[] = 'Не указан Email';
}

if($email && !filter_var($email, FILTER_VALIDATE_EMAIL))
{
	$err[] = 'Не верно указан email';
}

if($homepage && !filter_var($homepage, FILTER_VALIDATE_URL))
{
	$err[] = 'Не верный формат адреса домашней страницы';
}

if(!$text)
{
	$err[] = 'Отсутствует текст сообщения';
}

if(!$captcha)
{
	$err[] = 'Отсутствует проверочный код';
}

if($captcha && $captcha != $_SESSION['captcha'])
{
	$err[] = 'Проверочный код введён не верно';
}

if($err)
{
	$result = '<ul class="list-unstyled">';
	foreach ($err as $val) {
		$result .= '<li class="text-danger">Ошибка! '.$val.'</li>';
	}
	$result .= '</ul>';
	echo $result;
	exit();
}

if($text)
{
	$text = strip_tags($text,'<a><code><i><strike><strong>');
}
$user_ip = $_SERVER['REMOTE_ADDR'];
$browser = $_SERVER['HTTP_USER_AGENT'];
$query = "INSERT INTO `messages`(
	`date_create`, 
	`ip`, 
	`user_name`, 
	`email`, 
	`homepage`, 
	`text`,
	`browser`
) 
VALUES (
	'".time()."',
	'".$user_ip."',
	'".$user_name."',
	'".$email."',
	'".$homepage."',
	'".$text."',
	'".$browser."'
)";
if(mysql_query($query)){
	$result='success';
	echo $result;
}
exit();
?>
