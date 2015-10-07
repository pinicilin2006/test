<?php
  function isnull($text, $if_null, $need_conv) {
    if (isset($text)) {
      if (strlen($text) > 0) {
	if ($need_conv == 1) {
	  return iconv("UTF-8", "cp1251", $text);
	} else {
	  return $text;
	}
      }
    }

    return $if_null;
  }

  $rsa_id = $_POST["rsa_id"];
  
  if ((!isset($rsa_id)) || (strlen($rsa_id) == 0)) {
    $msg = "�� ������������� ������� ���!";
    $err = 1;
  }
  else {
    $msg = "";
    $err = 0;
  }

  $c_date = date("r");
  
  $html = '
<HTML xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" lang="ru">
  <HEAD>
    <META http-equiv="Content-Type" content="text/html; charset=windows-1251">
    <META http-equiv="Author" content="Shubkin E.B. aka Conner">
    <META http-equiv="Last-Modified" content="'.$c_date.'">
    <META http-equiv="Pragma" content="no-cache">

    <META name="description" content="������� ������� ������ �� ��� �/��� ����������� �� � ��� ���">

    <LINK type="text/css" href="style.css" rel="stylesheet">

    <TITLE>������� ������� ���/�� � ��� ���</TITLE>
  </HEAD>

  <BODY>
    <TABLE id=TblRes width=100% height=100% border=0 valign=top cellpadding=0 cellspacing=0>
      <TR height=70px>
	<TD align=left valign=middle width=280px><IMG src="images/logo.png" alt="Logo" height=70px width=274px></TD>
	<TD align=right valign=middle>
	  <A href="javascript:window.print()" title="���������� ��������"><IMG src="images/print_printer.png" alt="Print" height=20px width=20px></A>
	</TD>
      </TR>
      <TR>
	<TD colspan=2 align=left valign=top>
  ';
  
  // Query data from AIS RSA
  if ($err != 1) {
    include ('./connector.inc');

    $sql_txt = "SELECT  DECODE(UPPER(AC.REQUEST_TYPE), 'TICKET', 1, 'KBM', 0, -1) AS RT,
			P.PACKAGE_ID AS ID,
			NVL(LC.DRIVER_RESTRICTION, 0) AS LIM,
			TO_CHAR(P.STATUS_DATE, 'DD.MM.YYYY') AS DAT,
			NVL(LCI.VIN, '<�� ������>') AS VIN,
			NVL(LCI.BODY_NUMBER, '<�� ������>') AS BODY_NUM,
			NVL(LCI.CHASSIS_NUMBER, '<�� ������>') AS CHASSIS_NUM,
			NVL(LO.NAME, '<�� ������>') AS OWN_NAME,
			NVL(LO.IS_PHY, -1) AS IS_PHY,
			NVL(TO_CHAR(LO.DATE_BIRTH, 'DD.MM.YYYY'), '<�� �������>') AS OWN_BIRTH,
			NVL(LO.INN, '<�� ������>') AS OWN_INN
		FROM    AIS_RSA.PACKAGES P,
			AIS_RSA.A_CALC AC,
			AIS_RSA.L_CALC LC,
			(SELECT PH.L_PHYSICAL_PERSON_ID AS PERSON_ID,
				1 AS IS_PHY,
				PH.FIO AS NAME,
				PH.DATE_BIRTH,
				NULL AS INN
			 FROM   AIS_RSA.L_PHYSICAL_PERSON PH
			 UNION ALL
			 SELECT JU.L_JUDICAL_PERSON_ID AS PERSON_ID,
				0 AS IS_PHY,
				JU.NAME,
				NULL AS DATE_BIRTH,
				JU.INN
			 FROM   AIS_RSA.L_JUDICAL_PERSON JU) LO,
			AIS_RSA.L_CAR_IDENT LCI
		WHERE
			(P.RSA_ID = '".$rsa_id."') AND
			(P.PACKAGE_ID = AC.PACKAGE_ID) AND
			(AC.PACKAGE_ID = LC.PACKAGE_ID) AND
			(LCI.L_CAR_IDENT_ID(+) = LC.CAR_IDENT_ID) AND
			(LO.PERSON_ID(+) = LC.CAR_OWNER_ID)
	       ";

    $sql_txt = str_replace(chr(13), " ", $sql_txt);
    $sql = oci_parse($conn, $sql_txt);
    oci_execute($sql, OCI_DEFAULT);

    if (!oci_fetch($sql)) {
      oci_close($conn);
      $err = 1;
      $msg = "������ ��� ������� � ��������������� '".$rsa_id."' �� ������� � �����!";
    }
    else {
      $type = oci_result($sql, "RT");
      $id = oci_result($sql, "ID");
      $lim = oci_result($sql, "LIM");
      $date_q = oci_result($sql, "DAT");
      $own_name = oci_result($sql, "OWN_NAME");
      $own_birth = oci_result($sql, "OWN_BIRTH");
      $own_inn = oci_result($sql, "OWN_INN");
      $vin = oci_result($sql, "VIN");
      $body_num = oci_result($sql, "BODY_NUM");
      $chassis_num = oci_result($sql, "CHASSIS_NUM");
      $is_phy = oci_result($sql, "IS_PHY");
      
      if ($type == 0) {
	$ts = '���';
      } else if ($type == 1) {
	$ts = '��';
      }
      else {
	oci_close($conn);
	$err = 1;
	$msg = "������ � ��������������� '".$rsa_id."' �� �������� �������� ���/��!";
      }

      if ($err != 1) {
	if ($lim != 0) {
	  $l = "���";
	}
	else {
	  $l = "��";
	}

	$kbm = null;
	$kbm_val = null;
	$loss = null;
	$prev_pol_info = null;
	$ticket_exists = 0;
	$date_next_to = null;
	$ticket_num = null;
	$ticket_date = null;
	$kbm_id = null;
	$to_id = null;
	$drv_count = 0;

	// request KBM info
	if ($type != 1) {
	  $sql_txt = "
	  SELECT C.POLICY_KBM, C.POL_SER, C.POL_NUM, C.INSURER_NAME,
		 REPLACE(TO_CHAR(C.POLICY_KBM_VALUE), ',', '.') AS POLICY_KBM_VALUE,
		 P.RSA_ID AS KBM_ID,
		 ".((($lim == 0) && ($type != 1))?"TRIM(TO_CHAR(SUBSTR(P.RESP_XML, INSTR(UPPER(P.RESP_XML), '<LOSSAMOUNT>')+12, INSTR(UPPER(P.RESP_XML), '</LOSSAMOUNT>')-INSTR(UPPER(P.RESP_XML), '<LOSSAMOUNT>')-12)))":"NULL")." AS POLICY_LOSS
	  FROM   AIS_RSA.A_CALC C,
		AIS_RSA.PACKAGES P
	  WHERE
	       (C.PACKAGE_ID = ".$id.") AND
	       (UPPER(C.REQUEST_TYPE) = 'KBM') AND
	       (C.PACKAGE_ID = P.PACKAGE_ID)
	  ";

	  $sql_txt = str_replace(chr(13), " ", $sql_txt);
	  $sql = oci_parse($conn, $sql_txt);
	  oci_execute($sql, OCI_DEFAULT);

	  if (oci_fetch($sql)) {
	    $kbm = oci_result($sql, "POLICY_KBM");
	    $kbm_val = oci_result($sql, "POLICY_KBM_VALUE");
	    $prev_pol_info = "�".oci_result($sql, "POL_SER")." ".oci_result($sql, "POL_NUM").", �� ".oci_result($sql, "INSURER_NAME");
	    $kbm_id = oci_result($sql, "KBM_ID");
	    $loss = oci_result($sql, "POLICY_LOSS");
	  }
	  else {
	    $msg = "������ ���: fetch error!";
	    $err = 1;
	    oci_close($conn);
	  }

	  if (($err != 1) && ($lim != 0)) {
	    $sql_txt = "
	      SELECT LP.FIO, TO_CHAR(LP.DATE_BIRTH, 'DD.MM.YYYY') AS BIRTH, D.KBM_NEXT_LEVEL AS KBM, D.KBM_FIRST_LEVEL AS KBM_FIRST,
		     REPLACE(TO_CHAR(D.KBM_VALUE), ',', '.') AS KBM_VALUE, D.LOSS_AMOUNT AS LOSS,
		     DC.SER, DC.NUM
	      FROM   AIS_RSA.A_DRIVER D,
		     AIS_RSA.L_PHYSICAL_PERSON LP,
		     AIS_RSA.L_PHYSICAL_DOC DC
	      WHERE
		    (D.PACKAGE_ID = ".$id.") AND
		    (D.L_PHYSICAL_PERSON_ID = LP.L_PHYSICAL_PERSON_ID) AND
		    (DC.L_PHYSICAL_PERSON_ID = D.L_PHYSICAL_PERSON_ID) AND
		    (DC.RSA_DOC_ID IS NULL)
	    ";

	    $sql_txt = str_replace(chr(13), " ", $sql_txt);
	    $sql = oci_parse($conn, $sql_txt);
	    oci_execute($sql, OCI_DEFAULT);

	    $err = 1;
	    $i = 0;
	    while (oci_fetch($sql)) {
	      $err = 0;
	      $drv[$i]["fio"] = oci_result($sql, "FIO");
	      $drv[$i]["birth"] = oci_result($sql, "BIRTH");
	      $drv[$i]["kbm"] = oci_result($sql, "KBM");
	      $drv[$i]["kbm_first"] = oci_result($sql, "KBM_FIRST");
	      $drv[$i]["kbm_val"] = oci_result($sql, "KBM_VALUE");
	      $drv[$i]["loss"] = oci_result($sql, "LOSS");
	      $drv[$i]["ser"] = oci_result($sql, "SER");
	      $drv[$i]["num"] = oci_result($sql, "NUM");
	      
	      $i++;
	      $drv_count++;
	    }
	    if ($err == 1) {
	      oci_close($conn);
	      $msg = "������ ���: fetch error!!";
	    }
	  }
	}

	// Request TO info
	if (($type != 0) && ($err == 0)) {
	  $sql_txt = "
	    SELECT C.TICKET_EXISTED, TO_CHAR(C.DATE_NEXT_TO, 'DD.MM.YYYY') AS DATE_NEXT_TO, C.TICKET_SER, C.TICKET_NUM, TO_CHAR(C.TICKET_DIAG_DATE, 'DD.MM.YYYY') AS TICKET_DATE,
		   (SELECT P.RSA_ID
		    FROM   AIS_RSA.PACKAGES P
		    WHERE
			   (P.PACKAGE_ID = C.PACKAGE_ID)) AS TO_ID
	    FROM   AIS_RSA.A_CALC C
	    WHERE
		   (C.PACKAGE_ID = ".$id.")
	  ";

	  $sql_txt = str_replace(chr(13), " ", $sql_txt);
	  $sql = oci_parse($conn, $sql_txt);
	  oci_execute($sql, OCI_DEFAULT);

	  if (!oci_fetch($sql)) {
	    $err = 1;
	    $msg = "������ ��: fetch error!";
	  }
	  else {
	    $ticket_exists = oci_result($sql, "TICKET_EXISTED");
	    $date_next_to = oci_result($sql, "DATE_NEXT_TO");

	    $ticket_num = oci_result($sql, "TICKET_SER")." ".oci_result($sql, "TICKET_NUM");
	    $ticket_date = oci_result($sql, "TICKET_DATE");
	    $to_id = oci_result($sql, "TO_ID");
	  }
	}
      }
    }
    
    // Close ORACLE connection
    if ($err == 0) {
      oci_close($conn);
    }
  }

  // Create result
  if ($err == 0) {
    $html .= "
      <TABLE cols=3 width=610px border=0 valign=top align=left cellpadding=0 cellspacing=0>
	<TR>
	  <TD width=250px>&nbsp;</TD>
	  <TD width=80px>&nbsp;</TD>
	  <TD width=280px>&nbsp;</TD>
	</TR>
	<TR>
	  <TD colspan=3 align=left valign=top>
	    <LABEL>
	      <B>���� �������: </B>".$date_q."&nbsp;&nbsp;&nbsp;
	      <B>��� �������: </B>".$ts."
	    </LABEL>
	  </TD>
	</TR>
	<TR>
	  <TD colspan=3 align=left valign=top>
	    <LABEL><B>������������� ������� ���/��: </B>".$kbm_id.$to_id."</LABEL>
	  </TD>
	</TR>
	<TR>
	  <TD colspan=3 align=left valign=top>
	    <LABEL><B>�������������� ���-�� ���, ���������� � ����������: </B>".$l."</LABEL>
	  </TD>
	</TR>
	<TR>
	  <TD>&nbsp;</TD>
	</TR>
    ";

    if (($type != 1) && ($lim == 0)) {
      $html .= "
	<TR>
	  <TD colspan=3 align=left valign=top>
	    <LABEL><B>����������� ��: </B>".$own_name." (".(($is_phy == 1)?"�.�. ".$own_birth:"��� ".$own_inn).")</LABEL>
	  </TD>
	</TR>
	<TR>
	  <TD>&nbsp;</TD>
	</TR>
      ";
    }

    if (($type != 0) || ($lim == 0)) {
      $html .= "
	<TR>
	  <TD align=left valign=top>
	    <LABEL><B>������������ ��������</B></LABEL><BR>
	    <LABEL>VIN: ".$vin."</LABEL>
	  </TD>
	  <TD colspan=2 align=left valign=top>
	    <LABEL><B>&nbsp;</B></LABEL><BR>
	    <LABEL>&nbsp;</LABEL>
	  </TD>
	</TR>
	<TR>
	  <TD align=left valign=top>
	    <LABEL>����� ������: ".$body_num."</LABEL>
	  </TD>
	  <TD colspan=2 align=left valign=top>
	    <LABEL>����� �����: ".$chassis_num."</LABEL>
	  </TD>
	</TR>
	<TR>
	  <TD>&nbsp;</TD>
	</TR>
      ";
    }

    if ($type != 1) {
      $html .= "
	<TR>
	  <TD align=left valign=top>
	    <LABEL><B>��� ������: </B>".isnull($kbm, "&nbsp;", 0)."</LABEL><BR>
	  </TD>
	  <TD colspan=2 align=left valign=top>
	    <LABEL><B>�������� ��� ������: </B></LABEL>
	    <LABEL>".isnull($kbm_val, "&nbsp;", 0)."</LABEL>
	  </TD>
	</TR>
      ";

      if ($lim == 1) {
	$html .= "
	<TR>
	  <TD colspan=3 align=left valign=top>
	    <LABEL><B>���������� �����: </B></LABEL>
	    <LABEL>".isnull($prev_pol_info, "&nbsp;", 0)."</LABEL>
	  </TD>
	</TR>
	<TR>
	  <TD>&nbsp;</TD>
	</TR>
	";
      }
      else {
	$html .= "
	<TR>
	  <TD colspan=2 align=left valign=top>
	    <LABEL><B>���������� �����: </B></LABEL>
	    <LABEL>".isnull($prev_pol_info, "&nbsp;", 0)."</LABEL>
	  </TD>
	  <TD align=left valign=top>
	    <LABEL><B>���-�� �������: </B>".$loss."</LABEL>
	  </TD>
	</TR>
	<TR>
	  <TD>&nbsp;</TD>
	</TR>
	";

      }
    }

    if ($type != 0) {
      if ($ticket_exists == 1) {
	$te = "����";
      }
      else if ($ticket_exists == 0) {
	$te = "���";
      }
      else {
	$te = "&nbsp;";
      }
      
      $html .= "
	<TR>
	  <TD align=left valign=top>
	    <LABEL><B>����������� ����� ��: </B>".$te."</LABEL><BR>
	    <LABEL>".(($ticket_exists == 1)?" (�".$ticket_num.(($ticket_date == null)?"&nbsp;":" �� ".$ticket_date).")":"&nbsp;")."</LABEL>
	  </TD>
	  <TD colspan=2 align=left valign=top>
	    <LABEL><B>���� ���������� ����������� ��: </B></LABEL><BR>
	    <LABEL>".isnull($date_next_to, "&nbsp;", 0)."</LABEL>
	  </TD>
	</TR>
	<TR>
	  <TD>&nbsp;</TD>
	</TR>
      ";
    }

    if ($drv_count > 0) {
      $html .= "
	<TR>
	  <TD align=left valign=top>
	    <LABEL><B>���������� � ���������� ��</B></LABEL>
	  </TD>
	</TR>
	<TR>
	  <TD colspan=3 align=left valign=top>
	    <TABLE cols=5 width=610px border=1 align=left valign=top cellpadding=0 cellspacing=0>
	      <TR>
		<TD class=drv rowspan=2 width=200px valign=middle align=center>
		  <LABEL>�.�.�.</LABEL>
		</TD>
		<TD class=drv rowspan=2 width=70px valign=middle align=center>
		  <LABEL>���� ��������</LABEL>
		</TD>
		<TD class=drv colspan=2 width=140px valign=middle align=center>
		  <LABEL>������������ �������������</LABEL>
		</TD>
		<TD class=drv colspan=3 width=150px valign=middle align=center>
		  <LABEL>���</LABEL>
		</TD>
		<TD class=drv rowspan=2 width=50px valign=middle align=center>
		  <LABEL>���-�� �������</LABEL>
		</TD>
	      </TR>
	      <TR>
		<TD class=drv width=60px valign=middle align=center>
		  <LABEL>�����</LABEL>
		</TD>
		<TD class=drv width=80px valign=middle align=center>
		  <LABEL>�����</LABEL>
		</TD>
		<TD class=drv width=50px valign=middle align=center>
		  <LABEL>����������</LABEL>
		</TD>
		<TD class=drv width=50px valign=middle align=center>
		  <LABEL>�������</LABEL>
		</TD>
		<TD class=drv width=50px valign=middle align=center>
		  <LABEL>��������</LABEL>
		</TD>
	      </TR>
      ";

      $i = 0;
      while ($i < $drv_count) {
	$html .= "
	      <TR>
		<TD class=drv valign=top align=left>
		  <LABEL>".$drv[$i]["fio"]."</LABEL>
		</TD>
		<TD class=drv valign=top align=center>
		  <LABEL>".isnull($drv[$i]["birth"], "&nbsp;", 0)."</LABEL>
		</TD>
		<TD class=drv valign=top align=left>
		  <LABEL>".$drv[$i]["ser"]."</LABEL>
		</TD>
		<TD class=drv valign=top align=left>
		  <LABEL>".isnull($drv[$i]["num"], "&nbsp;", 0)."</LABEL>
		</TD>
		<TD class=drv valign=top align=center>
		  <LABEL>".isnull($drv[$i]["kbm_first"], "&nbsp;", 0)."</LABEL>
		</TD>
		<TD class=drv valign=top align=center>
		  <LABEL>".isnull($drv[$i]["kbm"], "&nbsp;", 0)."</LABEL>
		</TD>
		<TD class=drv valign=top align=center>
		  <LABEL>".isnull($drv[$i]["kbm_val"], "&nbsp;", 0)."</LABEL>
		</TD>
		<TD class=drv valign=top align=center>
		  <LABEL>".isnull($drv[$i]["loss"], "&nbsp;", 0)."</LABEL>
		</TD>
	      </TR>
	";
	$i++;
      }

      $html .= "
	    </TABLE>
	  </TD>
	</TR>
      ";
    }
    $html .= "
      </TABLE>
    ";
  }
  else
  {
   $html .= "
     <H1>������</H1><BR>
     <LABEL>".$msg."</LABEL>
   ";
  }

  $html .= '
	</TD>
      </TR>
    </TABLE>
  </BODY>
  <HEAD>
    <META http-equiv="Pragma" content="no-cache">
  </HEAD>
</HTML>  
  ';
 
// Output result code
print <<<HERE
$html
HERE;
    
?>