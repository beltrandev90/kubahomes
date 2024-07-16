<?php

$nombre = $_POST['nombre'];
$correo = $_POST['correo'];
$telf = $_POST['telf'];
$mensaje = $_POST['mensaje'];
$acepto = $_POST['acepto'];

$formcontent="
    Nombre:  $nombre \n
    E-mail:  $correo \n
    Telf:    $telf \n
    Mensaje: $mensaje \n
    Acepta términos y condiciones? $acepto 
";

$recipient = "inma2@beltrandev.com";

$subject = "Consulta via web de $nombre";

$header = "From: $email \r\n";
$header .= "Content-Type: text/plain; charset=UTF-8";
mail($recipient, $subject, $formcontent, $header) or die("Error!");
// header("Location: contacto.html");

?>