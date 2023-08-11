const express = require("express");
const vehiclesController = require("../controllers/vehicles");
const { checkJwt } = require("../middleware");
const router = express.Router();

// router.get("/", vehiclesController.getAllVehicles);

router.get("/test", checkJwt, vehiclesController.getVehiclesByUserId);

router.get("/userId", checkJwt, vehiclesController.getVehiclesByUserId);

router.post("/", vehiclesController.createVehicle);

router.put("/:id", checkJwt, vehiclesController.updateVehicle);

router.delete("/:vin", checkJwt, vehiclesController.deleteVehicleByVin);

module.exports = router;
