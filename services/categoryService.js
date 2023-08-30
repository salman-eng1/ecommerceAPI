const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const ApiError = require("../utils/apiError");

// @desc     get list of categories
//@route     GET .api/v1/categories
//access     public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const categories = await Category.find({})
    .skip(skip)
    .limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

// @desc     getCategoryById
//@route     GET .api/v1/categories/:id
//access     public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) {
    // res.status(404).json({ msg: ` category is not available for id: ${id}` });
  }
  res.status(200).json({ date: category });
});

// async & await used to allow java script to execute the remaining codes before this function is executed to avoid block execution for remaining code
//asyncHandler is responsible for catching error then send it to expresss
// req represent incoming request
//res represent the returend response
// (category) is the parameter we pass to the data parameter which represent the response data

// @desc     createCategory
//@route     POST .api/v1/categories
//access     private
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body.name;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc     update specific Category
//@route     PUT .api/v1/categories/:id
//access     private

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    return next(new ApiError(` category is not updated for id: ${id}`, 404));
  }
  res.status(200).json({ date: category });
});

// @desc     update specific Category
//@route     DELETE /api/v1/categories/:id
//access     private

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndRemove(id);
  if (!category) {
    return next(
      new ApiError(` category with id: ${id} is not existed for `, 404)
    );
  }
  res.status(204).send();
});
