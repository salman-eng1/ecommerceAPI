const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const ApiError = require("../utils/apiError");

// @desc     get list of products
//@route     GET .api/v1/products
//access     public
exports.getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const products = await Product.find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  res.status(200).json({ results: products.length, page, data: products });
});

// @desc     getproductById
//@route     GET .api/v1/products/:id
//access     public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id)
  .populate({ path: "category", select: "name -_id" });;

  if (!product) {
    // res.status(404).json({ msg: ` Products is not available for id: ${id}` });
  }
  res.status(200).json({ date: product });
});

// async & await used to allow java script to execute the remaining codes before this function is executed to avoid block execution for remaining code
//asyncHandler is responsible for catching error then send it to expresss
// req represent incoming request
//res represent the returend response
// (Products) is the parameter we pass to the data parameter which represent the response data

// @desc     createproduct
//@route     POST .api/v1/products
//access     private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = req.body.title;
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

// @desc     update specific Products
//@route     PUT .api/v1/products/:id
//access     private

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title){
    req.body.slug = req.body.title;
  }
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(` Products is not updated for id: ${id}`, 404));
  }
  res.status(200).json({ date: product });
});

// @desc     update specific Products
//@route     DELETE /api/v1/products/:id
//access     private

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndRemove(id);
  if (!product) {
    return next(
      new ApiError(` Products with id: ${id} is not existed for `, 404)
    );
  }
  res.status(204).send();
});
