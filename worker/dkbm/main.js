function AddRow() {
  var tbl = document.getElementById("TblDrv");
  var dc = document.getElementById("drv_count");
  var c = tbl.rows.length;
  var j = c;

  if (c >= 10) {
    alert("Максимальное кол-во водителей 10!");
    return;
  }

  var row = tbl.insertRow(c);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  c++;

  cell1.innerHTML = '<B>Водитель №'+c+'</B><BR>';
  cell1.innerHTML = cell1.innerHTML+'<LABEL>Фамилия Имя Отчество:*</LABEL><BR>';
  cell1.innerHTML = cell1.innerHTML+'<INPUT type=text id="fio'+j+'" name="fio'+j+'" size=10 style="width: 240px">';
  cell1.setAttribute("width", "250px");
  cell1.setAttribute("align", "left");
  cell1.setAttribute("valign", "top");

  cell2.innerHTML = '<B>&nbsp;</B><BR>';
  cell2.innerHTML = cell2.innerHTML+'<LABEL>Дата рождения:*</LABEL><BR>';
  cell2.innerHTML = cell2.innerHTML+'<INPUT type=test id="birth_date'+j+'" name="birth_date'+j+'" size=10 onkeyup="DateMask(\'birth_date'+j+'\', \'report\')">&nbsp;';
  cell2.innerHTML = cell2.innerHTML+'<INPUT type=button style="width: 30px" value="..." name="calendar_'+c+'" onclick="displayDatePicker(\'birth_date'+j+'\', false);">';
  cell2.setAttribute("width", "148px");
  cell2.setAttribute("align", "left");
  cell2.setAttribute("valign", "top");

  cell3.innerHTML = '<B>Водительское удостоверение</B><BR>';
  cell3.innerHTML = cell3.innerHTML+'<LABEL>Серия:*            Номер:*</LABEL><BR>';
  cell3.innerHTML = cell3.innerHTML+'<INPUT type=text id="ser'+j+'" name="ser'+j+'" size=10 style="width: 50px">&nbsp;';
  cell3.innerHTML = cell3.innerHTML+'<INPUT type=text id="num'+j+'" name="num'+j+'" size=10 style="width: 150px">';
  cell3.setAttribute("align", "left");
  cell3.setAttribute("valign", "top");

  tbl.appendChild(row);

  dc.value = c;
}

function DelRow() {
  var tbl = document.getElementById("TblDrv");
  var dc = document.getElementById("drv_count");
  var c = tbl.rows.length;

  if (c <= 1) {
    dc.value = 1;
    var fio = document.getElementById("fio");
    var birth = document.getElementById("birth_date");
    var ser = document.getElementById("ser");
    var num = document.getElementById("num");

    fio.value = "";
    birth.value = "";
    ser.value = "";
    num.value = "";
  }
  else {
    var row = tbl.deleteRow(c-1);
    dc.value = c-1;
  }
}

function OnChange_Own() {
 var phy = document.getElementById("phy");
 var name_p = document.getElementById("own_name_p");
 var birth = document.getElementById("own_birth_date");
 var birth_b = document.getElementById("own_birth_date_btn");
 var doc = document.getElementById("own_doc");
 var ser = document.getElementById("own_ser");
 var num = document.getElementById("own_num");
 var name_j = document.getElementById("own_name_j");
 var inn = document.getElementById("own_inn");
 var is_resident = document.getElementById("is_resident");

 if (phy.checked == true) {
  name_p.disabled = false;
  birth.disabled = false;
  birth_b.disabled = false;
  doc.disabled = false;
  ser.disabled = false;
  num.disabled = false;
  name_j.disabled = true;
  inn.disabled = true;
  is_resident.disabled = true;
 }
 else {
  name_p.disabled = true;
  birth.disabled = true;
  birth_b.disabled = true;
  doc.disabled = true;
  ser.disabled = true;
  num.disabled = true;
  name_j.disabled = false;
  inn.disabled = false;
  is_resident.disabled = false;
 }

 name_p.value = "";
 birth.value = "";
 doc.value = "";
 ser.value = "";
 num.value = "";
 name_j.value = "";
 inn.value = "";
 is_resident.checked = true;
}

function Disable_Own() {
 var phy = document.getElementById("phy");
 var jur = document.getElementById("jur");
 var name_p = document.getElementById("own_name_p");
 var birth = document.getElementById("own_birth_date");
 var birth_b = document.getElementById("own_birth_date_btn");
 var doc = document.getElementById("own_doc");
 var ser = document.getElementById("own_ser");
 var num = document.getElementById("own_num");
 var name_j = document.getElementById("own_name_j");
 var inn = document.getElementById("own_inn");
 var is_resident = document.getElementById("is_resident");

 phy.disabled = true;
 jur.disabled = true;
 name_p.disabled = true;
 birth.disabled = true;
 birth_b.disabled = true;
 doc.disabled = true;
 ser.disabled = true;
 num.disabled = true;
 name_j.disabled = true;
 inn.disabled = true;
 is_resident.disabled = true;
 
 name_p.value = "";
 birth.value = "";
 doc.value = "";
 ser.value = "";
 num.value = "";
 name_j.value = "";
 inn.value = "";
 is_resident.checked = true;
}

function OwnDisabled(disabled) {
 if (disabled == true) {
  Disable_Own();
 }
 else {
  var phy = document.getElementById("phy");
  var jur = document.getElementById("jur");

  phy.disabled = false;
  jur.disabled = false;

  OnChange_Own();
 }
}

function DrvDisabled(disabled) {
  var fio = document.getElementById("fio");
  var birth = document.getElementById("birth_date");
  var birth_b = document.getElementById("birth_date_btn");
  var ser = document.getElementById("ser");
  var num = document.getElementById("num");
  var a_btn = document.getElementById("add_btn");
  var d_btn = document.getElementById("del_btn");
  
  if (disabled == true) {
    var tbl = document.getElementById("TblDrv");
    var dc = document.getElementById("drv_count");
    var c = tbl.rows.length;
    var i = c-1;

    dc.value = 1;

    while (i >= 0) {
      if (i == 0) {
	fio.value = "";
	birth.value = "";
	ser.value = "";
	num.value = "";
      }
      else {
	tbl.deleteRow(i);
      }
      i--;
    }
  }

  fio.disabled = disabled;
  birth.disabled = disabled;
  birth_b.disabled = disabled;
  ser.disabled = disabled;
  num.disabled = disabled;
  a_btn.disabled = disabled;
  d_btn.disabled = disabled;
}

function CarDisabled(disabled) {
 var vin = document.getElementById("vin");
 var body_num = document.getElementById("body_num");
 var chas_num = document.getElementById("chassis_num");
 var lic = document.getElementById("lic_plate");

 if (disabled == true) {
  vin.value = "";
  body_num.value = "";
  chas_num.value = "";
  lic.value = "";
 }

 vin.disabled = disabled;
 body_num.disabled = disabled;
 chas_num.disabled = disabled;
 lic.disabled = disabled;
}

function GetRequestType() {
 var kbm = document.getElementById("kbm");
 var to = document.getElementById("to");
 var kbm_to = document.getElementById("kbm_to");

 if (kbm.checked == true) {
  return 0;
 }
 else if (to.checked == true) {
  return 1;
 }
 else
 {
  return 2;
 }
}

function OnChange_Lim() {
 var lim = document.getElementById("lim");
 var rt = GetRequestType();

 if (lim.checked == true) {
  OwnDisabled(true);
  DrvDisabled(false);
  if (rt == 0) {
   CarDisabled(true);
  }
  else {
   CarDisabled(false);
  }
 }
 else {
  OwnDisabled(false);
  DrvDisabled(true);
  CarDisabled(false);
 }
}

function OnChange_Req() {
 var lim = document.getElementById("lim");
 var unlim = document.getElementById("unlim");
 var rt = GetRequestType();

 OnChange_Lim();
 
 if (rt == 1) {
  lim.disabled = true;
  unlim.disabled = true;
  DrvDisabled(true);
  OwnDisabled(true);
 }
 else {
  lim.disabled = false;
  unlim.disabled = false;
 }
}

function OnLoad() {
 OnChange_Req();
}

function IsValidDate(value)
{
 var iMon, iDay, iYear;

 iDay = parseInt(value.substring(0, value.indexOf(".")), 10);
 iMon = parseInt(value.substring((0, value.indexOf(".") + 1), value.lastIndexOf(".")), 10);
 iYear = parseInt(value.substring((value.lastIndexOf(".") + 1), value.length), 10);

 if (isNaN(iMon) || isNaN(iDay) || isNaN(iYear)) {
  return false;
 }

 if ((iYear < 1900) || (iYear > 3000) || (iMon < 1) || (iMon > 12) || (iDay < 1)) {
  return false;
 }

 switch (iMon) {
   case 1:
     if (iDay > 31) {
      return false;
     }
     break;
   case 2:
     if ((iYear/4) == (Math.round(iYear/4))) {
      if (iDay > 29) {
       return false;
      }
     }
     else {
       if (iDay > 28) {
	return false; 
       }
     }
     break;
   case 3:
     if (iDay > 31) {
      return false;
     }
     break;
   case 4:
     if (iDay > 30) {
      return false;
     }
     break;
   case 5:
     if (iDay > 31) {
      return false;
     }
     break;
   case 6:
     if (iDay > 30) {
      return false;
     }
     break;
   case 7:
     if (iDay > 31) {
      return false;
     }
     break;
   case 8:
     if (iDay > 31) {
      return false;
     }
     break;
   case 9:
     if (iDay > 30) {
      return false;
     }
     break;
   case 10:
     if (iDay > 31) {
      return false;
     }
     break;
   case 11:
     if (iDay > 30) {
      return false;
     }
     break;
   default:
     if (iDay > 31) {
      return false;
     }
     break;
 }
 
 return true;
}

function IsValidINN(INN) {
 var inn = ""+INN;

 if ((inn.length == 0) || (inn.length > 12)) {
  return false;
 }

 inn = inn.split('');

 var i = 0;
 while (i < inn.length) {
  if (isNaN(parseInt(inn[i], 10))) {
   return false;
  }
  i++;
 }

 if ((inn.length == 10) && (inn[9] == ((2 * inn[0] + 4 *
    inn[1] + 10 * inn[2] + 3 * inn[3] + 5 * inn[4] + 9 *
    inn[5] + 4 * inn[6] + 6 * inn[7] + 8 * inn[8]) % 11) % 10)) {
   return true;
 }
 else if ((inn.length == 12) && ((inn[10] == ((7 * inn[0] +
    2 * inn[1] + 4 * inn[2] + 10 * inn[3] + 3 * inn[4] +
    5 * inn[5] + 9 * inn[6] + 4 * inn[7] + 6 * inn[8] +
    8 * inn[9]) %11) %10) && (inn[11] == ((3 * inn[0] + 7 *
    inn[1] + 2 * inn[2] + 4 * inn[3] + 10 * inn[4] + 3 *
    inn[5] + 5 * inn[6] + 9 * inn[7] + 4 * inn[8] + 6 *
    inn[9] + 8 * inn[10]) %11) %10))) {
   return true;
 }

 return false;
}

function Sel(item) {
 item.focus();
 item.select();
}

function Validate() {
 var rep_d = document.getElementById("rep_date");
 var vin = document.getElementById("vin");
 var lic = document.getElementById("lic_plate");
 var body = document.getElementById("body_num");
 var chas = document.getElementById("chassis_num");
 var kbm = document.getElementById("kbm");
 var to = document.getElementById("to");
 var kbm_to = document.getElementById("kbm_to");
 var lim = document.getElementById("lim");
 var unlim = document.getElementById("unlim");
 var own_phy = document.getElementById("phy");
 var own_jur = document.getElementById("jur");
 var own_name_p = document.getElementById("own_name_p");
 var own_name_j = document.getElementById("own_name_j");
 var own_birth_date = document.getElementById("own_birth_date");
 var own_doc = document.getElementById("own_doc");
 var own_ser = document.getElementById("own_ser");
 var own_num = document.getElementById("own_num");
 var own_inn = document.getElementById("own_inn");

 if (!IsValidDate(rep_d.value)) {
  alert("Не указана дата начала действия договора или неверный формат даты!");
  Sel(rep_d);
  return false;
 }

 if ((own_phy.checked == true) && (own_name_p.disabled != true)) {
  if (own_name_p.value.length == 0) {
   alert("Не указано Ф.И.О. собственника ТС!");
   Sel(own_name_p);
   return false;
  }

  if (own_name_p.value.length > 100) {
   alert("Ф.И.О. собственника ТС не может быть длинее 100 символов (ограничение АИС РСА)!");
   Sel(own_name_p);
   return false;
  }
  
  if (!IsValidDate(own_birth_date.value))  {
   alert("Не указана дата рождения собственника ТС или неверный формат даты!");
   Sel(own_birth_date);
   return false;
  }

  if ((own_doc.value == null) || (own_doc.value <= 0)) {
   alert("Не выбран тип документа удостоверяющего личность!");
   Sel(own_doc);
   return false;
  }

  if (own_num.value.length == 0) {
   alert("Не указан номер документа удостоверяющего личность!");
   Sel(own_num);
   return false;
  }

  if (own_ser.value.length > 10) {
   alert("Серия документа, удостоверяющего личность собственника ТС, не может быть больше 10 символов (ограничение АИС РСА)!");
   Sel(own_ser);
   return false;
  }

  if (own_num.value.length > 25) {
   alert("Номер документа, удостоверяющего личность собственника ТС, не может быть больше 25 символов (ограничение АИС РСА)!");
   Sel(own_num);
   return false;
  }
 }
 else if ((own_jur.checked == true) && (own_name_j.disabled != true)) {
  if (own_name_j.value.length == 0) {
   alert("Не указано наименование собственника ТС!");
   Sel(own_name_j);
   return false;
  }

  if (own_name_j.value.length > 100) {
   alert("Наименование собственника ТС не может быть длинее 100 символов (ограничение АИС РСА)!");
   Sel(own_name_j);
   return false;
  }

  if (own_inn.value.length == 0) {
   alert("Не указан ИНН собственника ТС!");
   Sel(own_inn);
   return false;
  }

  if (own_inn.value.length != 10) {
   alert("ИНН ЮЛ. состоит из 10 арабских чисел!");
   Sel(own_inn);
   return false;
  }

  if (!IsValidINN(own_inn.value)) {
   alert("Указанное значение не является ИНН или оно введено не корректно!");
   Sel(own_inn);
   return false;
  }
 }
 
 if ((vin.value.length == 0) && (body.value.length == 0) && (chas.value.length == 0) && (vin.disabled != true) && (lic.value.length == 0)) {
  alert("Не заполнен ниодин идентификатор ТС!");
  Sel(vin);
  return false;
 }

 if (vin.value.length > 20) {
  alert("VIN код не может быть больше 20 символов (ограничение АИС РСА)!");
  Sel(vin);
  return false;
 }

 if (body.value.length > 30) {
  alert("Номер кузова не может быть больше 30 символов (ограничение АИС РСА)!");
  Sel(body);
  return false;
 }

 if (chas.value.length > 30) {
  alert("Номер шасси не может быть больше 30 символов (ограничение АИС РСА)!");
  Sel(chas);
  return false;
 }
 
 if (lic.value.length > 30) {
  alert("Гос.номер не может быть больше 30 символов (ограничение АИС РСА)!");
  Sel(lic);
  return false;
 }
 
 if ((to.checked == true) || (unlim.checked == true)) {
  return true;
 }

 var tbl = document.getElementById("TblDrv");

 if (tbl.rows.length == 0) {
  alert("Не указан ни один водитель!");
  return false;
 }
  
 var c = tbl.rows.length - 1;
 var f = false;
 while (c >= 0) {
  if (c > 0) {
   var fio = document.getElementById("fio"+c);
   var birth = document.getElementById("birth_date"+c);
   var ser = document.getElementById("ser"+c);
   var num = document.getElementById("num"+c);
  }
  else {
   var fio = document.getElementById("fio");
   var birth = document.getElementById("birth_date");
   var ser = document.getElementById("ser");
   var num = document.getElementById("num");
  }

  if ((fio.value.length == 0) && (birth.value.length == 0) && (ser.value.length == 0) && (num.value.length == 0)) {
   c--;  
  }
  else
  {
   if (fio.value.length == 0) {
    alert("Не указана фамилия водителя!");
    Sel(fio);
    return false;
   }

   if (fio.value.length > 100) {
    alert("Ф.И.О. водителя не может быть больше 100 символов (ограничение АИС РСА)!");
    Sel(fio);
    return false;
   }
   
   if (!IsValidDate(birth.value)) {
    alert("Не указана дата рождения водителя или неверный формат даты!");
    Sel(birth);
    return false;
   }

   if (ser.value.length > 20) {
    alert("Серия ВУ не может быть больше 20 символов (ограничение АИС РСА)!");
    Sel(ser);
    return false;
   }
     
   if (num.value.length == 0) {
    alert("Не указан номер ВУ!");
    Sel(num);
    return false;
   }

   if (num.value.length > 25) {
    alert("Номер ВУ не может быть больше 25 символов (ограничение АИС РСА)!");
    Sel(num);
    return false;
   }

   f = true;
   c--;
  }
 }

 if (f != true) {
  alert("Не указан ниодин водитель!");
  return false;
 }
 
 return true;
}

function CreateHTTP() {
  var http;

  try {
    http = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
      try {
	http = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
	  http = false;
	}
    }

  if (!http && (typeof XMLHttpRequest != 'undefined')) {
   http = new XMLHttpRequest();
  }

  return http;
}

function ShowResult(text) {
//  var win = window.open("result.html", "Результат запроса КБМ/ТО", "width=610, height=400, menubar=no, toolbar=no, location=no, directories=no, status=no, resizable=no, scrollbars=yes", true);
  var win = window.open("result.html", "", "width=850, height=400, menubar=no, toolbar=no, location=no, directories=no, status=no, resizable=no, scrollbars=yes");

  win.focus();
  win.document.write(text);
}

function Timer() {
 var btn = document.getElementById("submit");

 if (btn.value == "Запрос в РСА") {
   btn.value = 20;
 }
 else {
   btn.value--;
 }

 if (btn.value == 1) {
   btn.disabled = false;
   btn.value = "Запрос в РСА";
 }
 else {
   btn.disabled = true;
   setTimeout(Timer, 1000);
 }

 return;
}

function Submit() {
 var v = Validate();
  
 if (!v) {
   return;
 }

 var req = "rep_date="+encodeURIComponent(document.getElementById("rep_date").value);
 var kbm, lim;

 if (document.getElementById("kbm").checked == true) {
  req = req+"&type="+encodeURIComponent(0);
  kbm = 0;
 }
 else if (document.getElementById("to").checked == true) {
  req = req+"&type="+encodeURIComponent(1);
  kbm = 1;
 }
 else
 {
  req = req+"&type="+encodeURIComponent(2);
  kbm = 2;
 }

 if (document.getElementById("phy").checked == true) {
  req = req+"&is_phy="+encodeURIComponent(1);
  is_phy = 1;
 }
 else {
  req = req+"&is_phy="+encodeURIComponent(0);
  is_phy = 0;
 }

 if (is_phy == 1) {
  req = req+"&own_name="+encodeURIComponent(document.getElementById("own_name_p").value);
  req = req+"&own_birth="+encodeURIComponent(document.getElementById("own_birth_date").value);
  req = req+"&own_doc="+encodeURIComponent(document.getElementById("own_doc").value);
  req = req+"&own_ser="+encodeURIComponent(document.getElementById("own_ser").value);
  req = req+"&own_num="+encodeURIComponent(document.getElementById("own_num").value);
 }
 else {
  req = req+"&own_name="+encodeURIComponent(document.getElementById("own_name_j").value);
  req = req+"&own_inn="+encodeURIComponent(document.getElementById("own_inn").value);
  if (document.getElementById("is_resident").checked == true) {
    req = req+"&is_resident="+encodeURIComponent(1);
  }
  else {
    req = req+"&is_resident="+encodeURIComponent(0);
  }
 }
 
 if (document.getElementById("lim").checked == true) {
  req = req+"&lim="+encodeURIComponent(1);
  lim = 1;
 }
 else
 {
  req = req+"&lim="+encodeURIComponent(0);
  lim = 0;
 }

 req = req+"&vin="+encodeURIComponent(document.getElementById("vin").value);
 req = req+"&body_num="+encodeURIComponent(document.getElementById("body_num").value);
 req = req+"&chassis_num="+encodeURIComponent(document.getElementById("chassis_num").value);
 req = req+"&lic_plate="+encodeURIComponent(document.getElementById("lic_plate").value);

 if ((kbm != 1) && (lim == 1)) {
  var tbl = document.getElementById("TblDrv");
  var c = tbl.rows.length - 1;
  var j = 0;
  var drv = "";
  
  while (c >= 0) {
    if (c > 0) {
      var fio = document.getElementById("fio"+c);
      var birth = document.getElementById("birth_date"+c);
      var ser = document.getElementById("ser"+c);
      var num = document.getElementById("num"+c);
    }
    else {
      var fio = document.getElementById("fio");
      var birth = document.getElementById("birth_date");
      var ser = document.getElementById("ser");
      var num = document.getElementById("num");
    }

    if ((fio.value.length == 0) && (birth.value.length == 0) && (ser.value.length == 0) && (num.value.length == 0)) {
      c--;
    }
    else
    {
      j++;
      drv = drv+"&fio"+j+"="+encodeURIComponent(fio.value)+"&birth"+j+"="+encodeURIComponent(birth.value)+"&ser"+j+"="+encodeURIComponent(ser.value)+"&num"+j+"="+encodeURIComponent(num.value);
      c--;
    }
  }

  req = req+"&drv_count="+encodeURIComponent(j)+drv;
 }
 else
 {
  req = req+"&drv_count="+encodeURIComponent(0);
 }

 //alert(req);
 
 var http = CreateHTTP();

 if (!http) {
  alert("Не удалось создать PROXY-объект для запроса данных!");
  return;
 }
 
 http.open('POST', 'result.php', true);
 http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=windows-1251');

 http.send(req);

 http.onreadystatechange = function() {
   if (http.readyState == 4) {
     if (http.status == 200) {
      ShowResult(http.responseText);
     }
     else {
       alert("Ошибка сервера "+http.status+"!");
     }
   }
 };

 Timer();
}

function Timer1() {
 var btn = document.getElementById("hist");

 if (btn.value == "История") {
   btn.value = 20;
 }
 else {
   btn.value--;
 }

 if (btn.value == 1) {
   btn.disabled = false;
   btn.value = "История";
 }
 else {
   btn.disabled = true;
   setTimeout(Timer1, 1000);
 }

 return;
}

function Submit1() {
 var RsaId = window.prompt("Идентификатор запроса КБМ/ТО:", "");

 if (RsaId.length == 0) {
  alert("Не указан идентификатор запроса РСА!");
  return;
 }

 var req = "rsa_id="+encodeURIComponent(RsaId);
 
 var http = CreateHTTP();

 if (!http) {
  alert("Не удалось создать PROXY-объект для запроса данных!");
  return;
 }

 http.open('POST', 'result_h.php', true);
 http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=windows-1251');

 http.send(req);

 http.onreadystatechange = function() {
   if (http.readyState == 4) {
     if (http.status == 200) {
      ShowResult(http.responseText);
     }
     else {
       alert("Ошибка сервера "+http.status+"!");
     }
   }
 };

 Timer1();
}

function GoHome() {
  window.open("http://ibs.sngi.ru", "_top");
}