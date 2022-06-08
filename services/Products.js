const Products = require('../models/Products');

const getAllProducts = async () => {
  const response = await Products.getAll();
  return response;
};

const getProductById = async (id) => {
  const response = await Products.getById(id);
  return response;
};

module.exports = {
  getAllProducts,
  getProductById,
};
