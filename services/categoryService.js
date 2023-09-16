const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlerFactory");

// @desc     get list of categories
//@route     GET .api/v1/categories
//access     public
exports.getCategories = asyncHandler(async (req, res) => {
  const documentCounts = await Category.countDocuments();
  const apiFeatures = new ApiFeatures(Category.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .search()
    .limitFields()
    .sort();
  const { mongooseQuery, paginationResult } = apiFeatures;
  const categories = await mongooseQuery;
  res.status(200).json({ results: categories.length, paginationResult, data: categories });
});

// @desc     getCategoryById
//@route     GET .api/v1/categories/:id
//access     public
exports.getCategory = factory.getOne(Category)

// async & await used to allow java script to execute the remaining codes before this function is executed to avoid block execution for remaining code
//asyncHandler is responsible for catching error then send it to expresss
// req represent incoming request
//res represent the returend response
// (category) is the parameter we pass to the data parameter which represent the response data

// @desc     createCategory
//@route     POST .api/v1/categories
//access     private
exports.createCategory = factory.createOne(Category)


// @desc     update specific Category
//@route     PUT .api/v1/categories/:id
//access     private

exports.updateCategory = factory.updateOne(Category)


// @desc     update specific Category
//@route     DELETE /api/v1/categories/:id
//access     private

exports.deleteCategory =factory.deleteOne(Category);
