const Sales = require('../models/Sales');

const sequelize = (array) => array.map((item) => (
    {
      saleId: item.sale_id,
      productId: item.product_id,
      quantity: item.quantity,
      date: item.date,
    }
  ));

  const sequelizeById = (array) => array.map(({ date, product_id: productId, quantity }) => (
    {
      date,
      productId,
      quantity,
    }
));

const getAllSales = async () => {
  const response = await Sales.getAll();
  return sequelize(response);
};

const getSaleById = async (id) => {
  const response = await Sales.getById(id);
  if (!response) return null;
  return sequelizeById(response);
};

const postSale = async (salesArray) => {
  const response = await Sales.postSale(salesArray);
  return response;
};

module.exports = {
  getAllSales,
  getSaleById,
  postSale,
};
