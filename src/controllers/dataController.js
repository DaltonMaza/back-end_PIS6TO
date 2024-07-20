const Data = require("../models/Data");

module.exports = {
  createData: async (req, res) => {
    try {
      const dataInstance = new Data({
        humidity: req.body.humidity,
        temperature: req.body.temperature
      });
      console.log(dataInstance);
      await dataInstance.save();
      res.status(201).send(dataInstance);
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error.message }); // Enviar error como objeto JSON
    }
  },

  getAllData: async (req, res) => {
    try {
      const allData = await Data.find();
      console.log(allData);
      res.status(200).send(allData);
    } catch (error) {
      res.status(500).send({ error: error.message }); // Enviar error como objeto JSON
    }
  },

  getDataById: async (req, res) => {
    try {
      const dataInstance = await Data.findById(req.params.id);
      if (!dataInstance) {
        return res.status(404).send();
      }
      res.status(200).send(dataInstance);
    } catch (error) {
      res.status(500).send({ error: error.message }); // Enviar error como objeto JSON
    }
  },

  updateData: async (req, res) => {
    try {
      const dataInstance = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!dataInstance) {
        return res.status(404).send();
      }
      res.status(200).send(dataInstance);
    } catch (error) {
      res.status(400).send({ error: error.message }); // Enviar error como objeto JSON
    }
  },

  deleteData: async (req, res) => {
    try {
      const dataInstance = await Data.findByIdAndDelete(req.params.id);
      if (!dataInstance) {
        return res.status(404).send();
      }
      res.status(200).send(dataInstance);
    } catch (error) {
      res.status(500).send({ error: error.message }); // Enviar error como objeto JSON
    }
  }
};
