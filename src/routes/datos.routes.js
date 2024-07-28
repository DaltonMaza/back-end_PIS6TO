var express = require("express");
var router = express.Router();
var dataController = require("../controllers/datosController");
const isLoggedIn = require("../policies/isLoggedIn");
const { createDataSchema, editDataSchema, exportDataSchema} = require("../validationSchemas/data");
const middleware = require("../middlewares");

/**
 * @route GET /
 * @desc Obtener todos los datos
 * @access Public
 */
router.get("/", dataController.getAllData);

/**
 * @route GET /:id
 * @desc Obtener dato por id
 * @access Public
 */
router.get("/:id", dataController.getDataById);

/**
 * @route POST /
 * @desc Crear dato
 * @access Logged
 */
router.post(
  "/",
  isLoggedIn,
  middleware.validateRequestBody(createDataSchema),
  dataController.createData
);

/**
 * @route POST /
 * @desc Exportar Datos
 * @access Logged
 */
router.post(
  "/export",
  //isLoggedIn,
  middleware.validateRequestBody(exportDataSchema),
  dataController.exportData
);
/**
 * @route PUT /:id
 * @desc Actualizar dato por id
 * @access Logged
 */
router.put(
  "/:id",
  isLoggedIn,
  middleware.validateRequestBody(editDataSchema),
  dataController.updateData
);

/**
 * @route DELETE /:id
 * @desc Eliminar dato por id
 * @access Logged
 */
router.delete("/:id", isLoggedIn, dataController.deleteData);

module.exports = router;
