const express = require("express");
const vehiclesController = require("../controllers/vehicles");
const { checkJwt } = require("../middleware");
const router = express.Router();

router.get("/userId", checkJwt, vehiclesController.getVehiclesByUserId);

router.post("/", vehiclesController.createVehicle);

router.put("/updateMileage", checkJwt, vehiclesController.updateMileage);

router.delete(
  "/deleteVehicleByVin",
  checkJwt,
  vehiclesController.deleteVehicleByVin
);

module.exports = router;
