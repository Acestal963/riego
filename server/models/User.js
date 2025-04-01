const db = require('../config/db');

class User {
  static async create({ nombre, apellido, correo_electronico, contraseña, Tipo_cultivo, Hectareas }) {
    const [result] = await db.query(
      'INSERT INTO Usuario (nombre, apellido, correo_electronico, contraseña, Tipo_cultivo, Hectareas) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, apellido, correo_electronico, contraseña, Tipo_cultivo, Hectareas]
    );
    return result;
  }

  static async findByEmail(email) {
    const [rows] = await db.query(
      'SELECT * FROM Usuario WHERE correo_electronico = ?',
      [email]
    );
    return rows[0]; // Retorna el primer usuario encontrado
  }
}

module.exports = User;