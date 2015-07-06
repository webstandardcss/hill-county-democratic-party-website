<?php	
	if (is_ajax()) {
		if (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists
			$action = $_POST["action"];
			switch($action) { //Switch case for value of action
				case "test": sendemail(); break;
			}
		}
	}
	
	//Function to check if the request is an AJAX request
	function is_ajax() {
		return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
	}		
	
	function sendemail(){
		$return = $_POST;  
		
		
		$to = "akifquddus@gmail.com"; 
		$from = $_REQUEST['Email']; 
		$name = $_REQUEST['Zip'];  
		$headers = "From: $from"; 
		$subject = "You have a new Democrat Subscriber"; 
	
		$fields = array(); 
		$fields{"Zip"} = "Zip"; 
		$fields{"Email"} = "Email"; 
	
		$body = "Details:\n\n";
		foreach ($fields as $a => $b) {   
			$body .= sprintf("%s: %s\n\n", $b, $_REQUEST[$a]); 
		}

    	$send = mail($to, $subject, $body, $headers);
		
		if ($send) {
			$return["json"] = "<div class='alert alert-success'><strong>Great, Your message has been sent</strong></div>";
			$return["result"] = "success";
			echo json_encode($return);
		} else {
			$return["json"] = "<div class='alert alert-danger'><strong>There is some problem</strong></div>";
			$return["result"] = "danger";
			echo json_encode($return);
		}
	}

?>