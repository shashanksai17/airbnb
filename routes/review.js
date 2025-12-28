const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../util/wrapAsync");
const ExpressError = require("../util/AnError");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const Review = require("../models/review");
const Listing = require("../models/listing");
const reviewController = require("../controllers/reviews");

// reviews post
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// reviews delete
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
