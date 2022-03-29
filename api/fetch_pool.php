<?php

include './database.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

try {

    $type = $_GET["type"];

    // WHERE ID = 1 b/c it should always be only 1 row.
    if ($type === "registerStatus") {
        // grab only the isCLosed field
        $stmt = "SELECT isClosed FROM Pool WHERE ID=1";
        if ($result = $conn->query($stmt)) {
            $row = $result->fetch_assoc();
            $isClosed = $row['isClosed'] ? 'true' : 'false';
            echo $isClosed;
        }
    } else if ($type === "registerLink") {
        // grab only the link field
        $stmt = "SELECT registrationLink FROM Pool WHERE ID=1";
        if ($result = $conn->query($stmt)) {
            $row = $result->fetch_assoc();
            $registrationLink = $row['registrationLink'];
            echo $registrationLink;
        }
    } else if ($type === "all") {
        // grab both fields
        $stmt = "SELECT isClosed, registrationLink FROM Pool WHERE ID=1";
        if ($result = $conn->query($stmt)) {
            $row = $result->fetch_assoc();
            $row['isClosed'] = $row['isClosed'] ? true : false;
            // encodes the string to prevent json_encode failure.
            utf8_encode($row['registrationLink']);
            echo json_encode($row, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        }

    }

} catch (Exception $e) {
    throw $e;
}

// closes the DB connection thats initialized in database.php
$conn->close();
