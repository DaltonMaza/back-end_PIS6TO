const Joi = require("joi");

const createDataSchema = Joi.object({
  humidity: Joi.number().required().min(0).max(100).messages({
    "number.base": "El campo humedad debe ser un número",
    "number.min": "El campo humedad debe ser al menos 0",
    "number.max": "El campo humedad no debe exceder 100",
    "any.required": "El campo humedad es requerido",
  }),
  temperature: Joi.number().required().min(-50).max(150).messages({
    "number.base": "El campo temperatura debe ser un número",
    "number.min": "El campo temperatura debe ser al menos -50",
    "number.max": "El campo temperatura no debe exceder 150",
    "any.required": "El campo temperatura es requerido",
  }),
  timestamp: Joi.date().optional().messages({
    "date.base": "El campo timestamp debe ser una fecha válida",
  }),
});

const editDataSchema = Joi.object({
  id: Joi.string().optional().custom((value, helpers) => {
    if (!isValidObjectId(value)) {
      return helpers.message("Id no válido");
    }
    return value;
  }),
  humidity: Joi.number().optional().min(0).max(100).messages({
    "number.base": "El campo humedad debe ser un número",
    "number.min": "El campo humedad debe ser al menos 0",
    "number.max": "El campo humedad no debe exceder 100",
  }),
  temperature: Joi.number().optional().min(-50).max(150).messages({
    "number.base": "El campo temperatura debe ser un número",
    "number.min": "El campo temperatura debe ser al menos -50",
    "number.max": "El campo temperatura no debe exceder 150",
  }),
  timestamp: Joi.date().optional().messages({
    "date.base": "El campo timestamp debe ser una fecha válida",
  }),
});

module.exports = { createDataSchema, editDataSchema };