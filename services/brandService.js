const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Brand = require("../models/brandModel");
const ApiError = require("../utils/apiError");

// @desc     get list of brands
//@route     GET .api/v1/brands
//access     public
exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const brands = await Brand.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: brands.length, page, data: brands });
});

// @desc     getBrandById
//@route     GET .api/v1/brands/:id
//access     public
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);

  if (!brand) {
    // res.status(404).json({ msg: ` Brand is not available for id: ${id}` });
  }
  res.status(200).json({ date: brand });
});

// async & await used to allow java script to execute the remaining codes before this function is executed to avoid block execution for remaining code
//asyncHandler is responsible for catching error then send it to expresss
// req represent incoming request
//res represent the returend response
// (Brand) is the parameter we pass to the data parameter which represent the response data

// @desc     createBrand
//@route     POST .api/v1/brands
//access     private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

// @desc     update specific Brand
//@route     PUT .api/v1/brands/:id
//access     private

exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await Brand.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    return next(new ApiError(` Brand is not updated for id: ${id}`, 404));
  }
  res.status(200).json({ date: brand });
});

// @desc     update specific Brand
//@route     DELETE /api/v1/brands/:id
//access     private

exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndRemove(id);
  if (!brand) {
    return next(new ApiError(` Brand with id: ${id} is not existed for `, 404));
  }
  res.status(204).send();
});
