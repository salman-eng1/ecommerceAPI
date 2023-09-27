const express = require("express");

const router = express.Router();
const {
  signuprValidator,
  loginValidator,
} = require("../utils/validators/authValidator");
const { signup, login } = require("../services/authService");

router.route("/signup").post(signuprValidator, signup);

router.route("/login").post(loginValidator, login);
// router
//   .route("/:id")
//   .get(getUserValidator, getUser)
//   .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
//   .delete(deleteUserValidator, deleteUser);

module.exports = router;
