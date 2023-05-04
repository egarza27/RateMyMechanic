const express = require("express");
const reviewsController = require("../controllers/reviews");
// const { checkJwt } = require("../middleware");
const router = express.Router();

router.get("/:id", reviewsController.getReviewByUserId);

router.post("/", reviewsController.createReview);

module.exports = router;
