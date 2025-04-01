const pool = require('./config/db');

// Funciones generadoras de datos (sin cambios)
const generarDatoHumedad = () => (Math.random() * (70) + 30).toFixed(2); // 30-100%
const generarDatoTemperatura = () => (Math.random() * 25 + 15).toFixed(2); // 15-40°C
const generarDatoViento = () => (Math.random() * 30).toFixed(2); // 0-30 km/h
const generarDatoPresion = () => (Math.random() * 70 + 980).toFixed(2); // 980-1050 hPa
const generarDatoRadiacion = () => (Math.random() * 1100 + 100).toFixed(2); // 100-1200 W/m²

const simularDatos = async () => {
    try {
        const [sensores] = await pool.execute("SELECT * FROM Sensores WHERE estado = 'activo'");
        console.log(`Sensores activos encontrados: ${sensores.length}`);

        if (sensores.length === 0) {
            console.log('No hay sensores activos en la base de datos.');
            return;
        }

        for (let sensor of sensores) {
            console.log(`Procesando sensor ID: ${sensor.id_sensor}, Tipo: ${sensor.tipo}, Parámetros: ${sensor.parametros}`);

            if (!sensor.parametros) {
                console.log(`El sensor ${sensor.id_sensor} no tiene parámetros definidos.`);
                continue;
            }

            const parametros = sensor.parametros.split(',');

            for (let param of parametros) {
                let valor;
                let tipoParametro;

                switch (sensor.tipo.trim()) {
                    case 'Humedad del Suelo':
                        if (param.trim() === 'humedad') {
                            valor = generarDatoHumedad();
                            tipoParametro = 'humedad_relativa'; // Nombre normalizado
                        }
                        break;
                    case 'Estacion Metereologica':
                        if (param.trim() === 'humedad') {
                            valor = generarDatoHumedad();
                            tipoParametro = 'humedad_relativa';
                        } else if (param.trim() === 'temperatura') {
                            valor = generarDatoTemperatura();
                            tipoParametro = 'temperatura_ambiente';
                        } else if (param.trim() === 'viento') {
                            valor = generarDatoViento();
                            tipoParametro = 'velocidad_viento';
                        } else if (param.trim() === 'presion') {
                            valor = generarDatoPresion();
                            tipoParametro = 'presion_atmosferica';
                        } else if (param.trim() === 'radiacion') {
                            valor = generarDatoRadiacion();
                            tipoParametro = 'radiacion_solar';
                        }
                        break;
                    default:
                        console.log(`Tipo de sensor desconocido: ${sensor.tipo}`);
                        continue;
                }

                if (valor !== undefined && tipoParametro !== undefined) {
                    await pool.execute(
                        'INSERT INTO HistorialDatos (id_sensor, fecha, valor, parametros) VALUES (?, NOW(), ?, ?)',
                                       [sensor.id_sensor, valor, tipoParametro]
                    );
                    console.log(`${tipoParametro} registrado para el sensor ${sensor.id_sensor}: ${valor}`);
                }
            }
        }

        console.log('Datos simulados insertados correctamente');
    } catch (error) {
        console.error('Error al simular los datos:', error);
    }
};

const borrarDatosAntesDeSalir = async () => {
    try {
        await pool.execute('TRUNCATE TABLE HistorialDatos');
        console.log('Historial de datos borrado correctamente antes de salir');
    } catch (error) {
        console.error('Error al borrar los datos:', error);
    }
};

process.on('SIGINT', async () => {
    console.log('Recibiendo señal de interrupción...');
    await borrarDatosAntesDeSalir();
    process.exit(0);
});

setInterval(simularDatos, 10000);
