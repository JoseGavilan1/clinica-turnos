require('dotenv').config();
const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first'); 
let isConnected = false;


const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = db.connections[0].readyState;
    console.log('🏥 MongoDB Conectado');
  } catch (err) {
    console.error('❌ Error de conexión:', err);
  }
};
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Appointment = require('./models/Appointment');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'http://localhost:4200', 
    'https://clinica-turnos-jgavilan.vercel.app' 
  ],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  family: 4
})
.then(() => console.log('🏥 Base de datos de la Clínica conectada!'))
.catch(err => console.error('Error al conectar:', err));


app.post('/api/appointments', async (req, res) => {
    await connectDB();
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/appointments', async (req, res) => {
    await connectDB();
  try {
    const appointments = await Appointment.find().sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch('/api/appointments/:id', async (req, res) => {
    await connectDB();
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true } 
    );
    res.json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT} 🚀`);
});

app.get('/', (req, res) => {
  res.send('🏥 API de Clínica Turnos funcionando perfectamente en Vercel!');
});

module.exports = app;