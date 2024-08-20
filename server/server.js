// external import
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

// internal imports
import {
  defaultError,
  notFoundHandler,
} from './middleware/common/errorHandler.js';
import router from './router/route.js';

const app = express();
dotenv.config();
const port = process.env.SERVER_PORT;

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log('database connection sucessful');
  })
  .catch((err) => {
    console.log(err);
  });

// request parser
app.use(express.json());

// home get req
app.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello, world!' });
});
// router
app.use('/api', router);
// notFoundHandler
app.use(notFoundHandler);
// defaultError handler
app.use(defaultError);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
