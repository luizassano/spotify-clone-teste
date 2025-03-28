const db = require('../config/db');

class SongModel {
  static async createSong({ title, artist, album, duration }) {
    try {
      const [result] = await db.query(
        'INSERT INTO songs (title, artist, album, duration) VALUES (?, ?, ?, ?)',
        [title, artist, album, duration]
      );
      
      const [newSong] = await db.query(
        'SELECT * FROM songs WHERE id = ?',
        [result.insertId]
      );
      
      return newSong[0];
    } catch (error) {
      console.error('Erro ao criar música:', error);
      throw error;
    }
  }

  static async getAllSongs() {
    try {
      const [songs] = await db.query('SELECT * FROM songs');
      return songs;
    } catch (error) {
      console.error('Erro ao buscar músicas:', error);
      throw error;
    }
  }

  static async getSongById(id) {
    try {
      const [song] = await db.query('SELECT * FROM songs WHERE id = ?', [id]);
      return song[0] || null;
    } catch (error) {
      console.error('Erro ao buscar música:', error);
      throw error;
    }
  }
}

module.exports = SongModel;