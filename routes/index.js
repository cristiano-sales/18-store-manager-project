const routes = require('express').Router();
const ProductsRouter = require('./Products');
const SalesRouter = require('./Sales');

routes.use('/products', ProductsRouter);
routes.use('/sales', SalesRouter);

module.exports = routes;
