const Sales = require('../models/Sales');
const Products = require('../models/Products');

const {
  sequelize, sequelizeById, updateQuantity, updateQuantityDelete,
} = require('./utilsService');

const getAllSales = async () => {
  const response = await Sales.getAll();
  return sequelize(response);
};

const getSaleById = async (id) => {
  const response = await Sales.getById(id);
  if (!response) return null;
  return sequelizeById(response);
};

const quantityError = async (salesArray) => {
  const checkQuantity = salesArray.map(async ({ quantity, productId }) => {
    const product = await Products.getById(productId);
    return product.quantity > quantity;
});
  let error = false;
  await Promise.all(checkQuantity).then((value) => {
    if (value.includes(false)) error = true;
}); 
  return error;
};

const postSale = async (salesArray) => {
  const error = await quantityError(salesArray);
  if (error) return { error };
  const id = await Sales.postSale();
  const insertProductsPromises = [];

  salesArray.forEach(async ({ productId, quantity }) => {
    await updateQuantity(quantity, productId);
    insertProductsPromises.push(Sales.addSalesProducts(id, productId, quantity));      
  });

  Promise.all(insertProductsPromises);
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
