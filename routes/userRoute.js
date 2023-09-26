const express = require("express");

const router = express.Router();
// const {
//   getCategoryValidator,
//   updateCategoryValidator,
//   deleteCategoryValidator,
//   createCategoryValidator,
// } = require("../utils/validators/categoryValidator");
const {
  getUsers,
  createUser,
  getUser,
  uploadUserImage,
  resizeImage,
  updateUser,
  deleteUser,
} = require("../services/userService");

router
  .route("/")
  .get(getUsers)
  .post(
    uploadUserImage,
    resizeImage,
    //createCategoryValidator,
    createUser
  );
router
  .route("/:id")
  .get(getUser)
  .put(
    uploadUserImage,
    resizeImage,
    updateUser
  )
  .delete(deleteUser);
module.exports = router;
