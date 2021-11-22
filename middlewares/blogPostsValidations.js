const { Categorie } = require('../models');

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

module.exports = { isTitleValid, isContentValid, isCategoryIdsValid, isCategoryIdsAbsent };