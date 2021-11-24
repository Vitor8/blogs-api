const express = require('express');
const bodyParser = require('body-parser');

const {
  createUserController,
  loginUserController,
  getAllUsersController,
  getUserByIdController,
  deleteUserController,
} = require('./controllers/userController');

const {
  createCategoriesController,
  getAllCategoriesController,
} = require('./controllers/categorieController');

const {
  createBlogPostController,
  getAllPosts,
  getPostById,
  updatePostController,
  deletePostController,
  getPostByTermController,
} = require('./controllers/blogPostController');

const {
  isDisplayNameValid,
  isEmailValid,
  isPasswordValid,
  isEmailAlreadyRegistered,
  isUserRegistered,
  isTokenValid,
} = require('./middlewares/usersValidations');

const {
  isNameValid,
} = require('./middlewares/categoriesValidations');

const {
  isTitleValid,
  isContentValid,
  isCategoryIdsValid,
  isCategoryIdsAbsent,
  isUpdatedCategoryValid,
  isUpdatedUserValid,
  isUpdatedTitleAndContentValid,
  isPostValid,
} = require('./middlewares/blogPostsValidations');

const app = express();

app.use(bodyParser.json());

app.post(
  '/user',
  isDisplayNameValid,
  isEmailValid,
  isPasswordValid,
  isEmailAlreadyRegistered,
  createUserController,
);

app.post('/login', isEmailValid, isPasswordValid, isUserRegistered, loginUserController);

app.get('/user', isTokenValid, getAllUsersController);

app.get('/user/:id', isTokenValid, getUserByIdController);

app.post('/categories', isNameValid, isTokenValid, createCategoriesController);

app.get('/categories', isTokenValid, getAllCategoriesController);

app.put(
  '/post/:id',
  isTokenValid,
  isUpdatedCategoryValid,
  isUpdatedUserValid,
  isUpdatedTitleAndContentValid,
  updatePostController,
);

app.delete('/post/:id', isTokenValid, isPostValid, isUpdatedUserValid, deletePostController);

app.delete('/user/me', isTokenValid, deleteUserController);

app.post(
  '/post',
  isTokenValid,
  isTitleValid,
  isContentValid,
  isCategoryIdsAbsent,
  isCategoryIdsValid,
  createBlogPostController,
);

app.get('/post', isTokenValid, getAllPosts);

app.get('/post/search', isTokenValid, getPostByTermController);

app.get('/post/:id', isTokenValid, getPostById);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
