const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

//validation process will get the id from the request as calrified in the following rule

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id"),
  validatorMiddleware,
];

exports.createCategoryValidator=[
  check("name").notEmpty().withMessage('Category required')
  .isLength({min: 3})
  .withMessage('Too short category name')
  .isLength({max: 32})
  .withMessage('Too long category name'),
  validatorMiddleware
 
];
exports.updateCategoryValidator=[
  check("id").isMongoId().withMessage("invalid category id"),
  validatorMiddleware,
];
exports.deleteCategoryValidator=[
  check("id").isMongoId().withMessage("invalid category id"),
  validatorMiddleware,
];