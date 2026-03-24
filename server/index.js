require('dotenv').config();
const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first'); // Nuestro truco confiable para Node 20+

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Appointment = require('./models/Appointment');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de CORS para aceptar peticiones de Angular
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  family: 4
})
.then(() => console.log('🏥 Base de datos de la Clínica conectada!'))
.catch(err => console.error('Error al conectar:', err));

// --- RUTAS DE LA API ---

// 1. Crear un nuevo turno (Lo usará el Portal del Paciente)
app.post('/api/appointments', async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 2. Obtener todos los turnos (Lo usará el Panel Médico)
app.get('/api/appointments', async (req, res) => {
  try {
    // Los ordenamos por fecha de creación (los más nuevos al final)
    const appointments = await Appointment.find().sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. Actualizar el estado de un turno (Lo usará el Panel Médico)
app.patch('/api/appointments/:id', async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true } // Esto le dice a Mongoose que nos devuelva el dato ya actualizado
    );
    res.json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT} 🚀`);
});

module.exports = app;