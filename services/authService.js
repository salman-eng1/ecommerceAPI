const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcryptjs")
const ApiError = require("../utils/apiError");
const User = require("../models/userModel");

const createToken=(payload)=>
    jwt.sign({ userId: payload}, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

exports.signup = asyncHandler(async (req, res, next) => {
  //1- create user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  //2- Generate token
  const token = createToken(user._id)
  res.status(201).json({ data: user, token });
});

exports.login=asyncHandler(async(req,res,next)=>{
  const user=await User.findOne({email: req.body.email});
  if (!user || !(await bcrypt.compare(req.body.password, user.password))){
    return next(new ApiError("Invalid Credentials"))
  }
  const token = createToken(user._id)

  res.status(201).json({ data: user, token });
})