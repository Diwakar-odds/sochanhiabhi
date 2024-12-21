<?php
session_start();
$conn = new mysqli('localhost', 'root', '', 'shortfilm_db');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$token = $_GET['token'];

// Check if the token is valid
$sql = "SELECT user_id, expiry FROM password_resets WHERE token = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $token);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    // Check if the token has expired
    if (strtotime($row['expiry']) < time()) {
        echo "<script>
                alert('The reset link has expired.');
                window.location.href='forgot_password.html';
              </script>";
        exit();
    }

    // Display the password reset form
    $_SESSION['reset_user_id'] = $row['user_id'];
} else {
    echo "<script>
            alert('Invalid reset link.');
            window.location.href='forgot_password.html';
          </script>";
    exit();
}

?>