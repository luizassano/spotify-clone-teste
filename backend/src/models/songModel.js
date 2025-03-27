const db = require('../config/db');

class Song {
  static async createSong(title, artistId, albumId, duration) {
    const query = 'INSERT INTO songs (title, artist_id, album_id, duration) VALUES (?, ?, ?, ?)';
    await db.execute(query, [title, artistId, albumId, duration]);
  }

  static async getAllSongs() {
    const [songs] = await db.execute('SELECT * FROM songs');
    return songs;
  }

  static async getSongById(id) {
    const [songs] = await db.execute('SELECT * FROM songs WHERE id = ?', [id]);
    return songs.length ? songs[0] : null;
  }
}

module.exports = Song;
