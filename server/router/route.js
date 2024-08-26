import { Router } from 'express';
import * as loginController from '../controller/loginController.js';
import * as userController from '../controller/userController.js';
import {
  addUserValidationHandler,
  addUserValidators,
} from '../middleware/users/addUserValidator.js';
import avatarUpload from '../middleware/users/avatarUpload.js';
import Client from '../models/Clients.js';

const router = Router();

// Users Routes
router
  .route('/users')
  .get(async (req, res, next) => {
    try {
      const users = await Client.find();
      res.status(200).json({
        users: users,
      });
    } catch (err) {
      next(err);
    }
  })
  .post(
    avatarUpload,
    addUserValidators,
    addUserValidationHandler,
    userController.addUser,
  );

// login route
router.route('/login').post(loginController.login);
router.route('/logout').delete(loginController.logout);

export default router;
