const route = require('express').Router();
const productsService = require('../services/Products');
const middlewares = require('../middlewares');

route.get('/', async (req, res) => {
  const response = await productsService.getAllProducts();
  return res.status(200).json(response);
});

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await productsService.getProductById(id);
  if (!response) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(response);
});

route.post('/', middlewares.productNameQuantity, async (req, res) => {
  const { name, quantity } = req.body;
  const allProducts = (await productsService.getAllProducts()).find(({ name: n }) => n === name);
  if (allProducts) return res.status(409).json({ message: 'Product already exists' });
  const response = await productsService.postProduct(name, +quantity);
  return res.status(201).json(response);
});

route.put('/:id', middlewares.productNameQuantity, async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const response = await productsService.putProduct(name, +quantity, id);
  if (!response) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(response);
});

route.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await productsService.deleteProduct(id);
  if (!response) return res.status(404).json({ message: 'Product not found' });
  return res.status(204).end();
});

module.exports = route;
