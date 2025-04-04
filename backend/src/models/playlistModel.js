const db = require('../config/db');

class PlaylistModel {
  static async createPlaylist({ name, userId, description = null }) {
    try {
      const [result] = await db.query(
        'INSERT INTO playlists (name, user_id, description) VALUES (?, ?, ?)',
        [name, userId, description]
      );
      
      return {
        id: result.insertId,
        name,
        user_id: userId,
        description,
        created_at: new Date()
      };
    } catch (error) {
      console.error('Erro ao criar playlist:', error);
      throw error;
    }
  }

  static async getAllPlaylists() {
    try {
      const [playlists] = await db.query(`
        SELECT p.*, COUNT(ps.song_id) AS song_count
        FROM playlists p
        LEFT JOIN playlist_songs ps ON p.id = ps.playlist_id
        GROUP BY p.id
      `);
      return playlists;
    } catch (error) {
      console.error('Erro ao buscar playlists:', error);
      throw error;
    }
  }

  static async getPlaylistById(id) {
    try {
      const [playlist] = await db.query('SELECT * FROM playlists WHERE id = ?', [id]);
      return playlist[0] || null;
    } catch (error) {
      console.error('Erro ao buscar playlist:', error);
      throw error;
    }
  }

  static async updatePlaylist(id, { name, description }) {
    try {
      await db.query(
        'UPDATE playlists SET name = ?, description = ? WHERE id = ?',
        [name, description, id]
      );
      
      const [updatedPlaylist] = await db.query(
        'SELECT * FROM playlists WHERE id = ?',
        [id]
      );
      
      return updatedPlaylist[0];
    } catch (error) {
      console.error('Erro ao atualizar playlist:', error);
      throw error;
    }
  }

  static async deletePlaylist(id) {
    try {
      const playlist = await this.getPlaylistById(id);
      if (!playlist) {
        throw new Error('Playlist não encontrada');
      }

      await db.query('DELETE FROM playlist_songs WHERE playlist_id = ?', [id]);
      
      await db.query('DELETE FROM playlists WHERE id = ?', [id]);
      
      return true;
    } catch (error) {
      console.error('Erro ao deletar playlist:', error);
      throw error;
    }
  }

  static async addSongToPlaylist(playlistId, songId) {
    try {
      const [existing] = await db.query(
        'SELECT * FROM playlist_songs WHERE playlist_id = ? AND song_id = ?',
        [playlistId, songId]
      );
      
      if (existing.length > 0) {
        throw new Error('Música já está na playlist');
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

  static async getPlaylistSongs(playlistId) {
    try {
      const [songs] = await db.query(`
        SELECT s.* FROM songs s
        JOIN playlist_songs ps ON s.id = ps.song_id
        WHERE ps.playlist_id = ?
      `, [playlistId]);
      return songs;
    } catch (error) {
      console.error('Erro ao buscar músicas da playlist:', error);
      throw error;
    }
  }

  static async removeSongFromPlaylist(playlistId, songId) {
    try {
      const [existing] = await db.query(
        'SELECT * FROM playlist_songs WHERE playlist_id = ? AND song_id = ?',
        [playlistId, songId]
      );
      
      if (existing.length === 0) {
        throw new Error('Música não encontrada na playlist');
      }

      await db.query(
        'DELETE FROM playlist_songs WHERE playlist_id = ? AND song_id = ?',
        [playlistId, songId]
      );
      
      return true;
    } catch (error) {
      console.error('Erro ao remover música da playlist:', error);
      throw error;
    }
  }
}

module.exports = PlaylistModel;