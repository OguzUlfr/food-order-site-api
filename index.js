const express = require('express');
const dotenv = require('dotenv');
const loggerMiddleware = require('./src/middlewares/logger.js');
const db = require('./src/config/database.js');
const errorhandler = require('./src/middlewares/error.js');
const notFoundHandler = require('./src/middlewares/notFoundHandler.js');

dotenv.config();

const app = express();
app.use(express.json());

app.use(loggerMiddleware);

app.use('/user', require('./src/routes/UserRouter.js'));
app.use('/restaurant', require('./src/routes/RestaurantRouter.js'));
app.use('/address', require('./src/routes/AddressRouter.js'));
app.use('/campaign', require('./src/routes/CampaignRouter.js'));
app.use('/category', require('./src/routes/CategoryRouter.js'));
app.use('/comment', require('./src/routes/CommentRouter.js'));
app.use('/coupon', require('./src/routes/CouponRouter.js'));
app.use('/favorite', require('./src/routes/FavoriteRouter.js'));
app.use('/menu', require('./src/routes/MenuRouter.js'));
app.use('/order', require('./src/routes/OrderRouter.js'));
app.use('/payment', require('./src/routes/PaymentRouter.js'));
app.use('/auth', require('./src/routes/AuthRouter.js'));

app.use(notFoundHandler);
app.use(errorhandler);

const PORT = process.env.SERVER_PORT || 3000

app.listen(PORT, () => {
  db.authenticate().then(() => console.log('Successfully connected to the database')).catch((error) => console.log(error));
  console.log(`Server is running PORT: ${PORT}`);
});