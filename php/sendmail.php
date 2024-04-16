<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require "PHPMailer/src/Exception.php";
    require "PHPMailer/src/PHPMailer.php";
    require 'PHPMailer/src/SMTP.php';

    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();                                            
        $mail->Host = 'smtp.gmail.com';                     
        $mail->SMTPAuth = true;                                   
        $mail->Username = "arsenal.building.info@gmail.com";                    
        $mail->Password = "eept mqgw dvki fxaw";                               
        $mail->SMTPSecure = "TLS";            
        $mail->Port = 587;

        $mail->setFrom("arsenal.building.info@gmail.com", "ООО Арсенал");
        $mail->addAddress("lakhnov.ka@phystech.edu");     

        $body = "<h1>Квитанция об оформлении заказа в ООО \"АРСЕНАЛ\"</h1>";
        $body .= "<p><strong>ФИО: </strong>".$_POST["name"]."</p>";
        $body .= "<p><strong>Телефон: </strong>".$_POST["phone"]."</p>";
        
        $mail->isHTML(true);                                  
        $mail->Subject = "Квитанция об оформлении заказа";
        $mail->Body = $body;
        
        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
?>