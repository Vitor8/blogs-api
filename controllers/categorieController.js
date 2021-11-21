const { Categorie } = require('../models');

const createCategoriesController = async (req, res) => {
  try {
    const { name } = req.body;
  
    const categorie = await Categorie.create({ name });
  
    return res.status(201).json(categorie);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getAllCategoriesController = async (_req, res) => {
  try {
    const categories = await Categorie.findAll();

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = { createCategoriesController, getAllCategoriesController };