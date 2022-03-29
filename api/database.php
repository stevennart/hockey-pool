 <?php

$hostname = '';
// $hostname = 'localhost';
$username = '';
// Gets the password from the webserver's php.ini
$password = get_cfg_var("");
$database = 'hockeypool_prizes';
// $password = "";

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
    die('Connection error: ' . $conn->connect_error);
}

// header("Access-Control-Allow-Origin: http://localhost:3000");
// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
?>

