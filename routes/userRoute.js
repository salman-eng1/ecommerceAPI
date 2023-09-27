const express = require("express");

const router = express.Router();
const {
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
  createUserValidator,
  changeUserPasswordValidator,
} = require("../utils/validators/userValidator");
const {
  getUsers,
  createUser,
  getUser,
  uploadUserImage,
  resizeImage,
  updateUser,
  deleteUser,
  changeUserPassword,
} = require("../services/userService");

router
  .route("/")
  .get(getUsers)
  .post(uploadUserImage, resizeImage, createUserValidator, createUser);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

router.put(
  "/changepassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);

module.exports = router;
