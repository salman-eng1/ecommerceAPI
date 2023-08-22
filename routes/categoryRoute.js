const express = require("express");
const router = express.Router();
const { param,validationResult } = require('express-validator');

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

router.route("/").get(getCategories).post(createCategory);
router
  .route("/:id")
  //validation process will get the id from the request as calrified in the following rule
  .get(param('id').isMongoId().withMessage('invalid category id'), 
  //req will be passed to the validation layer
  (req, res) => {
    //validationResult will check according to the rules and return empty value in case of valid id
    // and will return error info in case of invalid id
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
},getCategory)
  .put(updateCategory)
  .delete(deleteCategory);
module.exports = router;
