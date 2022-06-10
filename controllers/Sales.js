const salesService = require('../services/Sales');

const getAll = async (req, res) => {
  const response = await salesService.getAllSales();
  return res.status(202).json(response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await salesService.getSaleById(id);
  if (!response.length) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(response);
};

const post = async (req, res) => {
  const array = req.body;
  const response = await salesService.postSale(array);
  if (response.error) {
    return res.status(422)
    .json({ message: 'Such amount is not permitted to sell' });
  }
  return res.status(201).json(response);
};

const put = async (req, res) => {
  const salesArray = req.body;
  const { id } = req.params;
  const response = await salesService.putSale(salesArray, id);
  if (!response) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(response);
};

const deleteS = async (req, res) => {
  const { id } = req.params;
  const response = await salesService.deleteSale(id);
  if (!response) return res.status(404).json({ message: 'Sale not found' });
  return res.status(204).end();
};

module.exports = { getAll, getById, post, put, deleteS };
