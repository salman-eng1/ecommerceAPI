const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const factory = require("./handlerFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddlware");

//Memory Storage
exports.uploadUserImage = uploadSingleImage("profileImg");

// use memory storage only when you have to process the image
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `user-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/users/${fileName}`);

    req.body.profileImg = fileName;
  }
  next();
});
//console.log(uploadCategoryImage);

// @desc     get list of users
//@route     GET .api/v1/users
//access     private
exports.getUsers = factory.getAll(User);

// @desc     getCategoryById
//@route     GET .api/v1/users/:id
//access     private
exports.getUser = factory.getOne(User);

// async & await used to allow java script to execute the remaining codes before this function is executed to avoid block execution for remaining code
//asyncHandler is responsible for catching error then send it to expresss
// req represent incoming request
//res represent the returend response
// (category) is the parameter we pass to the data parameter which represent the response data

// @desc     createCategory
//@route     POST .api/v1/users
//access     private
exports.createUser = factory.createOne(User);

// @desc     update specific Category
//@route     PUT .api/v1/users/:id
//access     private

exports.updateUser = factory.updateOne(User);

// @desc     update specific Category
//@route     DELETE /api/v1/users/:id
//access     private

exports.deleteUser = factory.deleteOne(User);
