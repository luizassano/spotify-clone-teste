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

  static async updateSong(id, { title, artist, album, duration }) {
    try {
      await db.query(
        'UPDATE songs SET title = ?, artist = ?, album = ?, duration = ? WHERE id = ?',
        [title, artist, album, duration, id]
      );
      
      const [updatedSong] = await db.query(
        'SELECT * FROM songs WHERE id = ?',
        [id]
      );
      
      return updatedSong[0];
    } catch (error) {
      console.error('Erro ao atualizar música:', error);
      throw error;
    }
  }

  static async deleteSong(id) {
    try {
      const song = await this.getSongById(id);
      if (!song) {
        throw new Error('Música não encontrada');
      }

      try {
        await db.query('DELETE FROM playlist_songs WHERE song_id = ?', [id]);
      } catch (err) {
        console.log('Nenhuma relação em playlists para remover');
      }

      await db.query('DELETE FROM songs WHERE id = ?', [id]);
      
      return { message: 'Música deletada com sucesso' };
    } catch (error) {
      console.error('Erro ao deletar música:', error);
      throw error;
    }
  }
}

module.exports = SongModel;