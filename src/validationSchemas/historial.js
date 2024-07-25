const Joi = require("joi");

const createHistorialSchema = Joi.object({
  temperatura: Joi.number().required().messages({
    "*": "El campo temperatura es requerido y debe ser un número.",
  }),
  humedad: Joi.number().required().messages({
    "*": "El campo presión es requerido y debe ser un número.",
  }),
  co2: Joi.number().required().messages({
    "*": "El campo CO2 es requerido y debe ser un número.",
  }),
  fecha: Joi.date().required().messages({
    "*": "El campo fecha es requerido y debe ser una fecha válida.",
  }),
});

const editHistorialSchema = Joi.object({
  temperatura: Joi.number().optional().messages({
    "*": "El campo temperatura debe ser un número.",
  }),
  humedad: Joi.number().optional().messages({
    "*": "El campo presión debe ser un número.",
  }),
  co2: Joi.number().optional().messages({
    "*": "El campo CO2 debe ser un número.",
  }),
  fecha: Joi.date().optional().messages({
    "*": "El campo fecha debe ser una fecha válida.",
  }),
});

module.exports = { createHistorialSchema, editHistorialSchema };
