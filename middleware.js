const  Listing=require("./models/listing")
const { listingSchema } = require("./schema");
const ExpressError = require("./util/AnError");
const {reviewSchema} = require("./schema");
const Review=require("./models/review");


module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // redirecrtUrl
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in to create listing!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "you are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let {id,reviewId} = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "you are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

 module.exports.validateListing = (req, res, next) => {
  // If a file was uploaded by multer, attach its details to the listing
  if (req.file) {
    req.body = req.body || {};
    req.body.listing = req.body.listing || {};
    req.body.listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

    let { error } = listingSchema.validate(req.body);
  if (error) {
    let msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};



module.exports.validateReview=(req,res,next)=>{
  // Normalize rating (may come from range and/or radio inputs) to a Number
  if (req.body && req.body.review && typeof req.body.review.rating !== "undefined") {
    const r = req.body.review.rating;
    if (Array.isArray(r)) {
      // take the last value (most likely the user's selection)
      req.body.review.rating = Number(r[r.length - 1]);
    } else {
      req.body.review.rating = Number(r);
    }
  }
  const {error}=reviewSchema.validate(req.body);
    if(error){
        const msg=error.details.map(el=>el.message).join(",");
        throw new ExpressError(msg,400);
    }
    else{
        next();
    }   
}
