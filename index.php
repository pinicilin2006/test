<?php
require_once('config.php');
require_once('function.php');
connect_to_base();
$num = 10;//количество отображаемых записей на странице
$offset = 0;//смещение
if(isset($_GET['num_page']) && filter_var($_GET['num_page'], FILTER_VALIDATE_INT))
{	
	$active_link = $_GET['num_page'];
	$offset = $_GET['num_page']*$num -$num;
}

$all_messages = mysql_num_rows(mysql_query("SELECT * FROM `messages`"));
$num_pages = ceil($all_messages/$num);
$query = "SELECT * FROM `messages`";
//Сортировка
$query .= " ORDER BY `id` DESC";
//Лимит и смещение
$query .= " LIMIT $offset,$num";
$data = mysql_query($query);
require_once('html/index.html');
?>
