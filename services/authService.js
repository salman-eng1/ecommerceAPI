const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/apiError");
const User = require("../models/userModel");

const createToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
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
  const token = createToken(user._id);
  res.status(201).json({ data: user, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Invalid Credentials", 401));
  }
  const token = createToken(user._id);

  res.status(201).json({ data: user, token });
});

exports.protect = asyncHandler(async (req, res, next) => {
  //1) check if token exists, if exsists get it
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
  }
  if (!token) {
    return next(new ApiError("please login to get access to this route", 401));
  }

  //2)verify token (no change happens, expired token)
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decode);

  //3)check if user exists and not changed
  const currentUser = await User.findById(decode.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        "the user that belong to this token does no longer exist",
        401
      )
    );
  }

  //4) check if user change his password after token created
});
