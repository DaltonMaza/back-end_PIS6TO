const Historial = require("../models/Historial");

const getAllHistorials = async (where = {}, skip = 0, limit = 10) => {
  try {
    const allHistorials = await Historial.find(where).skip(skip).limit(limit);
    return allHistorials;
  } catch (err) {
    throw new Error(`Error al obtener los historiales: ${err.message}`);
  }
};

const getHistorialByExternalId = async (external_id) => {
  try {
    const historial = await Historial.findOne({ external_id });
    if (!historial) {
      throw new Error("El historial no fue encontrado");
    }
    return historial;
  } catch (err) {
    throw new Error(`Error al obtener el historial: ${err.message}`);
  }
};

const createHistorial = async (historialData) => {
  try {
    const historial = await Historial.create(historialData);
    return historial;
  } catch (err) {
    throw new Error(`Error al crear el historial: ${err.message}`);
  }
};

module.exports = {
  getAllHistorials,
  getHistorialByExternalId,
  createHistorial,
};
