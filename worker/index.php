<?php
// echo "<pre>";
// print_r($_SESSION);
// echo "</pre>";
require_once('config.php');
require_once('function.php');
connect_to_base();
require_once('template/header.html');
?>
<div class="container-fluid">
	<div class="row-fluid">
		<div class="col-md-6 col-md-offset-3">
			<div class="panel panel-default">
	  			<div class="panel-heading">
	    			<h3 class="panel-title">Список сотрудников</h3>
	  			</div>
	  			<div class="panel-body" id="user_data">
	  			<table class="table table-bordered">
	  			<thead>
		  			<tr>
		  				<th>#</th>
		  				<th>ФИО</th>
		  				<th>Должность</th>
		  			</tr>
	  			</thead>
	  			<tbody>	
				<?php
		  			$query = mysql_query("SELECT * FROM `staff_1c` WHERE `doljnost` !='' ORDER BY name");
		  			$n = 1;
		  			while ($row = mysql_fetch_assoc($query)) {
		  				echo '<tr><td>'.$n.'</td><td>'.$row['name'].'</td><td>'.$row['doljnost'].'</td></tr>';
		  				$n++;

		  			}
		  		?>
		  		</tbody>
		  		</table>
	  			</div>
			</div>
			<div id="message"></div>
		</div>
	</div>
</div>
<div class="footer text-center">
	<small>©<?php echo date("Y") ?>. <a href="https://www.sngi.ru">Страховое общество «Сургутнефтегаз».</a> Все права защищены.</small>
</div>
</body>
</html>