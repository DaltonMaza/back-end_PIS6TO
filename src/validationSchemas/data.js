const Joi = require("joi");

const createDataSchema = Joi.object({
  humidity: Joi.string().required().messages({
    "*": "El campo humedad es requerido y debe ser una cadena de caracteres",
  }),
  temperature: Joi.string().required().messages({
    "*": "El campo temperatura es requerido y debe ser una cadena de caracteres",
  }),
  CO2: Joi.string().required().messages({
    "*": "El campo CO2 es requerido y debe ser una cadena de caracteres",
  }),
  timestamp: Joi.date().required().messages({
    "*": "El campo timestamp es requerido y debe ser una fecha válida",
  }),
});

const editDataSchema = Joi.object({
  humidity: Joi.string().optional().messages({
    "*": "El campo humedad debe ser una cadena de caracteres",
  }),
  temperature: Joi.string().optional().messages({
    "*": "El campo temperatura debe ser una cadena de caracteres",
  }),
  CO2: Joi.string().optional().messages({
    "*": "El campo CO2 debe ser una cadena de caracteres",
  }),
  timestamp: Joi.date().optional().messages({
    "*": "El campo timestamp debe ser una fecha válida",
  }),
});

module.exports = { createDataSchema, editDataSchema };
