const connection = require('./connection');

const getAll = () => {
  const query = `
  SELECT * 
  FROM products;
  `;
  return connection.execute(query);
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

const postProduct = async (name, quantity) => {
  const query = `
  INSERT INTO products (name, quantity) VALUE
    (?, ?);
  `;
  await connection.execute(query, [name, quantity]);
  const get = `
  SELECT *
  FROM products
  WHERE name = ?;
  `;
  const [[product]] = await connection.execute(get, [name]);
  console.log(product);
  return product;
};

const putProduct = async (name, quantity, id) => {
  const query = `
  UPDATE products
  SET name = ?, quantity = ?
  WHERE id = ?;
  `;
  await connection.execute(query, [name, quantity, id]);
};

const updateQuantity = async (newQuantity, id) => {
  const query = `
  UPDATE products
  SET quantity = ?
  WHERE id = ?;
  `;
  await connection.execute(query, [newQuantity, id]);
};

const deleteProduct = async (id) => {
  const deleteQuery = `
  DELETE FROM products WHERE id = ?;
  `;
  const deleted = await connection.execute(deleteQuery, [id]);
  return deleted[0];
};

module.exports = {
  getAll,
  getById,
  postProduct,
  putProduct,
  deleteProduct,
  updateQuantity,
};

/*
Arquivos onde iremos executar as operações do banco de dados, como criar conexões e executar queries
*/