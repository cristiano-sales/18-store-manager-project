const Products = require('../models/Products');

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

const updateQuantity = async (quantity, id) => {
  const { quantity: productQuantity } = await Products.getById(id);
  let newQuantity;
  if (productQuantity > quantity) newQuantity = productQuantity - quantity;
  if (productQuantity === quantity) newQuantity = 0;
  await Products.updateQuantity(newQuantity, id);
};

const updateQuantityDelete = async (quantity, id) => {
  const { quantity: productQuantity } = await Products.getById(id);
  const newQuantity = productQuantity + quantity;
  await Products.updateQuantity(newQuantity, id);
};

module.exports = {
  sequelize,
  sequelizeById,
  updateQuantity,
  updateQuantityDelete,
};
