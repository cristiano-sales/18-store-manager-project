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

const postSale = async (salesArray) => {
  const querySale = `
  INSERT INTO StoreManager.sales (date) VALUE
  (NOW());
  `;
  await connection.execute(querySale);
  const getSaleId = `
  SELECT max(id) FROM sales;
  `;
  const [[maxId]] = await connection.execute(getSaleId);
  const saleId = maxId['max(id)'];
  const querySaleProducts = `
  INSERT INTO sales_products (sale_id, product_id, quantity) VALUE
  (?, ?, ?);
  `;
  salesArray.forEach(async (_, index) => {
       const { productId, quantity } = salesArray[index];
       await connection.execute(querySaleProducts, [saleId, productId, quantity]);
  }); return { id: saleId, itemsSold: salesArray };
};

module.exports = {
  getAll,
  getById,
  postSale,
};
