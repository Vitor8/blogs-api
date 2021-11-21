const { User } = require('../models');
const { createUserService, loginUserService } = require('../services/userServices');

const createUserController = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
  
    const { token } = await createUserService({ displayName, email, password, image });
  
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const { token } = await loginUserService({ email, password });
  
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getUserByIdController = async (req, res) => {
  try {    
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  createUserController,
  loginUserController,
  getAllUsersController,
  getUserByIdController,
};