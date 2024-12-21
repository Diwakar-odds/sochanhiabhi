CREATE TABLE tvshows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    image_url VARCHAR(255),
    watch_url VARCHAR(255)
);
INSERT INTO tvshows (title, platform, image_url, watch_url) VALUES
('Crushed', 'Amazon miniTV', 'https://via.placeholder.com/200x300', 'https://www.amazon.in/minitv'),
('Stranger Things', 'Netflix', 'https://via.placeholder.com/200x300', 'https://www.netflix.com/title/80057281'),
('Aarya', 'Hotstar', 'https://via.placeholder.com/200x300', 'https://www.hotstar.com/in/tv/aarya/1260028094'),
('Kundali Bhagya', 'ZeeTV', 'https://via.placeholder.com/200x300', 'https://www.zee5.com/tv-shows/details/kundali-bhagya/0-6-366'),
('TVF Pitchers', 'YouTube', 'https://via.placeholder.com/200x300', 'https://www.youtube.com/watch?v=kcMfnt62jyU');
