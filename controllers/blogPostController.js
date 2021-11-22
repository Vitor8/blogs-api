const { BlogPost, User } = require('../models');

const createBlogPostController = async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.user;

  const users = await User.findAll();
  const currentUser = users.find((user) => user.email === email);
  const userId = currentUser.id;
  const published = Date.now();
  const updated = Date.now();

  const newBlogPost = await BlogPost.create({ title, content, userId, published, updated });

  return res.status(201).json({
    id: newBlogPost.id,
    userId,
    title,
    content,
  });
};

module.exports = { createBlogPostController };