const Products = require('../models/Products');

const getAllProducts = async () => {
  const [response] = await Products.getAll();
  return response;
};

const getProductById = (id) => {
  const response = Products.getById(id);
  return response;
};

const postProduct = async (name, quantity) => {
  const response = Products.postProduct(name, quantity);
  return response;
};

const putProduct = async (name, quantity, id) => {
  const product = await Products.getById(id);
  if (!product) return null;

  await Products.putProduct(name, quantity, id);
  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  const product = await Products.getById(id);
  if (!product) return null;

  await Products.deleteProduct(id);
  return true;
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
};

/*
Arquivos onde iremos estruturar nossas regras de negócio, geralmente é quem chama os métodos definidos na camada de modelo
*/