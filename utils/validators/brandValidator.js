const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

//validation process will get the id from the request as calrified in the following rule

exports.getBrandValidator = [
  check("id").isMongoId().withMessage("invalid brand id"),
  validatorMiddleware,
];

exports.createBrandValidator=[
  check("name").notEmpty().withMessage('brand required')
  .isLength({min: 3})
  .withMessage('Too short brand name')
  .isLength({max: 32})
  .withMessage('Too long brand name'),
  validatorMiddleware
 
];
exports.updateBrandValidator=[
  check("id").isMongoId().withMessage("invalid brand id"),
  validatorMiddleware,
];
exports.deleteBrandValidator=[
  check("id").isMongoId().withMessage("invalid brand id"),
  validatorMiddleware,
];