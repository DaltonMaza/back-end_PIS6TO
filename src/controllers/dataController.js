const Data = require("../models/Data");
module.exports = {
    createData : async (req, res) => {
        try {
          const Data = new Data(req.body);
          await Data.save();
          res.status(201).send(Data);
        } catch (error) {
          res.status(400).send(error);
        }
      },
      
      getAllData : async (req, res) => {
        try {
          const Data = await Data.find();
          res.status(200).send(Data);
        } catch (error) {
          res.status(500).send(error);
        }
      },
      
      getDataById : async (req, res) => {
        try {
          const Data = await Data.findById(req.params.id);
          if (!Data) {
            return res.status(404).send();
          }
          res.status(200).send(Data);
        } catch (error) {
          res.status(500).send(error);
        }
      },
      
      updateData : async (req, res) => {
        try {
          const Data = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
          if (!Data) {
            return res.status(404).send();
          }
          res.status(200).send(Data);
        } catch (error) {
          res.status(400).send(error);
        }
      },
      
      deleteData : async (req, res) => {
        try {
          const Data = await Data.findByIdAndDelete(req.params.id);
          if (!Data) {
            return res.status(404).send();
          }
          res.status(200).send(Data);
        } catch (error) {
          res.status(500).send(error);
        }
      }
      
}
