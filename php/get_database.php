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
        echo "Ошибка при загрузке набора символов utf8: %s\n", mysqli_error($connection);
    }
	
    $query = "SELECT * FROM ".$_GET["table_name"];
    $result = mysqli_query($connection, $query);
    if (!$result) 
    {
    	die('<p style="color:red">'.mysqli_errno($connection).' - '.mysqli_error($connection).'</p>');
	}
    
    $products[] = array();
    while($row = mysqli_fetch_array($result)) 
    {
        $products[] = $row;
    }
    
    mysqli_close($connection);

    echo json_encode($products, JSON_UNESCAPED_UNICODE);
?>