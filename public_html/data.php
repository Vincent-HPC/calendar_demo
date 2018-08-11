<?php  
// include('../db.php');


// try {
//   $pdo = new PDO("mysql:host=$db[host];dbname=$db[dbname];port=$db[port];charset=$db[charset]",
//     $db['username'],$db['password']);
// } catch(PDOException $e) {
//   echo "Database connection failed.";
//   exit;
// }

$dates = [];
for ($i = 1; $i <= 31; $i++) {
  $dates[] = $i;
}

$dates[] = null;
$dates[] = null;
$dates[] = null;
$dates[] = null;

?>
