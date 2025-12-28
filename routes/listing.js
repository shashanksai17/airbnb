const express = require("express");
const router = express.Router();
const wrapAsync = require("../util/wrapAsync");
const Listing = require("../models/listing");
const { isLoggedIn } = require("../middleware");
const flash = require("connect-flash");
const { isOwner } = require("../middleware");
const { validateListing } = require("../middleware");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
// store uploads inside the `public/uploads` folder so Express can serve them

const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//create route or new
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
