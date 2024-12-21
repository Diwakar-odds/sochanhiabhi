<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TV Shows - Filmverse</title>
  <link rel="stylesheet" href="css/dashboard.css">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    .container {
      padding: 20px;
    }
    .grid {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
    }
    .card {
      border: 1px solid #ccc;
      border-radius: 8px;
      overflow: hidden;
      width: 250px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      text-align: center;
    }
    .card img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
    .card .content {
      padding: 15px;
    }
    .card .title {
      font-size: 1.2em;
      font-weight: bold;
      margin: 10px 0;
    }
    .card .platform {
      font-size: 0.9em;
      color: #666;
    }
    .card .btn {
      display: block;
      margin: 15px auto 0;
      padding: 10px 15px;
      background-color: #007BFF;
      color: #fff;
      border: none;
      border-radius: 5px;
      text-decoration: none;
      text-align: center;
      transition: background-color 0.3s;
    }
    .card .btn:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Top 100 TV Shows</h1>
    <div class="grid">
      <?php
        // Sample data for TV shows
        $tvShows = [
          ["title" => "The Boys", "platform" => "Amazon Prime Video", "image" => "https://image.tmdb.org/t/p/w500/mGVrXeIjyecj6TKmwPVpHlscEmw.jpg", "link" => "https://www.amazon.com/"],
          ["title" => "Stranger Things", "platform" => "Netflix", "image" => "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg", "link" => "https://www.netflix.com/"],
          ["title" => "Game of Thrones", "platform" => "Hotstar", "image" => "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg", "link" => "https://www.hotstar.com/"],
          ["title" => "Mirzapur", "platform" => "Amazon Prime Video", "image" => "https://image.tmdb.org/t/p/w500/dOrsmqlsLZzb5zERogBmsMCyXmG.jpg", "link" => "https://www.amazon.com/"],
          ["title" => "The Office", "platform" => "YouTube", "image" => "https://image.tmdb.org/t/p/w500/5KCVkau1HEl7ZzfPsKAPM0sMiKc.jpg", "link" => "https://www.youtube.com/"],
          ["title" => "Chernobyl", "platform" => "HBO", "image" => "https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg", "link" => "https://www.hbo.com/"],
          ["title" => "Breaking Bad", "platform" => "Netflix", "image" => "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg", "link" => "https://www.netflix.com/"],
          ["title" => "Panchayat", "platform" => "Amazon MiniTV", "image" => "https://image.tmdb.org/t/p/w500/qZtAf4Z1lazGQoYVXiHOrvLr5lI.jpg", "link" => "https://www.amazon.com/"],
          ["title" => "The Mandalorian", "platform" => "Disney+", "image" => "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg", "link" => "https://www.disneyplus.com/"],
          ["title" => "Loki", "platform" => "Disney+", "image" => "https://image.tmdb.org/t/p/w500/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg", "link" => "https://www.disneyplus.com/"],
          // Repeat this for 90 more entries with unique data
        ];

        // Generate cards for each TV show
        foreach ($tvShows as $show) {
          echo "
          <div class='card'>
            <img src='{$show['image']}' alt='{$show['title']}'>
            <div class='content'>
              <div class='title'>{$show['title']}</div>
              <div class='platform'>Platform: {$show['platform']}</div>
              <a href='{$show['link']}' class='btn' target='_blank'>Watch Now</a>
            </div>
          </div>
          ";
        }
      ?>
    </div>
  </div>
</body>
</html>