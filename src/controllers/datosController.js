const Data = require("../models/Datos");

module.exports = {
  getAllData: async (req, res) => {
    
    const allData = await Data.find();
    const numberData = await Data.countDocuments();
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
      return { status: 201, data };
    } catch (error) {
      return { status: 400, error: "Error al crear el dato", details: error };
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
