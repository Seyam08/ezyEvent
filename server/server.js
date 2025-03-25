// external import
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// internal imports
import cookieParser from 'cookie-parser';
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
    // debug
  });

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookieParser
app.use(cookieParser(process.env.COOKIE_SECRET));

// enabling cors
app.use(
  cors({
    origin: '*', // Use environment variable for browser
    credentials: true, // Allow cookies
  }),
);

// home get req
app.route('/').get((req, res) => {
  res
    .status(200)
    .json({ message: `Hello!, It's ezyEvent. The event management website.` });
});
// Serve the 'avatars' folder directly from the root URL
const dirName = dirname(fileURLToPath(import.meta.url));
app.use('/avatars', express.static(`${dirName}/public/uploads/avatars/`));
// router
app.use('/api', router);
// notFoundHandler
app.use(notFoundHandler);
// defaultError handler
app.use(defaultError);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
