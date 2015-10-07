<?php
/**
* Класс для работы с директорией
*/
class File
{
	public $filename;
	public $directory;
	public $list;
	public $list_html;
	public $error;
	function data_check($a,$b)
	{
		if(!empty($a)){//обрабатываем название файла
			$a = trim($a);
			$a = stripslashes($a);
			$a = strip_tags($a);
			$a = htmlspecialchars($a);
		}
		$this->filename = $a;
		//echo $b;
		if(empty($b) || !isset($b) || !file_exists($b)){
			//echo "Директория не найдена";
			//exit;
			//return false;
			$this->error = 1;
			return $this->error;
		} else {
			$this->directory = $b;
		}
	}

	function list_html_glob(){
		if($this->error == 1){
			$this->list_html = 'Ошибка. Директория не найдена';
			return false;
		}
		if(empty($this->directory)){
			$this->list_html = 'Ошибка. Не был вызван метов data_check';
			return false;			
		}
		$this->list_html = '<table><tr><th>Наименование</th><th>Тип</th></tr>';
		$this->list = glob("$this->directory/*$this->filename*");
		if(!$this->list){
			$this->list_html .='<tr><td colspan=2>Ни чего не найдено</td></tr>';
		} else {
			foreach($this->list as $val){
				$this->list_html .= "<tr><td><a href=/".$val.">".$val."</a></td><td>".filetype($val)."</td></tr>";
			}
		}
		$this->list_html .= "</table>";
		return $this->list_html;
	}
}
?>
