const Product = require("../models/productModel");
const factory = require("./handlerFactory");

// @desc     get list of products
//@route     GET .api/v1/products
//access     public
exports.getProducts = factory.getAll(Product, "Products");

//build query
// .populate({ path: "category", select: "name -_id" });

// @desc     getproductById
//@route     GET .api/v1/products/:id
//access     public
exports.getProduct = factory.getOne(Product);

// async & await used to allow java script to execute the remaining codes before this function is executed to avoid block execution for remaining code
//asyncHandler is responsible for catching error then send it to expresss
// req represent incoming request
//res represent the returend response
// (Products) is the parameter we pass to the data parameter which represent the response data

// @desc     createproduct
//@route     POST .api/v1/products
//access     private
exports.createProduct = factory.createOne(Product);

// @desc     update specific Products
//@route     PUT .api/v1/products/:id
//access     private

exports.updateProduct = factory.updateOne(Product);

// @desc     update specific Products
//@route     DELETE /api/v1/products/:id
//access     private

exports.deleteProduct = factory.deleteOne(Product);
