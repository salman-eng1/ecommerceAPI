const mongoose = require('mongoose');

//create schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'category existed'],
        required: [true, 'Category required'],
        minlength: [3, 'Too short category name'],
        maxlength: [32, 'Too long category name'],
    },

    slug: {
        type: String,
        lowercase: true,
    },
    image: String,
},
    { timestamps: true }
);
//create mode
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel