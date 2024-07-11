const Data = require("../models/Data");
const { v4: uuidv4 } = require("uuid");

const getAllData = async (where = {}, skip = 10, limit = 10) => {
  const allData = await Data.find(where).skip(skip).limit(limit);
  return allData;
};

const getDataByExternalId = async (external_id) => {
  const data = await Data.findOne({ external_id });
  if (!data) {
    throw new Error("Los datos no fueron encontrados");
  }
  return data;
};

const createData = async (newData) => {
  const dataExist = await Data.findOne({ external_id: newData.external_id });
  if (dataExist) {
    throw new Error("Los datos ya existen");
  }
  newData.external_id = uuidv4();
  const data = await Data.create({
    ...newData,
  });
  return data;
};

const updateData = async (external_id, newInfo) => {
  let data = await getDataByExternalId(external_id);
  if (!data) {
    throw new Error("Los datos no existen");
  }
  newInfo.external_id = uuidv4();
  data = await Data.findOneAndUpdate({ external_id }, newInfo, {
    new: true,
    runValidators: true,
  });
  return data;
};

const deleteData = async (external_id) => {
  const data = await getDataByExternalId(external_id);
  if (!data) {
    throw new Error("Los datos no existen");
  }
  const toDelete = await updateData(external_id, {
    deletedAt: new Date(),
  });
  return toDelete;
};

const getCountData = async (where = {}) => {
  where.deletedAt = null;
  return await Data.countDocuments(where);
};

module.exports = {
  getAllData,
  getDataByExternalId,
  createData,
  updateData,
  deleteData,
  getCountData,
};
