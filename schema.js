const Joi = require("joi");

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().min(1).required(), // Title must be a non-empty string
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
        
        // Change image to be an object with a url property
        image: Joi.object({
            url: Joi.string().uri().required(), // Ensure it's a valid URL
            filename: Joi.string().allow("", null) // Optional filename field
        }).required() // Make the image object required
    }).required()
});

module.exports.listingSchema = listingSchema;

module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required()
})