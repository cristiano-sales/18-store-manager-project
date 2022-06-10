const Sales = require('../models/Sales');
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
  if (productQuantity < quantity) throw Error({ message: 'Insufficient products' });
  if (productQuantity === quantity) newQuantity = 0;
  await Products.updateQuantity(newQuantity, id);
};

const updateQuantityDelete = async (quantity, id) => {
  const { quantity: productQuantity } = await Products.getById(id);
  const newQuantity = productQuantity + quantity;
  console.log(newQuantity);
  await Products.updateQuantity(newQuantity, id);
};

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
  const id = await Sales.postSale();

  const insertProductsPromisses = [];
  salesArray.forEach(async (_, index) => {
    const { productId, quantity } = salesArray[index];
    await updateQuantity(quantity, productId);
    insertProductsPromisses.push(Sales.addSalesProducts(id, productId, quantity));
});
  Promise.all(insertProductsPromisses);
  return { id, itemsSold: salesArray };
};

const putSale = async (salesArray, id) => {
  try {
    await Sales.putSale(salesArray, id);
  } catch (error) {
    throw new Error({ message: error });
  }
  const saleId = id;
  const responseBody = { saleId, itemUpdated: salesArray };
  return responseBody;
};

const deleteSale = async (id) => {
  const sale = await Sales.getById(id);
  if (sale.length < 1) return null;

  sale.forEach(async (_, index) => {
    const { product_id, quantity } = sale[index];
    await updateQuantityDelete(quantity, product_id);
}); 

  await Sales.deleteSale(id);
  return true;
};

module.exports = {
  getAllSales,
  getSaleById,
  postSale,
  putSale,
  deleteSale,
};
