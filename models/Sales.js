const connection = require('./connection');

const getAll = async () => {
  const query = `
  SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
  FROM sales as s
  INNER JOIN sales_products as sp
  ON s.id = sp.sale_id;
  `;
  const [response] = await connection.execute(query);
  return response;
};

const getById = async (id) => {
  const query = `
  SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
  FROM sales as s
  INNER JOIN sales_products as sp
  ON s.id = sp.sale_id
  WHERE sp.sale_id = ?;
  `;
  const [sale] = await connection.execute(query, [id]);
  if (!sale) return null;

  return sale;
};

const postSale = async () => {
  const querySale = `
  INSERT INTO sales (date) VALUE
  (NOW());
  `;
  const response = await connection.execute(querySale);
  return response[0].insertId;
};

const addSalesProducts = (saleId, productId, quantity) => {
  const querySaleProducts = `
  INSERT INTO sales_products (sale_id, product_id, quantity) VALUE
  (?, ?, ?);
  `;
  connection.execute(querySaleProducts, [saleId, productId, quantity]);
};

const putSale = async (salesArray, id) => {
  const saleId = +id;
  const { quantity, productId } = salesArray[0];
  const query = `
  UPDATE sales_products
  SET quantity = ?
  WHERE product_id = ? AND sale_id = ${saleId};
  `;
  await connection.execute(query, [quantity, productId]);
};

const deleteSale = async (id) => {
  const deleteQuery = `
  DELETE FROM sales WHERE id = ?;
  `;
  await connection.execute(deleteQuery, [id]);
};

module.exports = {
  getAll,
  getById,
  postSale,
  putSale,
  deleteSale,
  addSalesProducts,
};
