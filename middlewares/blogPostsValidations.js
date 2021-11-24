const { Categorie, User, BlogPost } = require('../models');

const isTitleValid = async (req, res, next) => {
  const { title } = req.body;

  if (!title) return res.status(400).json({ message: '"title" is required' });

  next();
};

const isContentValid = async (req, res, next) => {
  const { content } = req.body;

  if (!content) return res.status(400).json({ message: '"content" is required' });

  next();
};

const isCategoryIdsAbsent = async (req, res, next) => {
  const { categoryIds } = req.body;

  if (!categoryIds) return res.status(400).json({ message: '"categoryIds" is required' });

  next();
}; 

const isCategoryIdsValid = async (req, res, next) => {
  const { categoryIds } = req.body;

  const categories = await Categorie.findAll();

  const arraysId = [];
  for (let j = 0; j < categories.length; j += 1) {
    arraysId.push(categories[j].id);
  }

  let absentId = false;
  for (let i = 0; i < categoryIds.length; i += 1) {
    if (!(arraysId.includes(categoryIds[i]))) absentId = true;
  }

  if (absentId) return res.status(400).json({ message: '"categoryIds" not found' });

  next();
};

const isUpdatedUserValid = async (req, res, next) => {
  const { email } = req.user;
  const users = await User.findAll();
  const currentUser = users.find((user) => user.email === email);
  const currentUserId = currentUser.id;

  const { id: postId } = req.params;
  const blogPost = await BlogPost.findOne({ where: { id: postId } });
  const userIdWhoPosted = blogPost.userId;

  if (currentUserId !== userIdWhoPosted) { 
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};

const isUpdatedCategoryValid = async (req, res, next) => {
  const { categoryIds } = req.body;
  
  if (categoryIds) return res.status(400).json({ message: 'Categories cannot be edited' });

  next();
};

const isUpdatedTitleAndContentValid = async (req, res, next) => {
  const { title, content } = req.body;

  if (!title) return res.status(400).json({ message: '"title" is required' });

  if (!content) return res.status(400).json({ message: '"content" is required' });

  next();
};

const isPostValid = async (req, res, next) => {
  const { id } = req.params;

  const blogPost = await BlogPost.findOne({ where: { id } });

  if (!blogPost) return res.status(404).json({ message: 'Post does not exist' });

  next();
};

module.exports = {
  isTitleValid,
  isContentValid,
  isCategoryIdsValid,
  isCategoryIdsAbsent,
  isUpdatedCategoryValid,
  isUpdatedUserValid,
  isUpdatedTitleAndContentValid,
  isPostValid,
};