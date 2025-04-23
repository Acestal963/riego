const express = require('express');
const {
    obtenerSensores,
    obtenerDatosSensor,
    obtenerEstadisticasSensor,
    obtenerSensoresPorUsuario
} = require('../controllers/sensorController');
const { authenticateJWT } = require('../controllers/authController'); // Importa el middleware

const router = express.Router();

// Rutas
router.get('/sensores', obtenerSensores);
router.get('/sensores/:sensorId/datos', obtenerDatosSensor);
router.get('/sensores/:sensorId/estadisticas', obtenerEstadisticasSensor);
router.get('/usuarios/:userId/sensores', authenticateJWT(), obtenerSensoresPorUsuario); // Protegida con JWT

module.exports = router;