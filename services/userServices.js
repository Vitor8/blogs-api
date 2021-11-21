const jwt = require('jsonwebtoken');
const { User } = require('../models');

const createUserService = async ({ displayName, email, password, image }) => {
  await User.create({ displayName, email, password, image });

  const secret = 'quinze';

  const payload = {
    email,
    password,
  };

  const token = jwt.sign(payload, secret, {
    expiresIn: '1h',
  });

  return { token };
};

const loginUserService = async ({ email, password }) => {
  const secret = 'quinze';

  const payload = {
    email,
    password,
  };

  const token = jwt.sign(payload, secret, {
    expiresIn: '1h',
  });

  return { token };
};

module.exports = { createUserService, loginUserService };