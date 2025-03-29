-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS spotify_clone;
USE spotify_clone;

-- Criação da tabela 'users'
CREATE TABLE IF NOT EXISTS users (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela 'songs'
CREATE TABLE IF NOT EXISTS songs (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  album VARCHAR(255),
  duration VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela 'playlists'
CREATE TABLE IF NOT EXISTS playlists (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  user_id INT(11),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Criação da tabela 'playlist_songs'
CREATE TABLE IF NOT EXISTS playlist_songs (
  playlist_id INT(11),
  song_id INT(11),
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (playlist_id, song_id),
  FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
  FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE
);

-- Criação da tabela 'artists'
CREATE TABLE IF NOT EXISTS artists (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Adicionando índices para melhorar a performance em buscas
CREATE INDEX idx_user_id ON playlists(user_id);
CREATE INDEX idx_song_id ON playlist_songs(song_id);
CREATE INDEX idx_playlist_id ON playlist_songs(playlist_id);
