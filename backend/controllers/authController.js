const jwt = require('jsonwebtoken');
const { User } = require('../models');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: user.toSafeObject(),
    },
  });
};

// POST /api/auth/signup
const signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return next(new AppError('An account with this email already exists.', 409));
  }

  const newUser = await User.create({ name, email, password });
  createSendToken(newUser, 201, res);
});

// POST /api/auth/login
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Incorrect email or password.', 401));
  }

  createSendToken(user, 200, res);
});

// GET /api/auth/me
const getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user.toSafeObject(),
    },
  });
});

module.exports = { signup, login, getMe };
