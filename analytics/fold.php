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
		
		$sql = "SELECT count, player, frequency FROM fold_count";

		$rs = $conn->query($sql);
		if($rs === false) {
			//trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);
		}
		$rs->data_seek(0);
		
		$data = array(); 
		while ($row = $rs->fetch_assoc()) {
			$data[$row['player']][$row['count']] = $row['frequency'];
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
          ['Count', 'Computer', 'Player'],
          <?php
			for($i = 1; $i <= 17; $i++) {
				echo "\t\t['" . $i . "', " . $data[0][$i] . ", " . $data[1][$i] . "],\n";
			}
		  ?>
        ]);

        var options = {
          title: 'Score When Folded',
          hAxis: {title: 'Score', titleTextStyle: {color: 'red'}}
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
    </script>
	
</head>
<body>
    <div id="chart_div" style="width: 900px; height: 500px;"></div>
  </body>
</html>
 



	