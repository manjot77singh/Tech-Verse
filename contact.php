<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Replace with your Gmail address
    $to_email = "manjotsingh7805@gmail.com";
    
    // Get form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];
    
    // Email headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // Email body
    $email_body = "
    <html>
    <body>
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Subject:</strong> $subject</p>
        <p><strong>Message:</strong></p>
        <p>$message</p>
    </body>
    </html>
    ";
    
    // Send email
    $mail_sent = mail($to_email, "Contact Form: $subject", $email_body, $headers);
    
    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode(['success' => $mail_sent]);
    exit;
}
?>