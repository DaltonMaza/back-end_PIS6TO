var express = require("express");
const router = express.Router();
const historialController = require("../controllers/historialController");
const isLoggedIn = require("../policies/isLoggedIn"); // Ajusta el middleware según sea necesario
const {
  createHistorialSchema,
  editHistorialSchema,
} = require("../validationSchemas/historial"); // Ajusta según el esquema de validación
const middleware = require("../middlewares");

/**
 *  @route GET /
 *  @desc Obtener todos los registros de historial
 *  @access Logged
 */
router.get("/obtenerAll", 
  // isLoggedIn, 
  historialController.getAllHistorials
);

/**
 * @route POST/
 * @desc Crear un nuevo registro de historial
 * @access Public
 */
router.post(
  "/crear",
  middleware.validateRequestBody(createHistorialSchema),
  historialController.createHistorial
)

module.exports = router;
