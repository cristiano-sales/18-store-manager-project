const app = require('./app');
require('dotenv').config();
const routes = require('./routes');

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.use('/products', routes.ProductsController);
app.use('/sales', routes.SalesController);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
