const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const factory = require("./handlerFactory");
const {uploadSingleImage}=require("../middlewares/uploadImageMiddlware")

//Memory Storage
exports.uploadCategoryImage=uploadSingleImage("image")


// use memory storage only when you have to process the image
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `category-${uuidv4()}-${Date.now()}.jpeg`;
 if (req.file){
  await sharp(req.file.buffer)
  .resize(600, 600)
  .toFormat("jpeg")
  .jpeg({ quality: 90 })
  .toFile(`uploads/categories/${fileName}`);

req.body.image = fileName;
 }
  next();
});
//console.log(uploadCategoryImage);

// @desc     get list of categories
//@route     GET .api/v1/categories
//access     public
exports.getCategories = factory.getAll(Category);

// @desc     getCategoryById
//@route     GET .api/v1/categories/:id
//access     public
exports.getCategory = factory.getOne(Category);

// async & await used to allow java script to execute the remaining codes before this function is executed to avoid block execution for remaining code
//asyncHandler is responsible for catching error then send it to expresss
// req represent incoming request
//res represent the returend response
// (category) is the parameter we pass to the data parameter which represent the response data

// @desc     createCategory
//@route     POST .api/v1/categories
//access     private
exports.createCategory = factory.createOne(Category);

// @desc     update specific Category
//@route     PUT .api/v1/categories/:id
//access     private

exports.updateCategory = factory.updateOne(Category);

// @desc     update specific Category
//@route     DELETE /api/v1/categories/:id
//access     private

exports.deleteCategory = factory.deleteOne(Category);
