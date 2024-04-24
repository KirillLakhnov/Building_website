<?php
    $host = "37.140.192.11";
    $db_name = "u2597299_default";
    $user = "u2597299_arsenal"; 
    $password = "123-fghtyv-366-AQWE";

    $connection = mysqli_connect($host, $user, $password, $db_name);
    if (!$connection) 
    {
    	die('<p style="color:red">'.mysqli_connect_errno().' - '.mysqli_connect_error().'</p>');
	}
	if (!mysqli_set_charset($connection, "utf8")) 
	{
        die("Ошибка при загрузке набора символов utf8: ".mysqli_error($connection));
    }

    $products = json_decode($_POST["products_in_card"], true);
    $len_products = count($products);

    for($i = 0; $i < $len_products; $i++)
    {
        $new_number = $products[$i]["product"][3] - $products[$i]["number"];
        if($new_number < 0)
        {
            $new_number = 0;
        }
        
        $query = "UPDATE ".$products[$i]["product"][7]." SET Количество=".$new_number." WHERE id=".$products[$i]["product"][0];
        $result = mysqli_query($connection, $query);
        if (!$result) 
        {
    	    die('<p style="color:red">'.mysqli_errno($connection).' - '.mysqli_error($connection).'</p>');
	    }
    }

    $order = "";
    for($i = 0; $i < $len_products; $i++)
    {
        $order .= "Наименование: ".$products[$i]["product"][1]."\nКоличество: ".$products[$i]["number"]."\n\n";
    }

    if(trim(!empty($_POST["city"])))
    {
        $query = "INSERT INTO `Заказы` (`ФИО`, `Email`, `Телефон`, `Доставка`, `Город`, `Адрес`, `Заказ`) VALUES (\"".$_POST["name"]."\", \"".$_POST["email"]."\", \"".$_POST["phone"]."\",\"Доставка магазина\", \"".$_POST["city"]."\", \"".$_POST["address"]."\", '".$order."');";
        $result = mysqli_query($connection, $query);
        if (!$result) 
        {
    	    die('<p style="color:red">'.mysqli_errno($connection).' - '.mysqli_error($connection).'</p>');
	    }
    }
    else
    {
        $query = "INSERT INTO `Заказы` (`ФИО`, `Email`, `Телефон`, `Доставка`, `Город`, `Адрес`, `Заказ`) VALUES (\"".$_POST["name"]."\", \"".$_POST["email"]."\", \"".$_POST["phone"]."\",\"Самостоятельно\", NULL, NULL, '".$order."');";
        $result = mysqli_query($connection, $query);
        if (!$result) 
        {
    	    die('<p style="color:red">'.mysqli_errno($connection).' - '.mysqli_error($connection).'</p>');
	    }
    }
    
    mysqli_close($connection);
?>