<? php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require "PHPMailer/src/Exception.php";
    require "PHPMailer/src/PHPMailer.php";

    $mail = new PHPMailer(true);
    $mail->CharSet = "UTF-8";
    $mail->setLanguage("ru", "PHPMailer-6.9.1/language/");
    $mail->IsHTML(true);

    $mail->Username = "arsenal.building.info@gmail.com";
    $mail->Password = "avrb puxj puow wghs";

    $mail->setFrom("arsenal.building.info@gmail.com", "ООО Арсенал");
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