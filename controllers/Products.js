const productsService = require('../services/Products');
const { OK, NOT_FOUND, CONFLICT, CREATED, NO_CONTENT } = require('../utils/status');

const getAll = async (req, res) => {
  const response = await productsService.getAllProducts();
  return res.status(OK).json(response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await productsService.getProductById(id);
  if (!response) return res.status(NOT_FOUND).json({ message: 'Product not found' });
  return res.status(OK).json(response);
};

const post = async (req, res) => {
  const { name, quantity } = req.body;
  const allProducts = (await productsService.getAllProducts()).find(({ name: n }) => n === name);
  if (allProducts) return res.status(CONFLICT).json({ message: 'Product already exists' });
  const response = await productsService.postProduct(name, +quantity);
  return res.status(CREATED).json(response);
};

const put = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const response = await productsService.putProduct(name, +quantity, id);
  if (!response) return res.status(NOT_FOUND).json({ message: 'Product not found' });
  return res.status(OK).json(response);
};

const deleteP = async (req, res) => {
  const { id } = req.params;
  const response = await productsService.deleteProduct(id);
  if (!response) return res.status(NOT_FOUND).json({ message: 'Product not found' });
  return res.status(NO_CONTENT).end();
};

module.exports = { getAll, getById, post, put, deleteP };

/*
Interface mais próxima da pessoa usuária ou de uma requisição, irá processar e chamar as devidas funções da camada de serviço
*/
