const route = require('express').Router();
const salesService = require('../services/Sales');
const middlewares = require('../middlewares');

route.get('/', async (req, res) => {
  const response = await salesService.getAllSales();
  return res.status(200).json(response);
});

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await salesService.getSaleById(id);
  if (!response.length) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(response);
});

route.post('/', middlewares.sales, async (req, res) => {
  const array = req.body;
  const response = await salesService.postSale(array);
  return res.status(201).json(response);
});

route.put('/:id', middlewares.sales, async (req, res) => {
  const salesArray = req.body;
  const { id } = req.params;
  const response = await salesService.putSale(salesArray, id);
  if (!response) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(response);
});

route.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await salesService.deleteSale(id);
  if (!response) return res.status(404).json({ message: 'Sale not found' });
  return res.status(204).end();
});

module.exports = route;
