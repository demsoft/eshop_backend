const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handling');

//app.use(cors);
//app.options('*', cors());

//Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

//Routes
const productsRouter = require('./routes/products');
const categoriesRoutes = require('./routes/categories');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

const api = process.env.API_URL;

app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);


mongoose.set('strictQuery', true);
mongoose.connect(process.env.CONNECTION_STRING, 
    {
        useNewUrlParser : true,
        useUnifiedTopology: true
    })
.then(() => {
    console.log('Database connection is ready...');
})
.catch((err) => {
    console.log(err);
})

app.listen(3000, ()=> {
    console.log('server is running now on http://localhost:3000');
})
