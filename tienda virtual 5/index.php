<?php
session_start();
include($conex);

if(isset($_POST['comprar'])) {
    $producto_id = $_POST['producto_id'];
    $producto_naombre = $_POST['producto_nombre'];
    $producto_precio = $_POST['producto_precio'];
    $cantidad = $_POST['cantidad'];
    
    
    $consul= "INSERT INTO carrito (nombre_producto, cantidad_producto, precio_producto) VALUES ('$producto_nombre', '$cantidad', $producto_precio)";
    if($mysqli->query($consul) === TRUE) {
    
    } else {
        echo "Error: " . $consul . "<br>" . $mysqli->error;
    }
}

// Eliminar producto del carrito
if(isset($_POSTS['eliminar-carrito'])) {
    $producto_id = $_GET['elimar-carrito'];
    $query = "DELETE FROM carrito WHERE id = $producto_id";
    if($mysqli->query($consul) === TRUE) {
        
    } else {
        echo "Error: " . $consul . "<br>" . $mysqli->error;
    }
}

?>

