<?php
	//error_reporting(E_ALL);
	$player = intval($_POST['player']);
	
	if (is_int($player)) {
		$host = 'localhost';
		$database = '';
		$username = '';
		$password = '';
		
		$conn = new mysqli($host, $username, $password, $database);
	 
		// check connection
		if ($conn->connect_error) {
			//trigger_error('Database connection failed: '  . $conn->connect_error, E_USER_ERROR);
		}
		
		$sql = "SELECT id, frequency FROM win WHERE player = '$player'";
 
		$rs = $conn->query($sql);
		if($rs === false) {
			//trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);
		}
		$rs->data_seek(0);
		$row = $rs->fetch_assoc();
		$id = $row['id'];
		$frequency = intval($row['frequency']) + 1;
		
 
		$sql = "UPDATE win SET frequency='$frequency' WHERE id = '$id'";
		 
		if($conn->query($sql) === false) {
			//trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);
		}

	
	} else {
		die('No cheating!');
	}
	
	
	