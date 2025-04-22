const express = require('express');
const {
    obtenerSensores,
    obtenerDatosSensor,
    obtenerEstadisticasSensor
} = require('../controllers/sensorController');

const router = express.Router();

router.get('/sensores', obtenerSensores);
router.get('/sensores/:sensorId/datos', obtenerDatosSensor);
router.get('/sensores/:sensorId/estadisticas', obtenerEstadisticasSensor);

module.exports = router;