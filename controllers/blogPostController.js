const Sequelize = require('sequelize');
const { BlogPost, User, Categorie } = require('../models');

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

const getAllPosts = async (_req, res) => {
  const blogPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });

  return res.status(200).json(blogPosts);
};

const getPostById = async (req, res) => {
  const { id: postId } = req.params;
  
  const blogPost = await BlogPost.findOne({
    where: { id: postId },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!blogPost) return res.status(404).json({ message: 'Post does not exist' });

  return res.status(200).json(blogPost);
};

const updatePostController = async (req, res) => {
  const { id: postId } = req.params;
  const { title, content } = req.body;
  
  const blogPost = await BlogPost.findOne({ where: { id: postId } });
  const { userId } = blogPost;
  const { published } = blogPost;
  const updatedDate = Date.now();

  await BlogPost.update(
    { title, content, userId, published, updatedDate },
    { where: { id: postId } },
  );

  const newBlogPost = await BlogPost.findOne({
    where: { id: postId },
    attributes: { exclude: ['id', 'published', 'updated'] },
    include: [
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });
  
  return res.status(200).json(newBlogPost);
};

const deletePostController = async (req, res) => {
  const { id } = req.params;

  await BlogPost.destroy({ where: { id } });

  return res.status(204).json({ message: 'Delete successfully' });
};

const getPostsByTerm = async (correctSearchTerm, _req, res) => {
  console.log(correctSearchTerm);

  const blogPostFiltered = await BlogPost.findAll({
    where: {
      [Sequelize.Op.or]: [
        { title: correctSearchTerm },
        { content: correctSearchTerm },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });

  return res.status(200).json(blogPostFiltered);
};

const getPostByTermController = async (req, res) => {
  const { q: searchTerm } = req.query;
  let blogPostFiltered;

  if (searchTerm === '') {
    blogPostFiltered = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categorie, as: 'categories', through: { attributes: [] } },
      ],
    });
    return res.status(200).json(blogPostFiltered);
  } 
    const correctSearchTerm = searchTerm.replace(/(\r\n|\n|\r)/gm, '');
    await getPostsByTerm(correctSearchTerm, req, res);
};

module.exports = {
  createBlogPostController,
  getAllPosts,
  getPostById,
  updatePostController,
  deletePostController,
  getPostByTermController,
};