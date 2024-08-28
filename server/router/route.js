import { Router } from 'express';
import * as loginController from '../controller/loginController.js';
import * as userController from '../controller/userController.js';
import * as loginValidation from '../middleware/authentication/loginValidation.js';
import * as protectRoute from '../middleware/authentication/protectRoute.js';
import * as addUserValidator from '../middleware/users/addUserValidator.js';
import avatarUpload from '../middleware/users/avatarUpload.js';

const router = Router();

// Users Routes
router
  .route('/users')
  .get(userController.getUser)
  .post(
    avatarUpload,
    addUserValidator.addUserValidators,
    addUserValidator.addUserValidationHandler,
    userController.addUser,
  );

// login route
router
  .route('/login')
  .post(
    protectRoute.checkLoggedIn,
    loginValidation.loginValidators,
    loginValidation.loginValidatorsHandler,
    loginController.login,
  );
router
  .route('/logout')
  .delete(protectRoute.protectedRoute, loginController.logout);

export default router;
