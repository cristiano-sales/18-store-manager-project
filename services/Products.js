const Products = require('../models/Products');

const getAllProducts = async () => {
  const response = await Products.getAll();
  return response;
};

const getProductById = async (id) => {
  const response = await Products.getById(id);
  return response;
};

const postProduct = async (name, quantity) => {
  const response = await Products.postProduct(name, quantity);
  return response;
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
};
