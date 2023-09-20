const express = require("express");

const subCategoriesRoute = require("./subCategoryRoute");

const router = express.Router();
const {
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
  createCategoryValidator,
} = require("../utils/validators/categoryValidator");
const {
  getCategories,
  createCategory,
  getCategory,
  uploadCategoryImage,
  resizeImage,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");


//get all sub categories for specific parent category by its ID
router.use("/:categoryId/subcategories", subCategoriesRoute);

router
  .route("/")
  .get(getCategories)
  .post(
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategory
  );
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);
module.exports = router;
