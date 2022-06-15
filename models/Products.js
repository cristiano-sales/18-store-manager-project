const connection = require('./connection');

const getAll = () => {
  const result = connection
    .execute(
      `
        SELECT * FROM StoreManager.products;
      `,
    );

  return result;
};

const getById = async (id) => {
  const result = `
    SELECT * FROM StoreManager.products WHERE id = ?;
  `;
  const [[product]] = await connection.execute(result, [id]);
  if (!product) return null;

  return product;
};

const postProduct = async (name, quantity) => {
  const result = `
  INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);
  `;
  await connection.execute(result, [name, quantity]);
  const get = `
  SELECT * FROM StoreManager.products WHERE name = ?;
  `;
  const [[product]] = await connection.execute(get, [name]);
  return product;
};

const putProduct = async (name, quantity, id) => {
  const result = `
  UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?;
  `;
  await connection.execute(result, [name, quantity, id]);
};

const updateQuantity = async (newQuantity, id) => {
  const result = `
  UPDATE StoreManager.products SET quantity = ? WHERE id = ?;
  `;
  await connection.execute(result, [newQuantity, id]);
};

const deleteProduct = async (id) => {
  const deleteQuery = `
  DELETE FROM StoreManager.products WHERE id = ?;
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
