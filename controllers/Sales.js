const salesService = require('../services/Sales');
const { OK, CREATED, NO_CONTENT, NOT_FOUND, UNPROCESSABLE_ENTITY } = require('../utils/status');

const getAll = async (req, res) => {
  const response = await salesService.getAllSales();
  return res.status(OK).json(response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await salesService.getSaleById(id);
  if (!response.length) return res.status(NOT_FOUND).json({ message: 'Sale not found' });
  return res.status(OK).json(response);
};

const post = async (req, res) => {
  const array = req.body;
  const response = await salesService.postSale(array);
  if (response.error) {
    return res.status(UNPROCESSABLE_ENTITY)
    .json({ message: 'Such amount is not permitted to sell' });
  }
  return res.status(CREATED).json(response);
};

const put = async (req, res) => {
  const salesArray = req.body;
  const { id } = req.params;
  const response = await salesService.putSale(salesArray, id);
  if (!response) return res.status(NOT_FOUND).json({ message: 'Sale not found' });
  return res.status(OK).json(response);
};

const deleteS = async (req, res) => {
  const { id } = req.params;
  const response = await salesService.deleteSale(id);
  if (!response) return res.status(NOT_FOUND).json({ message: 'Sale not found' });
  return res.status(NO_CONTENT).end();
};

module.exports = { getAll, getById, post, put, deleteS };

/*
Interface mais próxima da pessoa usuária ou de uma requisição, irá processar e chamar as devidas funções da camada de serviço
*/
