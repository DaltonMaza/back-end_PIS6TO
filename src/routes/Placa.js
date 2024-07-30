const express = require('express');
const router = express.Router();
const Placa = require('../models/Placa');

// Ruta para obtener todas las placas
router.get('/api/Placa', async (req, res) => {
  try {
    const placas = await Placa.find(); // Encuentra todas las placas
    res.status(200).json(placas);
  } catch (error) {
    console.error('Error al obtener las placas:', error);
    res.status(500).json({ error: 'Error al obtener las placas' });
  }
});

// Ruta para crear una nueva placa
router.post('/api/Placa', async (req, res) => {
  try {
    const { identificador, estado } = req.body;

    // Validar datos
    if (!identificador || !estado) {
      return res.status(400).json({ error: 'Identificador y estado son requeridos' });
    }

    // Crear la nueva placa
    const nuevaPlaca = new Placa({ identificador, estado });
    await nuevaPlaca.save();

    res.status(201).json(nuevaPlaca);
  } catch (err) {
    console.error('Error al crear la placa:', err);
    res.status(500).json({ error: 'Error al crear la placa' });
  }
});

module.exports = router;
