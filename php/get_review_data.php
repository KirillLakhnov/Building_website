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

    $query = "SELECT * FROM `Отзывы`";
    $result = mysqli_query($connection, $query);
    if (!$result) 
    {
    	die('<p style="color:red">'.mysqli_errno($connection).' - '.mysqli_error($connection).'</p>');
	}
    
    $reviews[] = array();
    
    while($row = mysqli_fetch_array($result)) 
    {
        $row[3] = base64_encode($row[3]);
        $row["Фотография"] = base64_encode($row["Фотография"]);
        $reviews[] = $row;
    }
    
    mysqli_close($connection);

    echo json_encode($reviews, JSON_UNESCAPED_UNICODE);
?>