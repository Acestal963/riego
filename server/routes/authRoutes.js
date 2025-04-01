const express = require('express');
const { register } = require('../controllers/authController');
const { login } = require('../controllers/authController');


const router = express.Router();

router.post('/register', register); // Asegúrate de que esta ruta esté definida
router.post('/login', login); // Ruta para el login

module.exports = router;