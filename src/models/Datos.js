const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  temperatura: {
    type: Number,
    required: true
  },
  humedad: {
    type: Number,
    required: true
  },
  co2: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  external_id: {
    type: String,
    required: false, // Asegúrate de que no sea obligatorio si no es necesario
    unique: false // Elimina la restricción de unicidad
  }
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
