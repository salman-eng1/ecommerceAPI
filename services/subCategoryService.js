const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubCategory = require("../models/subCategoryModel");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlerFactory");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next(); //to move to the next middleware
};

exports.createSubCategory = factory.createOne(SubCategory);

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) 
  filterObject = { category: req.params.categoryId };
  next();
};

exports.getSubCategories = asyncHandler(async (req, res) => {
  const documentCounts = await SubCategory.countDocuments();
  const apiFeatures = new ApiFeatures(SubCategory.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .search()
    .limitFields()
    .sort();
  const { mongooseQuery, paginationResult } = apiFeatures;
  const subCategories = await mongooseQuery;

  //get the sub category name and hide the parent category id from response ()
  //.populate({ path: "category", select: "name -_id" })
  res.status(200).json({
    results: subCategories.length,
    paginationResult,
    data: subCategories,
  });
});

exports.getSubCategory = factory.getOne(SubCategory)

exports.updateSubCategory = factory.updateOne(SubCategory);

exports.deleteSubCategory = factory.deleteOne(SubCategory);
