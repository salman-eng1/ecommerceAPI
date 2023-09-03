const mongoose = require('mongoose');

//create schema
const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'Brand existed'],
        required: [true, 'Brand required'],
        minlength: [3, 'Too short Brand name'],
        maxlength: [32, 'Too long Brand name'],
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
module.exports= mongoose.model('Brand', brandSchema);