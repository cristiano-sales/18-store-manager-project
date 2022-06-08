const route = require('express').Router();
const salesService = require('../services/Sales');

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

module.exports = route;
