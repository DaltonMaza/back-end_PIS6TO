const historialService = require("../services/historialService");
const Historial = require("../models/Historial");

module.exports = {
  getAllHistorials: async (req, res) => {
    const { skip = 0, limit = 50, ...where } = req.query;
    try {
      const allHistorials = await Historial.find(where).skip(skip).limit(limit);
      where.deletedAt = null;
      const numberHistorials = await Historial.countDocuments(where);
      res.json({ numberHistorials, allHistorials });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getHistorialByExternalId: async (req, res, next) => {
    const external_id = req.params.external;
    try {
      const historial = await Historial.findOne({ external_id });
      if (!historial) {
        return res.status(404).json({ status: 400, message: "El historial no fue encontrado" });
      }
      return res.json(historial);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createHistorial: async (req, res) => {
    try {
      const historial = await historialService.createHistorial(req.body);
      return res.json(historial);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
