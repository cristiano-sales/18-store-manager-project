const routes = require('express').Router();
const Controller = require('../controllers/Products');
const middlewares = require('../middlewares');

routes.get('/', Controller.getAll);
routes.get('/:id', Controller.getById);
routes.post('/', middlewares.productNameQuantity, Controller.post);
routes.put('/:id', middlewares.productNameQuantity, Controller.put);
routes.delete('/:id', Controller.deleteP);

module.exports = routes;
