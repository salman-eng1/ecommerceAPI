const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Too short product title"],
      maxlength: [100, "Too long product title"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      minlength: [20, "Too short product description"],
    },
    quantity: {
      type: Number,
      required: [true, "product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
      trim: true,
      max: [200000, "Too long product price"],
    },
    priceAfterDiscount: {
      type: Number,
      trim: true,
      maxlength: [20, "Too long product price"],
    },
    colors: [String],

    imageCover: {
      type: String,
      required: [true, "product image cover is required"],
    },
    images: [String],

    category: {
      type: mongoose.Schema.ObjectId,
      required: [true, "product must belong to category"],
      ref: "Category",
    },
    subCategories: [
      {
        type: mongoose.Schema.ObjectId,
        required: [true, "product must belong to Sub Category at least"],
        ref: "SubCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAvg: {
      type: Number,
      min: [1, "Rating must be higher or equal 1.0"],
      max: [5, "Rating must be less or equal 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
