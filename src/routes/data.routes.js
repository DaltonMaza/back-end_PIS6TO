var express = require("express");
var router = express.Router();
var DataController = require("../controllers/dataController");
const isLoggedIn = require("../policies/isLoggedIn");
const {
  createDataSchema,
  editDataSchema,
} = require("../validationSchemas/data");
const middleware = require("../middlewares");

/**
 *  @route GET /
 *  @desc Obtener todos los datos del sensor
 *  @access Logged
 */
//router.get("/", isLoggedIn, DataController.getAllData);
router.get("/", DataController.getAllData);

/**
 * @route GET /:external
 * @desc Obtener datos del sensor por external_id
 * @access Public
 */
router.get("/:external", DataController.getDataById);

/**
 * @route POST /
 * @desc Crear datos del sensor
 * @access Public
 */
router.post(
  "/",
  middleware.validateRequestBody(createDataSchema),
  DataController.createData
);

/**
 * @route POST /
 * @desc Exportar datos del sensor a un archivo xlxs
 * @access Public
 */
router.post(
  "/export",
  //middleware.validateRequestBody(editDataSchema),
  DataController.exportDataToExcel
);


/**
 * @route PUT /:external
 * @desc Actualizar datos del sensor por external_id
 * @access Public
 */
router.put(
  "/:external",
  isLoggedIn,
  middleware.validateRequestBody(editDataSchema),
  DataController.updateData
);

/**
 * @route DELETE /:external
 * @desc Eliminar datos del sensor por external_id
 * @access Logged
 */
router.delete("/:external", isLoggedIn, DataController.deleteData);

module.exports = router;
