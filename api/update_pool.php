<?php

include './database.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

try {

    $data = json_decode(file_get_contents('php://input', true));
    $updateType = $data->updateType;
    $value = $data->value;

    if ($updateType === "registerStatus") {
        $value = $value ? 1 : 0;
        $stmt = "UPDATE Pool SET isClosed=$value WHERE ID=1";
    } else if ($updateType === "registerLink") {
        // ensure value for registrationLink has ' ' around it to convert it to a string.
        $stmt = "UPDATE Pool SET registrationLink='$value' WHERE ID=1";
    }

    $result = $conn->query($stmt);
    echo ($result) ? 'true' : 'false';

} catch (Exception $e) {
    throw $e;
}

// closes the DB connection thats initialized in database.php
$conn->close();
