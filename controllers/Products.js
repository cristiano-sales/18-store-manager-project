const route = require('express').Router();
const productsService = require('../services/Products');

route.get('/', async (_req, res) => {
  const response = await productsService.getAllProducts();
  return res.status(200).json(response);
});

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await productsService.getProductById(id);
  if (!response) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(response);
});

module.exports = route;
