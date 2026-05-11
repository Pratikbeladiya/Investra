const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const env = require('../config/env');

exports.createToken = (userId) => {
  const secret = env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not configured.');
  return jwt.sign({ userId }, secret, { expiresIn: '12h' });
};

exports.registerUser = async (username, email, password) => {
  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    const err = new Error('Email already registered.');
    err.status = 409;
    throw err;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username: username.trim(), email: normalizedEmail, password: hashedPassword });
  return user;
};

exports.authenticateUser = async (email, password) => {
  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) {
    const err = new Error('Invalid email or password.');
    err.status = 401;
    throw err;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error('Invalid email or password.');
    err.status = 401;
    throw err;
  }
  return user;
};

exports.updateProfile = async (user, username) => {
  user.username = username.trim();
  await user.save();
  return user;
};

exports.changePassword = async (user, currentPassword, newPassword) => {
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    const err = new Error('Current password is incorrect.');
    err.status = 401;
    throw err;
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  return user;
};
