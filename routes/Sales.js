const routes = require('express').Router();
const Controller = require('../controllers/Sales');
const middlewares = require('../middlewares');

routes.get('/', Controller.getAll);
routes.get('/:id', Controller.getById);
routes.post('/', middlewares.sales, Controller.post);
routes.put('/:id', middlewares.sales, Controller.put);
routes.delete('/:id', Controller.deleteS);

module.exports = routes;
