<?php
		//error_reporting(E_ALL);
		$host = 'localhost';
		$database = '';
		$username = '';
		$password = '';
		
		$conn = new mysqli($host, $username, $password, $database);
	 
		// check connection
		if ($conn->connect_error) {
			//trigger_error('Database connection failed: '  . $conn->connect_error, E_USER_ERROR);
		}
		
		$sql = "SELECT player, frequency FROM win";

		$rs = $conn->query($sql);
		if($rs === false) {
			//trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);
		}
		$rs->data_seek(0);
		
		$data = array(); 
		while ($row = $rs->fetch_assoc()) {
			$data[$row['player']] = $row['frequency'];
		}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta content="charset=utf-8">
	<title>Seventeen</title>
	<script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript">
      google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Team', 'Frequency'],
          ['Computer',     <?php echo $data[0]; ?>],
          ['Player',      <?php echo $data[1]; ?>],
          ['Tie',  <?php echo $data[9]; ?>]
        ]);

        var options = {
          title: 'Win Distribution'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
      }
    </script>
	
</head>
<body>
    <div id="piechart" style="width: 900px; height: 500px;"></div>
  </body>
</html>
 



	