<?php  
include('../db.php');


try {
  $pdo = new PDO("mysql:host=$db[host];dbname=$db[dbname];port=$db[port];charset=$db[charset]",
    $db['username'],$db['password']);
} catch(PDOException $e) {
  echo "Database connection failed.";
  exit;
}

$year = date('Y');
$month = date('m');


// load events
$sql = 'SELECT id, title, `date`, start_time FROM events WHERE year=:year AND month=:month ORDER BY `date`, start_time ASC';
$statement = $pdo->prepare($sql);
$statement->bindValue(':year', $year, PDO::PARAM_INT); 
$statement->bindValue(':month', $month, PDO::PARAM_INT); 
$statement->execute();

$events = $statement->fetchAll(PDO::FETCH_ASSOC);
// 10:00:00 > 10:00
foreach ($events as $key => $event) {
  $events[$key]['start_time'] = substr($event['start_time'], 0, 5);
}

// how many days in this month?
$days = cal_days_in_month (CAL_GREGORIAN ,$month ,$year );
// first day is what day in the week?
$firstDateOfTheMonth = new DateTime("$year-$month-1");
// last day is what day in the week?
$lastDateOfTheMonth = new DateTime("$year-$month-$days");

// calendar gray padding~
$frontPadding = $firstDateOfTheMonth->format('w'); // 0 - 6
$backPadding = 6 - $lastDateOfTheMonth->format('w'); 

// fill up front padding
for($i=0; $i < $frontPadding; $i++) {
  $dates[] = null;
}
// fill up 1-31
for($i=1; $i <=$days; $i++) {
  $dates[] = $i;
}
// fill up back padding
for($i=0; $i < $backPadding; $i++) {
  $dates[] = null;
}

?>


<script> // here is sent to action.js
  // print to front-end
  var events = <?= json_encode($events, JSON_NUMERIC_CHECK) ?>;

</script>
