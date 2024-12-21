
<?php
session_start();
$conn = new mysqli('localhost', 'root', '', 'shortfilm');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];

// Check if the email exists
$sql = "SELECT id FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $token = bin2hex(random_bytes(50)); // Generate a secure token
    $expiry = date("Y-m-d H:i:s", strtotime("+1 hour"));

    $sql = "INSERT INTO password_resets (user_id, token, expiry) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iss", $row['id'], $token, $expiry);
    $stmt->execute();

    $reset_link = "http://localhost/reset_password.php?token=$token";
    echo "<script>
            alert('Password reset link sent to your email. Check your inbox.');
            console.log('Reset Link: $reset_link'); // Display for testing purposes
            window.location.href='login.php';
          </script>";
} else {
    echo "<script>
            alert('Email not found!');
            window.location.href='forgot_password.php';
          </script>";
}

$conn->close();
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password</title>
    <style>
        .reset-section {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 120vh;
            background-color: rgba(0, 0, 0, 0.85);
        }
        .reset-container {
            background-color: #222;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.7);
            width: 100%;
            max-width: 400px;
        }
        .reset-container h1 {
            color: #ffcc00;
            text-align: center;
        }
        .reset-container label {
            display: block;
            color: #ffcc00;
            margin-bottom: 10px;
        }
        .reset-container input {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border-radius: 5px;
            border: none;
        }
        .reset-container button {
            width: 100%;
            padding: 10px;
            background-color: #28a745;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .reset-container a {
            color: #ffcc00;
            display: block;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <section class="reset-section">
        <div class="reset-container">
            <h1>Reset Password</h1>
            <form action="forgot_password.php" method="POST">
                <label for="email">Enter Your Email:</label>
                <input type="email" name="email" id="email" placeholder="Enter your email" required>
                <button type="submit">Send Reset Link</button>
            </form>
            <a href="login.php">Back to Login</a>
        </div>
    </section>
</body>
</html>



