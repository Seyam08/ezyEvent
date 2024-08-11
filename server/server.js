// external import
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

// internal imports
import { defaultError, notFoundHandler } from './middleware/errorHandler.js';

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

// notFoundHandler
app.use(notFoundHandler);
// defaultError handler
app.use(defaultError);

// home get req
app.get('/', (req, res) => {
  res.status(201).json({ message: 'Hello, world!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
