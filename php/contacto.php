<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $telf = $_POST['telf'];
    $mensaje = $_POST['mensaje'];
    $acepto = $_POST['acepto'];

    $formcontent = "
        Nombre:  $nombre \n
        E-mail:  $correo \n
        Telf:    $telf \n
        Mensaje: $mensaje \n
        Acepta términos y condiciones? $acepto 
    ";

    $recipient = "info@kubahomes.com";
    $subject = "Consulta via web de $nombre";
    $header = "From: $correo \r\n";
    $header .= "Content-Type: text/plain; charset=UTF-8";

    if(mail($recipient, $subject, $formcontent, $header)) {
        header("Location: ../contacto.html");
        exit();
    } else {
        echo "Error!";
    }
}
?>
