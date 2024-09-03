import { Router } from 'express';
import * as eventController from '../controller/eventController.js';
import * as loginController from '../controller/loginController.js';
import * as userController from '../controller/userController.js';
import * as loginValidation from '../middleware/authentication/loginValidation.js';
import * as protectRoute from '../middleware/authentication/protectRoute.js';
import * as addEventValidation from '../middleware/events/addEventValidators.js';
import * as addUserValidator from '../middleware/users/addUserValidators.js';
import avatarUpload from '../middleware/users/avatarUpload.js';

const router = Router();

// Users Routes
router
  .route('/users')
  .get(userController.geAlltUser)
  .post(
    protectRoute.alreadyLoggedIn,
    avatarUpload,
    addUserValidator.addUserValidators,
    addUserValidator.addUserValidationHandler,
    userController.addUser,
  );

// get user by username
router.route('/users/:username').get(userController.getUserByUsername);

// login route
router
  .route('/login')
  .post(
    protectRoute.alreadyLoggedIn,
    loginValidation.loginValidators,
    loginValidation.loginValidatorsHandler,
    loginController.login,
  );
router
  .route('/logout')
  .delete(protectRoute.protectedRoute, loginController.logout);

// Event route
router
  .route('/events')
  .get(protectRoute.protectedRoute, eventController.getAllEvent)
  .post(
    protectRoute.protectedRoute,
    addEventValidation.addEventValidators,
    addEventValidation.addEventValidationHandler,
    eventController.addEvent,
  );

export default router;
