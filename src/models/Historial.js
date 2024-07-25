const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const manageExternalId = require('../plugins/manageExtenalId');

const historialSchema = new Schema({
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
    fecha: {
        type: Date,
        required: true
    },
}, {
    timestamps: true
});

historialSchema.plugin(manageExternalId);
const Historial = mongoose.model('Historial', historialSchema);

module.exports = Historial;
