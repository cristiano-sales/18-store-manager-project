const connection = require('./connection');

const getAll = async () => {
  const query = `
  SELECT * 
  FROM products;
  `;
  const [response] = await connection.execute(query);
  return response;
};

const getById = async (id) => {
  const query = `
  SELECT *
  FROM products
  WHERE id = ?;
  `;
  const [[product]] = await connection.execute(query, [id]);
  if (!product) return null;

  return product;
};

module.exports = {
  getAll,
  getById,
};
