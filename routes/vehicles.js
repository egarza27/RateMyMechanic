const express = require("express");
const vehiclesController = require("../controllers/vehicles");
// const { checkJwt } = require("../middleware");
const router = express.Router();

router.get("/", vehiclesController.getAllVehicles);

router.get("/:id", vehiclesController.getVehiclesByUserId);

router.post("/", vehiclesController.createVehicle);

router.put("/:id", vehiclesController.updateVehicle);

module.exports = router;
