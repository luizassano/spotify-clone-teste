const db = require('../config/db');

class User {
  static async createUser(name, email, hashedPassword) {
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    return result;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows.length ? rows[0] : null;
  }
}

module.exports = User;
