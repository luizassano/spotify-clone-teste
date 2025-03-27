const db = require('../config/db');

class Artist {
  static async createArtist(name, genre) {
    const [result] = await db.execute(
      'INSERT INTO artists (name, genre) VALUES (?, ?)',
      [name, genre]
    );
    return result;
  }

  static async getAllArtists() {
    const [rows] = await db.execute('SELECT * FROM artists');
    return rows;
  }

  static async getArtistById(id) {
    const [rows] = await db.execute('SELECT * FROM artists WHERE id = ?', [id]);
    return rows.length ? rows[0] : null;
  }
}

module.exports = Artist;
