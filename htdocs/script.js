// Smooth Scroll for Navbar Links
document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Hero Section Animation
window.addEventListener('DOMContentLoaded', () => {
    const heroText = document.querySelector('#home h1');
    const heroButton = document.querySelector('#home a.btn');

    heroText.style.opacity = 0;
    heroButton.style.opacity = 0;

    setTimeout(() => {
        heroText.style.opacity = 1;
        heroButton.style.opacity = 1;
    }, 1000);
});

// Button Click Feedback
document.querySelectorAll('.custom-btn, .btn-primary').forEach(button => {
    button.addEventListener('click', () => {
        button.style.transform = 'scale(0.9)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    });
});
// Gallery Animation
const galleryImages = document.querySelectorAll('#gallery img');
galleryImages.forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.filter = 'brightness(80%)';
    });
    img.addEventListener('mouseleave', () => {
        img.style.filter = 'brightness(100%)';
    });
});
// Sticky Navbar on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
        navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.classList.remove('sticky');
        navbar.style.boxShadow = 'none';
    }
});
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch('https://yourserver.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (result.success) {
      alert("Login successful!");
    } else {
      alert("Invalid username or password!");
    }
  }
// about section
function openAbout() {
    document.getElementById('about-section').style.right = '0';
}

function closeAbout() {
    document.getElementById('about-section').style.right = '-100%';
}  