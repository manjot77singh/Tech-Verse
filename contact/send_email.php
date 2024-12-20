<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'your.email@gmail.com'; // Your Gmail
        $mail->Password = 'your-app-specific-password'; // Your Gmail App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Recipients
        $mail->setFrom($_POST['email'], $_POST['name']);
        $mail->addAddress('your.email@gmail.com');
        $mail->addReplyTo($_POST['email'], $_POST['name']);

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Contact Form: ' . $_POST['subject'];
        $mail->Body = "
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> {$_POST['name']}</p>
            <p><strong>Email:</strong> {$_POST['email']}</p>
            <p><strong>Subject:</strong> {$_POST['subject']}</p>
            <p><strong>Message:</strong></p>
            <p>{$_POST['message']}</p>
        ";

        $mail->send();
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => $mail->ErrorInfo]);
    }
    exit;
}
?> 