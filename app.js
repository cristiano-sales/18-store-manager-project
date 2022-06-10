const express = require('express');
const routes = require('./routes');
const { errorHandler } = require('./middlewares');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar

app.use('/products', routes.ProductsController);
app.use('/sales', routes.SalesController);

app.get('/', (_request, response) => {
  response.send();
});

app.use(routes);
app.use(errorHandler);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
