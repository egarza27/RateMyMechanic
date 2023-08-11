const express = require("express");
const usersController = require("../controllers/users");
const { checkJwt } = require("../middleware");
const router = express.Router();

router.get("/", usersController.getAllUsers);

router.get("/userId", checkJwt, usersController.getUserById);

router.get(
  "/userDataAndVehicles",
  checkJwt,
  usersController.getUserProfileWithVehicles
);

router.post("/", usersController.createUser);

router.put("/:id", usersController.updateUserById);

router.delete("/:first_name", usersController.deleteUserByFirstName);

module.exports = router;
