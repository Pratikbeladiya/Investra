const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/responseHandler');

exports.signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide username, email and password.' });
  }

  const user = await authService.registerUser(username, email, password);
  const token = authService.createToken(user._id);

  res.status(201).json({
    token,
    user: { id: user._id, username: user.username, email: user.email, balance: user.balance },
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password.' });
  }

  const user = await authService.authenticateUser(email, password);
  const token = authService.createToken(user._id);

  successResponse(res, {
    token,
    user: { id: user._id, username: user.username, email: user.email, balance: user.balance },
  });
});

exports.me = asyncHandler(async (req, res) => {
  const user = req.user;
  successResponse(res, { id: user._id, username: user.username, email: user.email, balance: user.balance, createdAt: user.createdAt });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'Username is required.' });
  }

  const user = await authService.updateProfile(req.user, username);
  successResponse(res, { username: user.username, email: user.email, balance: user.balance });
});

exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Current and new password are required.' });
  }

  await authService.changePassword(req.user, currentPassword, newPassword);
  successResponse(res, { message: 'Password updated successfully.' });
});
