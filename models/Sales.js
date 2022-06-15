const connection = require('./connection');

const getAll = async () => {
  const result = `
    SELECT
      salesproducts.sale_id,
      salesproducts.product_id,
      salesproducts.quantity,
      sales.date
    FROM StoreManager.sales as sales
    INNER JOIN StoreManager.sales_products as salesproducts
    ON sales.id = salesproducts.sale_id;
  `;
  const [response] = await connection.execute(result);
  return response;
};

const getById = async (id) => {
  const result = `
    SELECT
      salesproducts.sale_id,
      salesproducts.product_id,
      salesproducts.quantity,
      sales.date
  FROM StoreManager.sales as sales
  INNER JOIN StoreManager.sales_products as salesproducts
  ON sales.id = salesproducts.sale_id
  WHERE salesproducts.sale_id = ?;
  `;
  const [sale] = await connection.execute(result, [id]);
  if (!sale) return null;
  return sale;
};

const postSale = async () => {
  const querySale = `
    INSERT INTO StoreManager.sales(date) VALUE (NOW());
  `;
  const response = await connection.execute(querySale);
  return response[0].insertId;
};

const addSalesProducts = (saleId, productId, quantity) => {
  const querySaleProducts = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);
  `;
  connection.execute(querySaleProducts, [saleId, productId, quantity]);
};

const putSale = async (salesArray, id) => {
  const saleId = Number(id);
  const { quantity, productId } = salesArray[0];
  const result = `
    UPDATE StoreManager.sales_products SET quantity = ?
    WHERE product_id = ? AND sale_id = ${saleId};
  `;
  await connection.execute(result, [quantity, productId]);
};

const deleteSale = async (id) => {
  const deleteQuery = `
    DELETE FROM StoreManager.sales WHERE id = ?;
  `;
  await connection.execute(deleteQuery, [id]);
};

module.exports = {
  getAll,
  getById,
  postSale,
  putSale,
  addSalesProducts,
  deleteSale,
};

/*
Arquivos onde iremos executar as operações do banco de dados, como criar conexões e executar queries
*/