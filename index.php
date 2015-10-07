<?php
require_once "file.php";
$file_name = (isset($_GET['file_name']) ? $_GET['file_name'] : '');
$directory = 'worker';//Директория для поиска файлов
$file = new File();
$file->data_check($file_name, $directory);
$file->list_html_glob();
?>
<head>
<link href="style.css" rel="stylesheet">
</head>
<body>
<center>
<form>
		<h3>Поиск файлов в директории.</h3>
		<label>Имя файла:</label><input type="text" name="file_name" value="<?php echo $file->filename ?>">
		<br>
		<input type="submit" value="Найти">
</form>
<?php
echo $file->list_html;
?>
</center>
</body>