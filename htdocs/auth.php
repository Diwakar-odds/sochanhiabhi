<?php
  session_start();
  if (isset($_POST["login"])) {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $con = mysqli_connect('localhost', 'root', '', 'shortfilm');
    if (!$con) die('Database connection failed!');
    $sql = "SELECT * FROM user WHERE username='{$username}'";
    $result = mysqli_query($con, $sql);
    if (mysqli_num_rows($result) < 1) {
      die("User not found! Please create an account first.");
    } else {
      $row = mysqli_fetch_assoc($result);
      if ($password == $row['password']) {
        $_SESSION['username'] = $username;
        $_SESSION['email'] = $row['email'];
        $_SESSION['name'] = $row['name'];
        $_SESSION['user_id'] = $row['id'];

        echo "<script>
          alert('Login success!');
          window.location.href='index.php';
        </script>";
      } else {
        echo "<script>
          alert('Incorrect password!');
        </script>";
      }
    }
  } else if(isset($_POST["signup"])) {
    // Get form data
    $name = $_POST['name'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    if ($password !== $confirm_password) {
        echo "<script>
                alert('Passwords do not match!');
              </script>";
        exit();
    }
    $con = mysqli_connect('localhost', 'root', '', 'shortfilm');
    if (!$con) {
        die('Database connection failed!');
    }
    $result = mysqli_query($con, "SELECT * FROM user WHERE email='{$email}'");
    if (mysqli_num_rows($result)) {
        die("Email already exists! Please login.");
    }
    $result = mysqli_query($con, "SELECT * FROM user WHERE username='{$username}'");
    if (mysqli_num_rows($result)) {
        die("Username exists! Try a different useranme.");
    } else {
        // Insert data into the database
        $sql = "INSERT INTO `user` (`id`, `name`, `username`, `email`, `password`) VALUES (NULL, '{$name}', '{$username}', '{$email}', '{$password}')";
        if (mysqli_query($con, $sql)) {
            echo "<script>
                    alert('Registration successful! Redirecting to login.');
                    window.location.href='auth.php';
                </script>";
        } else {
            echo "<script>
                    alert('Error: " . $stmt->error . "');
                    window.location.href='auth.php';
                </script>";
        }
    }
  }
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login / Sign-up</title>
    <link rel="stylesheet" href="css/auth.css">
  </head>
  <body>
  
  <div class="container" id="container">
    <div class="form-container sign-up-container">
      <form method="POST" action="auth.php">
        <h1 class="formTitle">Create Account</h1>
        <span>All the fields are required!</span>
        <input type="text" id="fullname" name="name" placeholder="Enter your full name" required>
        <input type="text" id="username" name="username" placeholder="Choose a username" required>
        <input type="email" id="email" name="email" placeholder="Enter your email" required>
        <input type="password" id="password" name="password" placeholder="Choose a password" required>
        <input type="password" id="confirm-password" name="confirm_password" placeholder="Confirm your password" required>
        <button type="submit" id="btn-signup" name="signup">Sign Up</button>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form method="POST" action="auth.php">
        <h1>Sign in</h1>
        <div class="social-container">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
          <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
        </div>
        <span>or use your account</span>
        <input type="text" name="username" placeholder="Username or email" />
        <input type="password" name="password" placeholder="Password" />
        <a href="forgot_password.php">Forgot your password?</a>
        <button type="submit" name="login">Sign In</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button class="ghost" id="signIn">Sign In</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
          <button class="ghost" id="signUp">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
  <script src="js/auth.js"></script>
  </body>
</html>
