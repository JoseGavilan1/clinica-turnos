const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  rut: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pendiente', 'Completado', 'Cancelado'], 
    default: 'Pendiente' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);