const db = require('../config/db');

class PlaylistModel {

  static async createPlaylist(name, userId) {
    try {
      const [result] = await db.query(
        'INSERT INTO playlists (name, user_id) VALUES (?, ?)',
        [name, userId]
      );
      
      const [newPlaylist] = await db.query(
        'SELECT * FROM playlists WHERE id = ?',
        [result.insertId]
      );
      
      return newPlaylist[0];
    } catch (error) {
      console.error('Erro ao criar playlist:', error);
      throw error;
    }
  }


  static async getAllPlaylists() {
    try {
      const [playlists] = await db.query(
        `SELECT p.*, 
         COUNT(ps.song_id) as song_count
         FROM playlists p
         LEFT JOIN playlist_songs ps ON p.id = ps.playlist_id
         GROUP BY p.id`
      );
      return playlists;
    } catch (error) {
      console.error('Erro ao buscar playlists:', error);
      throw error;
    }
  }

  
  static async getPlaylistById(id) {
    try {
      const [playlist] = await db.query(
        `SELECT p.*, 
         COUNT(ps.song_id) as song_count
         FROM playlists p
         LEFT JOIN playlist_songs ps ON p.id = ps.playlist_id
         WHERE p.id = ?
         GROUP BY p.id`,
        [id]
      );
      
      if (playlist.length === 0) {
        return null;
      }
      
      const [songs] = await db.query(
        `SELECT s.* 
         FROM songs s
         JOIN playlist_songs ps ON s.id = ps.song_id
         WHERE ps.playlist_id = ?`,
        [id]
      );
      
      return {
        ...playlist[0],
        songs
      };
    } catch (error) {
      console.error('Erro ao buscar playlist:', error);
      throw error;
    }
  }


  static async addSongToPlaylist(playlistId, songId) {
    try {
      const [playlist] = await db.query(
        'SELECT id FROM playlists WHERE id = ?',
        [playlistId]
      );
      
      if (playlist.length === 0) {
        return false;
      }
      
      const [song] = await db.query(
        'SELECT id FROM songs WHERE id = ?',
        [songId]
      );
      
      if (song.length === 0) {
        return false;
      }
      
      const [existing] = await db.query(
        'SELECT * FROM playlist_songs WHERE playlist_id = ? AND song_id = ?',
        [playlistId, songId]
      );
      
      if (existing.length > 0) {
        return true; 
      }
      
      await db.query(
        'INSERT INTO playlist_songs (playlist_id, song_id) VALUES (?, ?)',
        [playlistId, songId]
      );
      
      return true;
    } catch (error) {
      console.error('Erro ao adicionar música à playlist:', error);
      throw error;
    }
  }


  static async removeSongFromPlaylist(playlistId, songId) {
    try {
      const [result] = await db.query(
        'DELETE FROM playlist_songs WHERE playlist_id = ? AND song_id = ?',
        [playlistId, songId]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Erro ao remover música da playlist:', error);
      throw error;
    }
  }


  static async updatePlaylist(id, name, description) {
    try {
      const [result] = await db.query(
        'UPDATE playlists SET name = ?, description = ? WHERE id = ?',
        [name, description, id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Erro ao atualizar playlist:', error);
      throw error;
    }
  }


  static async deletePlaylist(id) {
    try {
      await db.query(
        'DELETE FROM playlist_songs WHERE playlist_id = ?',
        [id]
      );
      
      const [result] = await db.query(
        'DELETE FROM playlists WHERE id = ?',
        [id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Erro ao deletar playlist:', error);
      throw error;
    }
  }
}

module.exports = PlaylistModel;