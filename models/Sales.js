const connection = require('./connection');

const getAll = async () => {
  const query = `
  SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
  FROM StoreManager.sales as s
  INNER JOIN StoreManager.sales_products as sp
  ON s.id = sp.sale_id;
  `;
  const [response] = await connection.execute(query);
  return response;
};

const getById = async (id) => {
  const query = `
  SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
  FROM StoreManager.sales as s
  INNER JOIN StoreManager.sales_products as sp
  ON s.id = sp.sale_id
  WHERE sp.sale_id = ?;
  `;
  const [sale] = await connection.execute(query, [id]);
  if (!sale) return null;

  return sale;
};

module.exports = {
  getAll,
  getById,
};
