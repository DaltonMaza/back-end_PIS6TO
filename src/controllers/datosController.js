const Data = require("../models/Datos");

module.exports = {
  getAllData: async (req, res) => {
    const { skip = 0, limit = 10, ...where } = req.query;
    const allData = await Data.find(where).skip(skip).limit(limit);
    const numberData = await Data.countDocuments(where);
    res.json({ numberData, allData });
  },

  getDataById: async (req, res) => {
    const { id } = req.params;
    const data = await Data.findById(id);
    if (!data) {
      return res.status(404).json({ status: 404, message: "Dato no encontrado" });
    }
    return res.json(data);
  },

  createData: async (mqdata) => {
    try {
      console.log(mqdata);
      const data = new Data(mqdata);
      console.log(data);
      await data.save();
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ status: 400, message: "Error al crear el dato", error });
    }
  },

  updateData: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await Data.findByIdAndUpdate(id, req.body, { new: true });
      if (!data) {
        return res.status(404).json({ status: 404, message: "Dato no encontrado" });
      }
      return res.json(data);
    } catch (error) {
      res.status(400).json({ status: 400, message: "Error al actualizar el dato", error });
    }
  },

  deleteData: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await Data.findByIdAndDelete(id);
      if (!data) {
        return res.status(404).json({ status: 404, message: "Dato no encontrado" });
      }
      return res.json({ status: 200, message: "Dato eliminado correctamente" });
    } catch (error) {
      res.status(400).json({ status: 400, message: "Error al eliminar el dato", error });
    }
  },
};
