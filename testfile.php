<?php
require_once "file.php";
class FileTest extends PHPUnit_Framework_TestCase
{
	public function testDirectory(){
		$dir = new File();
		$this->assertEquals(null,$dir->data_check('1231','worker'));
	}	
}
?>
