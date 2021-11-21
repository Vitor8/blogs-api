const express = require('express');
const bodyParser = require('body-parser');

const {
  createUserController,
  loginUserController,
  getAllUsersController,
  getUserByIdController,
} = require('./controllers/userController');

const {
  createCategoriesController,
  getAllCategoriesController,
} = require('./controllers/categorieController');

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

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
