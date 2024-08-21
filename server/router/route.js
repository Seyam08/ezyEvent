import { Router } from 'express';
import * as userController from '../controller/userController.js';
import {
  addUserValidationHandler,
  addUserValidators,
} from '../middleware/users/addUserValidator.js';
import avatarUpload from '../middleware/users/avatarUpload.js';

const router = Router();

// Users Routes
router
  .route('/users')
  .get((req, res) => {
    res.status(200).json('user get');
  })
  .post(
    avatarUpload,
    addUserValidators,
    addUserValidationHandler,
    userController.addUser,
    (req, res) => {
      const result = req.body;
      res.status(201).json(result);
    },
  );

export default router;
