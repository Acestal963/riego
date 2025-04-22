const express = require('express');
const cors = require('cors');
const app = express();

// Configuración mejorada de CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middlewares esenciales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta raíz con documentación completa
app.get('/', (req, res) => {
  res.json({
    status: 'API funcionando',
    message: 'Bienvenido al sistema de monitoreo',
    endpoints: {
      auth: {
        login: 'POST /api/auth/login',
        register: 'POST /api/auth/register'
      },
      sensors: {
        list: 'GET /api/sensores',
        data: 'GET /api/sensores/:id/datos',
        stats: 'GET /api/sensores/:id/estadisticas?parametro='
      }
    }
  });
});

// Importar y usar rutas
const authRoutes = require('./routes/authRoutes');
const sensorRoutes = require('./routes/sensorRoutes');

app.use('/api/auth', authRoutes);
app.use('/api', sensorRoutes);

// Ruta de verificación de salud
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Manejo de rutas no encontradas (DEBE IR AL FINAL)
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    requestedUrl: req.originalUrl,
    availableEndpoints: {
      auth: '/api/auth',
      sensors: '/api/sensores'
    }
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});