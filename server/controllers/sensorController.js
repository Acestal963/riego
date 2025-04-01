const pool = require('../config/db');

// Función para normalizar parámetros
const normalizeParam = (param) => {
    const paramMap = {
        'humedad': 'humedad_relativa',
        'temperatura': 'temperatura_ambiente',
        'viento': 'velocidad_viento',
        'presion': 'presion_atmosferica',
        'radiacion': 'radiacion_solar'
    };
    return paramMap[param.toLowerCase()] || param;
};

// Obtener todos los sensores
const obtenerSensores = async (req, res) => {
    try {
        const [sensores] = await pool.execute('SELECT * FROM Sensores');
        res.status(200).json(sensores);
    } catch (error) {
        console.error('Error al obtener sensores:', error);
        res.status(500).json({ error: 'Error al obtener sensores' });
    }
};

// Obtener datos de un sensor
const obtenerDatosSensor = async (req, res) => {
    const { sensorId } = req.params;
    try {
        const [datos] = await pool.execute(
            'SELECT * FROM HistorialDatos WHERE id_sensor = ? ORDER BY fecha DESC LIMIT 15',
            [sensorId]
        );

        if (!datos || datos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron datos' });
        }

        res.status(200).json(datos);
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).json({ error: 'Error al obtener datos' });
    }
};

// Obtener estadísticas
const obtenerEstadisticasSensor = async (req, res) => {
    const { sensorId } = req.params;
    const { parametro } = req.query;

    if (!parametro) {
        return res.status(400).json({ error: 'Parámetro requerido' });
    }

    try {
        const paramNormalizado = normalizeParam(parametro);
        const [result] = await pool.execute(
            `SELECT
            MIN(valor) as min,
                                            MAX(valor) as max,
                                            AVG(valor) as avg,
                                            COUNT(*) as count
                                            FROM HistorialDatos
                                            WHERE id_sensor = ? AND parametros = ?`,
                                            [sensorId, paramNormalizado]
        );

        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'No hay datos para este parámetro' });
        }

        res.status(200).json({
            parametro: paramNormalizado,
            ...result[0]
        });
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).json({ error: 'Error al calcular estadísticas' });
    }
};

module.exports = {
    obtenerSensores,
    obtenerDatosSensor,
    obtenerEstadisticasSensor
};
