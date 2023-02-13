<?php
	$fname = $_POST['first_name'];
	$phone = $_POST['pnumber'];
	$email = $_POST['em'];
	$dis = $_POST['discus'];
	
	$to = "deepa.chouhan@himanshusofttech.com";
	$subject = "Industry Single Page Template";
	$msg="Hi Admin..<p>".$fname." has sent a query. User's Phone No ".$phone." email id as ".$email."</p><p> and users discussion topic is : ".$dis."</p>";
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
	$headers .= 'From: <support@industry.com>' . "\r\n";

	echo mail($to,$subject,$msg,$headers);
?>