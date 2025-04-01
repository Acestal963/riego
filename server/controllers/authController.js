const User = require('../models/User');
const bcrypt = require('bcrypt'); // Importar bcrypt para hashear contraseñas
const jwt = require('jsonwebtoken'); // Importar jsonwebtoken para generar tokens

const register = async (req, res) => {
  const { nombre, apellido, email, password, tipoCultivo, hectareas } = req.body;

  try {
    // Hashear la contraseña
    const saltRounds = 10; // Número de rondas de hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear el usuario en la base de datos
    await User.create({
      nombre,
      apellido,
      correo_electronico: email,
      contraseña: hashedPassword, // Guardar la contraseña hasheada
      Tipo_cultivo: tipoCultivo,
      Hectareas: hectareas,
    });

    res.status(201).json({ msg: 'Usuario registrado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al registrar el usuario', error: err.message });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validar que los campos no estén vacíos
    if (!email || !password) {
      return res.status(400).json({ msg: 'Por favor, ingresa tu correo electrónico y contraseña' });
    }

    // Buscar el usuario por correo electrónico
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(400).json({ msg: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.contraseña);

    if (!isPasswordValid) {
      return res.status(400).json({ msg: 'Contraseña incorrecta' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret_key', {
      expiresIn: '1h', // El token expira en 1 hora
    });

    // Enviar el token como respuesta
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al iniciar sesión', error: err.message });
  }
};
module.exports = { register, login };
