const express = require("express");
const reviewsController = require("../controllers/reviews");
// const { checkJwt } = require("../middleware");
const router = express.Router();

router.get("/:id", usersController.getReviewByUserId);

router.post("/", usersController.createReview);

module.exports = router;
