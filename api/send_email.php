<?php
// require_once 'Mail/Queue.php';

require_once 'database.php';
require_once 'Mail.php';

// These 2 lines are used for reporting errors if one does occur.
ini_set('display_errors', 1);
error_reporting(E_ALL);

$data = json_decode(file_get_contents('php://input', true));
$emailOrder = $data->postorder;

define("FROM_NAME", "Federated Health Charities Hockey Pool");
define("FROM_MAIL", "");

define("IMAP_HOST", "imap.mydomain.com");
define("IMAP_SENT_MAILBOX", "{" . IMAP_HOST . "}INBOX.Sent");

define("SMTP_HOST", "ssl://smtp.mydomain.com");
define("SMTP_PORT", "465");
define("SMTP_AUTH", "PLAIN");
define("SMTP_USER", "");
define("SMTP_PW", get_cfg_var("hockeypool.smtp_password"));
define("CC", "");
define("BCC", "");

//Generating the code
function setGeneratedCode()
{
    $randomResult = "";
    $length = 8;
    $characters = array_merge(range('A', 'Z'), range('a', 'z'), range('0', '9'));
    $max = count($characters) - 1;
    for ($j = 0; $j < $length; $j++) {
        $rand = mt_rand(0, $max);
        $randomResult .= $characters[$rand];
    }
    return $randomResult;
}

//Testing if code is unique
function getGeneratedCode($codeDB)
{
    $codeGenerated = setGeneratedCode();
    while (in_array($codeGenerated, $codeDB)) {
        if (in_array($codeGenerated, $codeDB)) {
            $codeGenerated = setGeneratedCode();
        }
    }
    return $codeGenerated;
}

// Saves a copy of the sent email in the SENT box of the mail server
function saveSentMail($_headers, $_message)
{
    $stringHeaders = "";
    foreach ($_headers as $key => $value) {$stringHeaders .= $key . ":" . $value . "\r\n";}
    $sentEmail = $stringHeaders . "\r\n" . $_message;

    $stream = imap_open(IMAP_SENT_MAILBOX, SMTP_USER, SMTP_PW);
    imap_append($stream, IMAP_SENT_MAILBOX, $sentEmail);
    imap_close($stream);
}

//Sending email
function sendEmail($emailHead, $winnerName, $prizeCode, $link)
{
    $smtp_mail = Mail::factory('smtp', array(
        "host" => SMTP_HOST,
        "port" => SMTP_PORT,
        "auth" => SMTP_AUTH,
        "username" => SMTP_USER,
        "password" => SMTP_PW,
    ));

    $to = $emailHead;
    // Is needed so that BCC or CC works when the mail is sent out. Otherwise it won't go through and just goes to the "To:" person.
    $recipients = $emailHead . ", " . BCC;

    // HEADERS CONFIGURATION
    $headers = array(
        "Reply-To" => FROM_MAIL,
        "Return-Path" => FROM_MAIL,
        "To" => $to,
        "From" => FROM_NAME . " <" . FROM_MAIL . ">",
        "Subject" => "ITS NHL Playoff Hockey Pool " . date("Y") . " Winner - " . $winnerName,
        "Bcc" => BCC,
        "MIME-Version" => 1.0,
        "Content-type" => "text/html; charset=UTF-8",
        "X-Priority" => 3,
        "X-Mailer" => "PHP " . phpversion(),
        "User-Agent" => $_SERVER['HTTP_USER_AGENT'],
    );

    $message = "<html><body>";
    $message .= "<img style='display: block; margin: auto; max-width: 256px' alt='Stanley Cup Logo' src='https://hockeypool.frankverbari.com/images/logo.png'>";
    $message .= "<p>Hi " . $winnerName . ",</p>";
    $message .= "<p><strong>CONGRATULATIONS!</strong></p>";
    $message .= "<p>You placed in the top third of this year's pool. </p>";
    $message .= "With that, you have qualified for one of the many prizes available.<p>Please visit the Prizes page of our ITS FedHealth Hockey Playoff Pool Site, click the prize you wish to claim and use the code: <strong style='font-size: 18px;'>" . $prizeCode . "</strong> to claim your prize.</p>";
    $message .= "<p>On behalf of Commissioners Frank and Nino, “Stick Taps” and congratulations once again for making this year’s Federated Health Playoff Pool the most successful one yet! </p>";
    $message .= "<p>We hope to see you again next year.</p>";
    $message .= "<p><strong>Federated Health Playoff Pool Commissioners</strong></p>";
    $message .= "<p>Frank Verbari and Nino Apostoli</p>";
    $message .= "</body></html>";

    $retval = $smtp_mail->send($recipients, $headers, $message);
    saveSentMail($headers, $message);
    return $retval ? 'true' : $retval;
}

//Sending Prize Details  email with prize name, also cc Frank and Nino
function sendWinnerPrize($emailWinner, $winnerName, $prizeName, $prizeImage)
{
    $smtp_mail = Mail::factory('smtp', array(
        "host" => SMTP_HOST,
        "port" => SMTP_PORT,
        "auth" => SMTP_AUTH,
        "username" => SMTP_USER,
        "password" => SMTP_PW,
    ));

    $to = $emailWinner;
    // Is needed so that BCC or CC works when the mail is sent out. Otherwise it won't go through and just goes to the "To:" person.
    $recipients = $emailWinner . ", " . CC;

    $headers = array(
        "Reply-To" => FROM_MAIL,
        "Return-Path" => FROM_MAIL,
        "To" => $to,
        "From" => FROM_NAME . " <" . FROM_MAIL . ">",
        "Subject" => "ITS NHL Playoff Hockey Pool " . date("Y") . " Prize - " . $winnerName,
        "Cc" => CC,
        "MIME-Version" => 1.0,
        "Content-type" => "text/html; charset=UTF-8",
        "X-Priority" => 3,
        "X-Mailer" => "PHP " . phpversion(),
        "User-Agent" => $_SERVER['HTTP_USER_AGENT'],
    );

    $message = "<html><body>";
    $message .= "<img style='display: block; margin: auto; max-width: 256px' alt='Stanley Cup Logo' src='https://hockeypool.frankverbari.com/images/logo.png'>";
    $message .= "<p>Hi " . $winnerName . ",</p>";
    $message .= "<p>Thanks for shooting and scoring for such a great cause and congratulations on finishing in the top third of this year's annual Federated Health Playoff Hockey Pool! You have selected <strong>" . $prizeName . "</strong> as your prize.  We hope you enjoy your selection. </p>";
    $message .= "<img style='display: block; margin: auto; max-width: 256px' alt='" . $prizeName . "' src='" . $prizeImage . "'>";
    $message .= "<p>Please contact either Commissioner Frank or Commissioner Nino to make arrangements to collect your prize.</p>";
    $message .= "<p>Congratulations!</p>";
    $message .= "<p><strong>Federated Health Playoff Pool Commissioners</strong></p>";
    $message .= "<p>Frank Verbari and Nino Apostoli</p>";
    $message .= "</body></html>";

    $retval = $smtp_mail->send($recipients, $headers, $message);
    saveSentMail($headers, $message);
    return $retval ? 'true' : $retval;
}

//When emails are first sent, the ranked 1 winner is sent with the code
if ($emailOrder == 0) {

    $emails = $data->postemails;
    $names = $data->postnames;

    //Clear the table on new submit
    $sql = "DELETE FROM Rankings";
    $conn->query($sql);
    //----------------------------------
    for ($i = 0; $i < sizeof($emails); $i++) {
        $rank = $i + 1;
        //get generated code - make unique
        $codeArray = array();
        $select = "SELECT Code FROM Rankings";
        $codeResult = $conn->query($select);
        $count = 0;
        // ------------------------------
        if ($codeResult->num_rows > 0) {
            while ($row = $codeResult->fetch_assoc()) {
                $codeArray[$count] = $row['Code'];
                $count++;
            }
        }
        // ------------------------------
        $generatedCode = getGeneratedCode($codeArray);
        // Insert email send meta info to Rankings DB.
        $insert = "INSERT INTO Rankings(Rank, Email, Code, Name) VALUES('" . $rank . "', '" . $emails[$i] . "', '" . $generatedCode . "', '" . $names[$i] . "')";
        $conn->query($insert);
    }
    // -----------------------------------------

    // Send Email using info from Rankings DB.
    $select = "SELECT * FROM Rankings";
    $emailResult = $conn->query($select);
    $row = $emailResult->fetch_assoc();
    $emailHead = $row['Email'];
    $prizeCode = $row['Code'];
    $winnerName = $row['Name'];
    $link = "";

    echo $retval = sendEmail($emailHead, $winnerName, $prizeCode, $link);
}

//Picks a prize, remove from list and move to the second winner and send the code and so on
if ($emailOrder == 1) {

    $codeWinner = $data->postwinnercode;
    $prizeID = $data->postprizeid;
    $imageTitle = $data->postimg;
    $imageSrc = $data->postimgsrc;

    // Claims the prize by setting it in the DB.
    $update = "UPDATE Prizes SET IsClaimed=1 WHERE ID=$prizeID";
    $conn->query($update);
    // ------------------------------

    $selectWinner = "SELECT Email,Name FROM Rankings where Code='" . $codeWinner . "'";
    $winnerResult = $conn->query($selectWinner);

    $row = $winnerResult->fetch_assoc();
    $emailWinner = $row['Email'];
    $nameWinner = $row['Name'];

    // SEND PRIZE CONGRATS TO WINNER
    // returns true or an error
    $sentMail = sendWinnerPrize($emailWinner, $nameWinner, $imageTitle, $imageSrc);
    // ------------------------------

    // Removes winner from RANKINGS with the prize code they entered.
    $delete = "DELETE FROM Rankings where Code='" . $codeWinner . "'";
    $conn->query($delete);
    // SENDS IT TO THE NEXT WINNER DOWN THE LINE.
    $select = "SELECT * FROM Rankings";
    $result = $conn->query($select);

    if ($result->num_rows >= 1) {
        // Sends mail to next person if there is one, otherwise don't send.
        $row = $result->fetch_assoc();
        $emailHead = $row['Email'];
        $newWinner = $row['Name'];
        $generatedCode = $row['Code'];
        $link = "http://hockeypool.frankverbari.com/prizes.php";

        $retval = sendEmail($emailHead, $newWinner, $generatedCode, $link);
        echo $retval;
    } else {
        echo $sentMail;
    }

}
