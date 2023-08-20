const express = require("express");
const usersController = require("../controllers/users");
const { checkJwt } = require("../middleware");
const router = express.Router();

router.get("/userId", checkJwt, usersController.getUserById);

router.get(
  "/userDataAndVehicles",
  checkJwt,
  usersController.getUserProfileWithVehicles
);

router.put("/updateUserProfile", checkJwt, usersController.updateUserProfile);

module.exports = router;
