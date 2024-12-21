<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Filmverse Dashboard</title>
  <link rel="stylesheet" href="css/dashboard.css">
</head>
<body>
  <button class="toggle-btn" onclick="toggleSidebar()">☰</button>
  <div class="dashboard">
    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
      <div class="logo">🎬 Filmverse</div>
      <nav class="menu">
        <a href="index.php" class="menu-item">Home</a>
        <a href="#" class="menu-item">Community</a>
        <a href="#" class="menu-item">Discover</a>
        <a href="#" class="menu-item">Coming Soon</a>
      </nav>
      <div class="social">
        <a href="#" class="menu-item">Friends</a>
        <a href="#" class="menu-item">Shared Account</a>
        <a href="#" class="menu-item">Media</a>
      </div>
      <div class="general">
        <a href="#" class="menu-item">Settings</a>
        <a href="logout.php" class="menu-item">Log Out</a>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="content" id="mainContent">
      <header class="header">
        <div class="tabs">
          <a href="movies.php" class="tab active">Movies</a>
          <a href="tvshows.php" class="tab">TV Shows</a>
          <a href="animations.php" class="tab">Animations</a>
          <a href="plans.php" class="tab">Plans</a>
        </div>
        <div class="profile">          
          <div class="content" class="avatar" <button class="settings-btn" onclick="toggleProfileMenu()"></button></div>
          <div class="profile-menu" id="profileMenu">
            <a href="#">View Profile</a>
            <a href="#">Watch History</a>
            <a href="#">My List</a>
            <a href="#">Account Settings</a>
            <a href="#">Help Center</a>
          </div>
        </div>
      </header>

      <!-- Top Rated Movies -->
      <section class="section">
        <h2 class="section-title">Recommended Movies</h2>
        <div class="movie-card-container">
          <div class="movie-card">
            <img class="movie-card-poster" src="https://th.bing.com/th/id/OIP.iJ0B4QHWW_LdN-wEoTAQLAHaLH?rs=1&pid=ImgDetMain" alt="Movie Poster">
            <div class="movie-card-info">
              <h3 class="movie-card-title">The Dark Knight</h3>
              <p class="movie-card-genre">Action, Thriller</p>
              <button class="movie-card-btn">Watch Now</button>
            </div>
          </div>
          <div class="movie-card">
            <img class="movie-card-poster" src="https://movieswithaplottwist.com/wp-content/uploads/2016/03/Inception-movie-poster.jpg" alt="Movie Poster">
            <div class="movie-card-info">
              <h3 class="movie-card-title">Inception</h3>
              <p class="movie-card-genre">Sci-Fi, Mystery</p>
              <button class="movie-card-btn">Watch Now</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Now Playing -->
      <section class="section">
        <h2 class="section-title">Now Playing</h2>
        <div class="movie-grid">
          <div class="movie-card">
            <img src="https://th.bing.com/th/id/OIP.6_3xHcK1BdNQz_9MsAtCPAHaK-?rs=1&pid=ImgDetMain" alt="Movie">
            <h3 class="movie-title">Deep Water</h3>
          </div>
          <div class="movie-card">
            <img src="https://th.bing.com/th/id/OIP.MbuM8Ly49tn3CUBpqISq4wHaK3?rs=1&pid=ImgDetMain" alt="Movie">
            <h3 class="movie-title">No Exit</h3>
          </div>
        </div>
      </section>
    </main>
  </div>

  <script>
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const profileMenu = document.getElementById('profileMenu');
    let sidebarTimeout;

    // Hide sidebar after 5 seconds
    function autoHideSidebar() {
      sidebarTimeout = setTimeout(() => {
        sidebar.classList.add('hidden');
        mainContent.classList.add('expanded');
      }, 5000); // 5 seconds
    }

    // Toggle sidebar visibility
    function toggleSidebar() {
      if (sidebar.classList.contains('hidden')) {
        sidebar.classList.remove('hidden');
        mainContent.classList.remove('expanded');
        autoHideSidebar(); // Restart auto-hide timer
      } else {
        sidebar.classList.add('hidden');
        mainContent.classList.add('expanded');
        clearTimeout(sidebarTimeout); // Stop auto-hide timer if manually hidden
      }
    }

    // Toggle Profile Menu
    function toggleProfileMenu() {
      profileMenu.classList.toggle('active');
    }

    // Start the auto-hide functionality
    autoHideSidebar();
  </script>
</body>
</html>
