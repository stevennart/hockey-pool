<?php
include "database.php";

$isCorrectCode;
$allPrizeCodes = [];
$hasPrizeCode;

$data = json_decode(file_get_contents('php://input', true));
$prizeCode = ($data->postcode);

function checkCode($_prizeCode, $_allPrizeCodes)
{
    // prize code and array of prize codes from database are passed in.
    // Will return true if code is in DB, false if not.
    return $hasPrizeCode = in_array($_prizeCode, $_allPrizeCodes);
}

// query to grab all the codes from the database.
$select = "SELECT Code FROM Rankings";
$codeResult = $conn->query($select);

// Only fetch if there are existing rows from the database.
if ($codeResult->num_rows > 0) {
    // if there is data/row fetching each code and storing into array.
    $i = 0;
    while ($row = $codeResult->fetch_assoc()) {
        $allPrizeCodes[$i] = $row['Code'];
        $i++;
    }

    // Will return true or false.
    $isCorrectCode = checkCode($prizeCode, $allPrizeCodes);

    // Have to do this because if boolean is true it will return 1 if it's false it will return "" /an empty/null
    // echo will return a boolean type not a string of true or false.
    echo $isCorrectCode ? 'true' : 'false';

} else {
    echo "No Rows Found";
}
