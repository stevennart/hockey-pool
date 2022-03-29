<?php

include './database.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

$sql = "SELECT * FROM Prizes WHERE IsClaimed=0";
$prizes_arr = array();
$result = $conn->query($sql);
$prizes;

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Ensure $row[''] field/column names of the database in mySQL matches, otherwise undefined field errors will appear.
        // utf8_encode() for the string properties otherwise calling json_encode without the utf8_encode will cause it to fail and throw a 5 = JSON_ERROR_UTF8
        // https://www.php.net/manual/en/function.json-last-error.php
        $prizes_arr[] = array('prizeID' => intval($row['ID']), 'prizeName' => utf8_encode($row['Name']), 'prizeImage' => utf8_encode($row['Image']), 'isClaimed' => intval($row['IsClaimed']));

    }
    $prizes = json_encode($prizes_arr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    echo $prizes;
}

$conn->close();
