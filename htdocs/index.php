<?php
    session_start();
    $loggedIn = false;
    if (isset($_SESSION["user_id"])) $loggedIn = true;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Short Film Production</title>

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="css/index.css">
    <!--style>
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

        .search-box {
            display: flex;
            align-items: center;
        }

        .search-box input {
            border: 1px solid #ccc;
            padding: 5px;
            border-radius: 4px 0 0 4px;
            outline: none;
        }

        .search-box button {
            background-color: #1abc9c;
            border: none;
            color: #fff;
            padding: 5px 10px;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
        }

        .search-box button:hover {
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
    </style-->
    <script src="script.js"></script>
</head>
<body>
<header>
    <div class="container d-flex justify-content-between align-items-center">
        <a class="navbar-brand" href="#"><b>Film Verse</b></a>
        <nav class="nav-bar">
            <ul class="nav-list">
                <li class="nav-item"><a class="nav-link" href="#" onclick="openAbout()">About</a></li>
                <li class="nav-item"><a class="nav-link" href="#Trailer">Team</a></li>
                <li class="nav-item"><a class="nav-link" href="dashboards.php">Movies</a></li>
                <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                <li class="nav-item"><a class="nav-link" href="plans.php">Plans</a></li>
            </ul>
            <div class="search-box">
                <input type="text" placeholder="Search...">
                <button><i class="bi bi-search icons"></i></button>
            </div>
            <div>
                <?php if (!$loggedIn)
                    echo "<a href=\"auth.php\" class=\"btn btn-outline-primary ms-2\">Login</a>";
                else
                    echo "<a href=\"dashboard.php\">{$_SESSION['name']}</a>";
                ?>
            </div>
        </nav>
    </div>
</header>

<section id="home">
    <div class="container">
        <h1> Welcome to Film Verse </h1>
        <p>A journey into storytelling like never before.</p>
    </div>
</section>

<div id="about-section">
    <button class="close-btn" onclick="closeAbout()">&times;</button>
    <h2>About Film Verse</h2>
    <p>
        Welcome to <strong>Film Verse</strong>, the ultimate platform for celebrating the art of storytelling in its most concise and impactful form. We are dedicated to showcasing the brilliance of short films, where creativity meets brevity, and powerful narratives are told in minutes.
    </p>
    <ul>
        <li><strong>Film Library:</strong> A curated selection of the best short films across genres and styles.</li>
        <li><strong>Community:</strong> A vibrant space for filmmakers, storytellers, and film lovers to connect and collaborate.</li>
        <li><strong>Opportunities:</strong> A platform for creators to share their work, gain visibility, and take their craft to the next level.</li>
    </ul>
    <p>Discover. Create. Inspire. This is <strong>Film Verse</strong>—where every frame tells a story.</p>
</div>

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
