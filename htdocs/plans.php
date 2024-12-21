<?php
session_start();
$loggedIn = isset($_SESSION["user_id"]);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plans - Film Verse</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="css/plans.css">
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }

        header {
            background-color: #2c3e50;
            color: #fff;
            padding: 15px 0;
        }

        .navbar-brand {
            font-size: 24px;
            font-weight: 600;
            text-decoration: none;
            color: #fff;
        }

        .nav-bar {
            display: flex;
            align-items: center;
        }

        .nav-list {
            list-style: none;
            display: flex;
            margin: 0;
            padding: 0;
        }

        .nav-item {
            margin: 0 15px;
        }

        .nav-link {
            text-decoration: none;
            color: #fff;
            font-weight: 500;
            transition: color 0.3s;
        }

        .nav-link:hover {
            color: #1abc9c;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 15px;
        }

        #plans {
            padding: 50px 0;
            background-color: #fff;
        }

        #plans h1 {
            text-align: center;
            margin-bottom: 20px;
            font-size: 36px;
            color: #2c3e50;
        }

        #plans p {
            text-align: center;
            margin-bottom: 40px;
            color: #7f8c8d;
        }

        .plans-wrapper {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .plan {
            background-color: #ecf0f1;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .plan:hover {
            transform: translateY(-10px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
        }

        .plan h2 {
            font-size: 24px;
            margin-bottom: 10px;
            color: #2c3e50;
        }

        .plan p {
            margin-bottom: 20px;
            color: #7f8c8d;
        }

        .plan h3 {
            font-size: 28px;
            color: #1abc9c;
            margin-bottom: 20px;
        }

        .plan ul {
            list-style: none;
            padding: 0;
            margin: 0 0 20px 0;
        }

        .plan ul li {
            margin-bottom: 10px;
            color: #34495e;
        }

        .plan button {
            background-color: #1abc9c;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
        }

        .plan button:hover {
            background-color: #16a085;
        }

        footer {
            background-color: #2c3e50;
            color: #fff;
            padding: 20px 0;
            text-align: center;
        }

        .social-icons a {
            color: #fff;
            margin: 0 10px;
            font-size: 20px;
            transition: color 0.3s;
        }

        .social-icons a:hover {
            color: #1abc9c;
        }
    </style>
</head>
<body>
<header>
    <div class="container d-flex justify-content-between align-items-center">
        <a class="navbar-brand" href="index.php"><b>Film Verse</b></a>
        <nav class="nav-bar">
            <ul class="nav-list">
                <li class="nav-item"><a class="nav-link" href="index.php">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="plans.php">Plans</a></li>
                <li class="nav-item"><a class="nav-link" href="dashboards.php">Movies</a></li>
                <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
            </ul>
            <div>
                <?php if (!$loggedIn)
                    echo "<a href=\"auth.php\" class=\"btn btn-outline-primary ms-2\">Login</a>";
                else
                    echo "<a href=\"dashboard.php\">" . htmlspecialchars($_SESSION['name'], ENT_QUOTES, 'UTF-8') . "</a>";
                ?>
            </div>
        </nav>
    </div>
</header>

<section id="plans">
    <div class="container">
        <h1>Our Plans</h1>
        <p>Choose a plan that fits your needs and enjoy the best of Film Verse.</p>
        <div class="plans-wrapper">
            <div class="plan">
                <h2>Individual Plan</h2>
                <p>Perfect for solo movie enthusiasts.</p>
                <h3>₹50/month</h3>
                <ul>
                    <li>Access to all short films</li>
                    <li>Ad-free streaming</li>
                    <li>HD quality</li>
                </ul>
                <button>Subscribe</button>
            </div>
            <div class="plan">
                <h2>Couples Plan</h2>
                <p>Enjoy movies together with your partner.</p>
                <h3>₹90/month</h3>
                <ul>
                    <li>Access to all short films</li>
                    <li>Ad-free streaming</li>
                    <li>HD quality</li>
                    <li>Two simultaneous streams</li>
                </ul>
                <button>Subscribe</button>
            </div>
            <div class="plan">
                <h2>Senior Citizens Plan</h2>
                <p>Specially curated for our elderly film lovers.</p>
                <h3>₹70/month</h3>
                <ul>
                    <li>Access to all short films</li>
                    <li>Ad-free streaming</li>
                    <li>HD quality</li>
                    <li>Easy navigation interface</li>
                </ul>
                <button>Subscribe</button>
            </div>
            <div class="plan">
                <h2>Family Plan</h2>
                <p>Share the joy of films with your loved ones.</p>
                <h3>₹150/month</h3>
                <ul>
                    <li>Access to all short films</li>
                    <li>Ad-free streaming</li>
                    <li>HD quality</li>
                    <li>Four simultaneous streams</li>
                </ul>
                <button>Subscribe</button>
            </div>
        </div>
    </div>
</section>

<footer>
    <div class="container text-center">
        <p>&copy; 2024 Film Verse Production. All Rights Reserved.</p>
        <div class="social-icons">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
    </div>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js"></script>
</body>
</html>
