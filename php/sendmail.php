<? php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require "PHPMailer-6.9.1/src/Exception.php";
    require "PHPMailer-6.9.1/src/PHPMailer.php";

    $mail = new PHPMailer(true);
    $mail->CharSet = "UTF-8";
    $mail->setLanguage("ru", "PHPMailer-6.9.1/language/");
    $mail->IsHTML(true);

    $mail->setFrom("arsenal_building@info.ru", "ООО Арсенал");
    $mail->addAddress("lakhnov.ka@phystech.edu");
    $mail->Subject = "Квитанция об оформлении заказа";

    $body = "<h1>Квитанция об офрмлении вашего заказа</h1>";

    if(trim(!empty($_POST["name"]))){
        $body. = "<p><strong>ФИО:</strong> " .$_POST["name"]."</p>"
    }

    $mail->Body = $body;

    if(!$mail->send())
    {
        $message = "Ошибка";
    }
    else
    {
        $message = "Данные отправлены!";
    }

    $response = ["message" => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>