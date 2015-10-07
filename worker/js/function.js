function calc(){
	var a = $("#main_form").serialize();
	$.ajax({
		type: "POST",
		url: 'ajax/calc.php',
		data: a,
		success: function(data) {
			$("#calc_result").html(data);
			if(data == ''){
				$('#button_submit').prop('disabled', true);
			} else {
				$('#button_submit').prop('disabled', false);
			}
		}
	});
	return false;
}

function number_insured_data(){
		var a = $('#number_insured').val();
		var b = '';
		if(a == '0' || a == ''){
			$('#number_insured_data').html(b);
			return false;
		}
		for(x=1;x<=a;x++){
			b += '<hr><em><h5>Данные застрахованного №'+x+':</h5> Дата рождения: <input type="text" style="width:80px;height:11px;" class="date_birth" name="calculation_date_birth_'+x+'" required><br>Пол застрахованного: <input type="radio"  name="calculation_sex_'+x+'" value="m" checked>мужской&nbsp;&nbsp;<input type="radio" name="calculation_sex_'+x+'" value="f">женский<br>Активный отдых: <input type="radio"  name="calculation_sport_'+x+'" value="yes" checked>да&nbsp;&nbsp;<input type="radio" name="calculation_sport_'+x+'" value="no">нет</em>'; 
		}
		b += '<hr>'
		$('#number_insured_data').html(b);
		//календарик для даты рождени
		$('.date_birth').mask('99.99.9999');
		$('.date_birth').datepicker({
			changeMonth: true,
			changeYear: true,
			yearRange: 'c-100:c',
			maxDate: "-1d",
			dateFormat: "dd.mm.yy",
			showAnim: "slide"
	    });
		$('.date_insurance').datepicker("option", $.datepicker.regional["ru"]);
}

function onlyDigits(input) {//разрешаем воода только цифр и точки
	var value = input.value; 
    var rep = /[-\,;":'a-zA-Zа-яА-Я]/; 
    if (rep.test(value)) { 
        value = value.replace(rep, ''); 
        input.value = value; 
    } 
}

function validateDateBirth_1(){
		var date_birth = $("#date_birth").val();
		var date = new Date(date_birth.replace(/(\d+).(\d+).(\d+)/, '$2/$1/$3'));
		//alert(date);	
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		var t = new Date();
		var a = ( t.getFullYear() - y - ((t.getMonth() - --m||t.getDate() - d)<0) );
		if(a < 18){
			//alert("Минимально допустимый возраст 18 лет");
			$("#date_birth_message_1").html("Минимально допустимый возраст 18 лет!");
			$("#date_birth").val('');
			$("#date_birth_message_1").focus();
		}else {
			$("#date_birth_message_1").html(" ");
		}
}

// function add_policy(){
// 			var a = $("#main_form").serialize();
// 			$.ajax({
// 			  type: "POST",
// 			  url: 'ajax/add_policy.php',
// 			  data: a,
// 			  success: function(data) {
// 			  	$("#block_0").slideUp(400);
// 			  	$("#message_1").html(data);
// 			  }
// 			});
// 			return false;
// }
//
// function edit_policy(){
// 			var a = $("#main_form").serialize();
// 			$.ajax({
// 			  type: "POST",
// 			  url: 'ajax/edit_policy.php',
// 			  data: a,
// 			  success: function(data) {
// 			  	$("#block_0").slideUp(400);
// 			  	$("#message_1").html(data);
// 			  }
// 			});
// 			return false;
// }

function add_user(){
			var a = $("#main_form").serialize();
			$.ajax({
			  type: "POST",
			  url: '/ajax/user_add.php',
			  data: a,
			  success: function(data) {
			  	$("#user_data").slideUp(400);
			  	$("#message").html(data);
			  }
			});
			return false;
}

function edit_user(){
			var a = $("#main_form").serialize();
			$.ajax({
			  type: "POST",
			  url: '/ajax/user_edit.php',
			  data: a,
			  success: function(data) {
			  	$("#user_data").slideUp(400);
			  	$("#message").html(data);
			  }
			});
			return false;
}

function add_unit(){
			var a = $("#main_form").serialize();
			$.ajax({
			  type: "POST",
			  url: '/ajax/unit_add.php',
			  data: a,
			  success: function(data) {
			  	$("#user_data").slideUp(400);
			  	$("#message").html(data);
			  }
			});
			return false;
}

function edit_unit(){
			var a = $("#main_form").serialize();
			$.ajax({
			  type: "POST",
			  url: '/ajax/unit_edit.php',
			  data: a,
			  success: function(data) {
			  	$("#user_data").slideUp(400);
			  	$("#message").html(data);
			  }
			});
			return false;
}

function add_bso(){
			var a = $("#main_form").serialize();
			$.ajax({
			  type: "POST",
			  url: '/ajax/bso_add.php',
			  data: a,
			  success: function(data) {
			  	$("#user_data").slideUp(400);
			  	$("#message").html(data);
			  }
			});
			return false;
}

function return_bso(){
			var a = $("#main_form").serialize();
			$.ajax({
			  type: "POST",
			  url: '/ajax/bso_return.php',
			  data: a,
			  success: function(data) {
			  	$("#user_data").slideUp(400);
			  	$("#message").html(data);
			  }
			});
			return false;
}

function add_a7(){
			var a = $("#main_form").serialize();
			$.ajax({
			  type: "POST",
			  url: '/ajax/a7_add.php',
			  data: a,
			  success: function(data) {
			  	$("#user_data").slideUp(400);
			  	$("#message").html(data);
			  }
			});
			return false;
}

function add_news(){
			var a = $("#main_form").serialize();
			$.ajax({
			  type: "POST",
			  url: '/ajax/news_add.php',
			  data: a,
			  success: function(data) {
			  	$("#user_data").slideUp(400);
			  	$("#message").html(data);
			  }
			});
			return false;
}

function return_a7(){
			var a = $("#main_form").serialize();
			$.ajax({
			  type: "POST",
			  url: '/ajax/a7_return.php',
			  data: a,
			  success: function(data) {
			  	$("#user_data").slideUp(400);
			  	$("#message").html(data);
			  }
			});
			return false;
}

function calc_osago(){
			var a = $("#main_form").serialize();
			$.ajax({
			  type: "POST",
			  url: '/ajax/osago_calc.php',
			  data: a,
			  success: function(data) {
			  	$("#user_data").slideUp();
			  	$("#message").html(data);
			  }
			});
			return false;
}

function add_polis(){
			var a = $("#main_form").serialize();
			$.ajax({
			  type: "POST",
			  url: '/ajax/polis_add.php',
			  data: a,
			  success: function(data) {
			  	$("#user_data").slideUp();
			  	$("#message").html(data);
			  }
			});
			return false;
}

function edit_polis(){
			var a = $("#main_form").serialize();
			$.ajax({
			  type: "POST",
			  url: '/ajax/polis_edit.php',
			  data: a,
			  success: function(data) {
			  	$("#user_data").slideUp();
			  	$("#message").html(data);
			  }
			});
			return false;
}

function button_return(){
	$('#user_data').slideDown();
	$('#message').html('');
}

function place_reg(a){
	var a = a;
	//alert(a);
	if(a == '2'){
		$(".ig_hide").hide();
		$("#subject").prop('required',false);

	}else{
		$(".ig_hide").slideDown();
		$("#subject").prop('required',true);
	}
	if(a == 3){
		$(".period_use").slideUp();
		for(x=1;x<12;x++){
			$("#term_insurance option[value=" + x + "]").hide();				
		}
		$('#term_insurance').val(12);
	} else {
		$(".period_use").slideDown();
		for(x=1;x<12;x++){
			$("#term_insurance option[value=" + x + "]").show();				
		}
		$("#term_insurance option[value=" + 12 + "]").hide();
		$('#term_insurance').val(1);			
	}
	//Скртыие отображение кбм и срока страхования в зависимсоти от выбранного места регистрации ТС
	if(a == 1){
		$(".term_insurance").hide();
		$("#term_insurance").val(11);
		$(".kbm").show();
		$("#srok_year").show();
	} else {
		$(".term_insurance").show();
		$(".kbm").hide();
		$("#srok_year").hide();			
	}
}
function show_capacity(a){
	var a = a;
	if(a == '2' || a == '3'){
		$(".capacity").slideDown();
		$("#trailer").slideUp();
	} else {
		$(".capacity").slideUp();
		$("#trailer").slideDown();
	}
}

function type_ins(a){
	var a = a;
	if(a == 'jur'){
		//оставляем доступным вариант с неограниченным количеством водителей
		$('input:radio[name="drivers"]').filter('[value="1"]').prop('checked',true);
		$("#message_1").html('');
		$("#drivers_limit").hide();
		//период использования ТС
		for(x=1;x<4;x++){				
			$("#period_use option[value=" + x + "]").hide();
		}
		$('#period_use').val(4);
	} else {
		$("#drivers_limit").show(); 
		for(x=1;x<4;x++){
			$("#period_use option[value=" + x + "]").show();
		}
		$('#period_use').val(1);			
	}	
}

function autocomplete_phiz(a,b){
	var owner = b =='yes' ? 'owner_' : '';
	$.ajax({
		type: "GET",
		url: '/ajax/autocomplete_phiz.php',
		data: 'user_id='+a+'&owner='+b,
		dataType: 'json',
		success: function(data) {
			$('#aoid_data').val('');
			jQuery.each(data, function(i, val) {
		      	 $("#"+i).val(val).change();
		    });
		    if(b == 'no'){
			    $('#'+owner+'aoid_data').val(data.aoid).change();
			    $('#'+owner+'city_data').val(data.city);
			    $('#'+owner+'street_data').val(data.street);
			} else {
			    $('#'+owner+'aoid_data').val(data.owner_aoid);
			    $('#'+owner+'city_data').val(data.owner_city);
			    $('#'+owner+'street_data').val(data.owner_street);				
			}
		}

	});
}

function query_kbm(a){
	$.ajax({
		type: "POST",
		url: "/dkbm/result.php",
		data: a,
		dataType: 'json',
		success: function(data){
		alert( "Прибыли данные: " + data );
		}
	});
}

function period_use_end(period){
	var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = dd+'.'+mm+'.'+yyyy;
	var a = $('#auto_used_start_1').val();//дата начала действия
	var b = today;//дата сегодня
	var c = period;
	var d = $("#start_date").val();
	var timeNow = new Date();
	var arrStartDate = a.split('.');
	var arrTodayDate = b.split('.');
	var arrStartDateSrok = d.split('.');
	var startDate = new Date(arrStartDate[2], arrStartDate[1]-1, arrStartDate[0]);
	var todayDate = new Date(arrTodayDate[2], arrTodayDate[1]-1, arrTodayDate[0]);
	var StartDateSrok = new Date(arrStartDateSrok[2], arrStartDateSrok[1]-1, arrStartDateSrok[0]); 				
	//alert(startDate+'-'+todayDate);
	//если дата меньше текущей
	if(startDate < todayDate || startDate < StartDateSrok){
		$('#auto_used_start_1').val('');
		return false;
	}
	//если дата больше либо равна текущей
	if(startDate > todayDate || a == b){
		//alert(startDate);
		var endDate = startDate;
		var arr = [0,3,4,5,6,7,8,9,12,20];
		var srok = arr[c];
		//alert(srok);
		if(srok == 20){//прибавляем дни
			endDate.setDate(endDate.getDate()+srok);
		} else {//прибавляем месяцы
			endDate.setMonth(endDate.getMonth()+srok);
		}
		endDate.setDate(endDate.getDate()-1);
		var dd = endDate.getDate();
		if(dd<10){
			dd = '0'+dd;
		}		
		var mm = endDate.getMonth()+1;
		if(mm<10){
			mm = '0'+mm;
		}				
		var yyyy = endDate.getFullYear();
		var end_date = dd+'.'+mm+'.'+yyyy;
		$("#auto_used_end_1").val(end_date);
	}
}

function contract_table(){
			$('#message').html('<center><b>Ожидайте. Производится загрузка договоров.</b> <br> <img src=\"/images/download.gif\"></center>');
			var a = $("#filter_form").serialize();
			$.ajax({
			  type: "POST",
			  url: '/ajax/contract_table.php',
			  data: a,
			  success: function(data) {
			  	$("#message").html(data);
			  	$("#contract_table").tablesorter(); 
			  }
			});
			return false;
}