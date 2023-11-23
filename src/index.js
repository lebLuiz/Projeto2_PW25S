require('dotenv').config();
const express = require('express');
const swaggerUI = require('swagger-ui-express');

const cors = require('./app/middlewares/cors');
const routes = require('./routes');
const errorHandler = require('./app/middlewares/errorHandler');
const { sequelize } = require('./app/models');
const swaggerDocument = require('./docs/swagger.json');

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

sequelize.sync()
  .then(() => {
    app.listen(3000, () => console.log('✅ Server started at http://localhost:3000'));
  })
  .catch((err) => {
    console.log('ERROR: ', err);
  });
