const Data = require("../models/Data");
const XLSX = require("xlsx");
const fs = require("fs");

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
  },
  exportDataToExcel: async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
      const data = await Data.find({
        timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) }
      });

      if (!data.length) {
        return res.status(404).send({ error: "No data found for the given date range" });
      }

      const jsonData = data.map(doc => ({
        humidity: doc.humidity,
        temperature: doc.temperature,
        timestamp: doc.timestamp
      }));
      
      const worksheet = XLSX.utils.json_to_sheet(jsonData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

      const filePath = `./data_export_${Date.now()}.xlsx`;
      XLSX.writeFile(workbook, filePath);

      res.download(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send({ error: "Error downloading the file" });
        }

        // Remove the file after sending the response
        fs.unlinkSync(filePath);
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
    }
  }
};
