const Brand = require("../models/brandModel");
const factory = require("./handlerFactory");

// @desc     get list of brands
//@route     GET .api/v1/brands
//access     public
exports.getBrands = factory.getAll(Brand);

// @desc     getBrandById
//@route     GET .api/v1/brands/:id
//access     public
exports.getBrand = factory.getOne(Brand)

// async & await used to allow java script to execute the remaining codes before this function is executed to avoid block execution for remaining code
//asyncHandler is responsible for catching error then send it to expresss
// req represent incoming request
//res represent the returend response
// (Brand) is the parameter we pass to the data parameter which represent the response data

// @desc     createBrand
//@route     POST .api/v1/brands
//access     private

exports.createBrand = factory.createOne(Brand)
// @desc     update specific Brand
//@route     PUT .api/v1/brands/:id
//access     private

exports.updateBrand = factory.updateOne(Brand)

// @desc     update specific Brand
//@route     DELETE /api/v1/brands/:id
//access     private

exports.deleteBrand = factory.deleteOne(Brand);
