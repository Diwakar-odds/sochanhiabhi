<?php
session_start();
$loggedIn = isset($_SESSION["user_id"]);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Animated Movies - Film Verse</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
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

        #animated-movies {
            padding: 50px 0;
        }

        #animated-movies h1 {
            text-align: center;
            margin-bottom: 20px;
            font-size: 36px;
            color: #2c3e50;
        }

        .movies-wrapper {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            padding: 20px;
        }

        .movie-card {
            background-color: #ecf0f1;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
            text-align: center;
        }

        .movie-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
        }

        .movie-card img {
            width: 100%;
            height: 300px;
            object-fit: cover;
        }

        .movie-card h2 {
            font-size: 20px;
            margin: 10px 0;
            color: #2c3e50;
        }

        .movie-card p {
            color: #7f8c8d;
            margin-bottom: 20px;
        }

        .movie-card button {
            background-color: #1abc9c;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
        }

        .movie-card button:hover {
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

<section id="animated-movies">
    <div class="container">
        <h1>Animated Movies</h1>
        <div class="movies-wrapper">
            <?php for ($i = 1; $i <= 100; $i++): ?>
                <div class="movie-card">
                    <img src="https://via.placeholder.com/300x400?text=Animated+Movie+<?= $i ?>" alt="Animated Movie <?= $i ?>">
                    <h2>Animated Movie <?= $i ?></h2>
                    <p>A thrilling animated adventure.</p>
                    <button>Watch Now</button>
                </div>
            <?php endfor; ?>
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
