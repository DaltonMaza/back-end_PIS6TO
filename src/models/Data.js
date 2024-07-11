const mongoose = require("mongoose");
const manageExternalId = require("../plugins/manageExtenalId");
const Schema = mongoose.Schema;

// Define el esquema para los datos del sensor
const DataSchema = new Schema({
  humidity: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  temperature: {
    type: Number,
    required: true,
    min: -50, 
    max: 150  
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Aplica el plugin manageExternalId al esquema del sensor
DataSchema.plugin(manageExternalId);

// Crea el modelo basado en el esquema
const Data = mongoose.model("data", DataSchema);

module.exports = Data;
