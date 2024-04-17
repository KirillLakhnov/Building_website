<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require "PHPMailer/src/Exception.php";
    require "PHPMailer/src/PHPMailer.php";
    require 'PHPMailer/src/SMTP.php';

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
        $mail->addAddress($_POST["email"]);     

        $body = "<h1>Квитанция об оформлении заказа в ООО \"АРСЕНАЛ\"</h1>";
        $body .= "<p><strong>ФИО: </strong>".$_POST["name"]."</p>";
        $body .= "<p><strong>Телефон: </strong>".$_POST["phone"]."</p>";

        if(trim(!empty($_POST["city"])))
        {
            $body .= "<p><strong>Доставка будет осуществляться CDEK'ом по адресу: 
                      </strong>".$_POST["city"].", ".$_POST["address"]."</p>";
        }
        else
        {
            $body .= "<p><strong>Товар будет ждать вас по адресу: </strong>Владимирская обл.,
            Меленки, ул. Коминтерна д. 109А <strong>(Самовывоз)</strong></p>";
        }

        $products = json_decode($_POST["products_in_card"], true);
        $len_products = count($products);
        $total_price = 0;

        $body .= "<table border=5px>
                    <tr>
                        <th>Наименование</th>
                        <th>Количество</th>
                        <th>Цена(руб/шт)</th>
                    </tr>";
        for($i = 0; $i < $len_products; $i++)
        {
            $body .= "<tr>
                        <td>".$products[$i]["product"][2]."</td>
                        <td>".$products[$i]["number"]."</td>
                        <td>".$products[$i]["product"][3]."</td>
                    </tr>";
                    
            $total_price += $products[$i]["product"][3]*$products[$i]["number"];
        }
        $body .= "</table>";
        
        $body .= "<p><strong>Итоговая цена: </strong>".$total_price."руб</p>";

        $mail->isHTML(true);                                  
        $mail->Subject = "Квитанция об оформлении заказа";
        $mail->Body = $body;
        
        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
?>