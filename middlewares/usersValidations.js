const jwt = require('jsonwebtoken');

const { User } = require('../models');

const isDisplayNameValid = (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) { 
    return res.status(400).json({ 
      message: '"displayName" length must be at least 8 characters long',
    });
  }

  next();
};

const validEmail = (email) => {
  if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z.-]+\.[A-Z]{2,}$/igm)) return true;
  return false;
};

const isEmailValid = (req, res, next) => {
  const { email } = req.body;

  if (email === undefined) return res.status(400).json({ message: '"email" is required' });

  if (email === '') {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }

  if (!validEmail(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  next();
};

const isPasswordValid = (req, res, next) => {
  const { password } = req.body;

  if (password === undefined) return res.status(400).json({ message: '"password" is required' });

  if (password === '') {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }

  if (password.length !== 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }

  next();
};

const isEmailAlreadyRegistered = async (req, res, next) => {
  const { email } = req.body;

  const users = await User.findAll();

  const isEmailRegistered = users.some((user) => user.email === email);

  if (isEmailRegistered) return res.status(409).json({ message: 'User already registered' });

  next();
};

const isUserRegistered = async (req, res, next) => {
  const { email } = req.body;

  const users = await User.findAll();

  const isEmailRegistered = users.some((user) => user.email === email);

  if (!isEmailRegistered) return res.status(400).json({ message: 'Invalid fields' });

  next();
};

const isTokenValid = async (req, res, next) => {
  const token = req.headers.authorization;
  const secret = 'quinze';

  if (!token) {
    return res.status(401).json({
      message: 'Token not found',
    });
  }

  try {
    const payload = jwt.verify(token, secret);

    req.user = payload;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Expired or invalid token',
    });
  }
};

module.exports = {
  isDisplayNameValid,
  isEmailValid,
  isPasswordValid,
  isEmailAlreadyRegistered,
  isUserRegistered,
  isTokenValid,
};