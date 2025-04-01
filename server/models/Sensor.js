const pool = require('../config/db');

const Sensor = {
    // Método para crear un nuevo sensor
    async create(tipo, ubicacion, id_equipo) {
        const [result] = await pool.execute(
            'INSERT INTO Sensores (tipo, ubicacion, id_equipo) VALUES (?, ?, ?)',
            [tipo, ubicacion, id_equipo]
        );
        return result.insertId; // Retorna el ID del sensor creado
    },

    // Método para obtener todos los sensores
    async findAll() {
        const [rows] = await pool.execute('SELECT * FROM Sensores');
        return rows;
    },

    // Método para obtener un sensor por su ID
    async findById(id_sensor) {
        const [rows] = await pool.execute('SELECT * FROM Sensores WHERE id_sensor = ?', [id_sensor]);
        return rows[0]; // Retorna el primer resultado (o undefined si no existe)
    },

    // Método para actualizar un sensor
    async update(id_sensor, tipo, ubicacion, id_equipo) {
        const [result] = await pool.execute(
            'UPDATE Sensores SET tipo = ?, ubicacion = ?, id_equipo = ? WHERE id_sensor = ?',
            [tipo, ubicacion, id_equipo, id_sensor]
        );
        return result.affectedRows > 0; // Retorna true si se actualizó correctamente
    },

    // Método para eliminar un sensor
    async delete(id_sensor) {
        const [result] = await pool.execute('DELETE FROM Sensores WHERE id_sensor = ?', [id_sensor]);
        return result.affectedRows > 0; // Retorna true si se eliminó correctamente
    },
};

module.exports = Sensor;