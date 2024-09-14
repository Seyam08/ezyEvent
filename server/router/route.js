import { Router } from 'express';
import * as eventController from '../controller/eventController.js';
import * as loginController from '../controller/loginController.js';
import * as userController from '../controller/userController.js';
import * as loginValidation from '../middleware/authentication/loginValidation.js';
import * as protectRoute from '../middleware/authentication/protectRoute.js';
import * as addEventValidation from '../middleware/events/addEventValidators.js';
import * as editEventValidator from '../middleware/events/editEventValidator.js';
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
  .route('/profile')
  .get(protectRoute.protectedRoute, loginController.loggedInUserInfo);
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

//single event by id
router
  .route('/event/:id')
  .get(protectRoute.protectedRoute, eventController.getEvent);
// attend event route
router
  .route('/events/attend/:id')
  .post(protectRoute.protectedRoute, eventController.attendEvent);
// remove the attendence
router
  .route('/events/removeattend/:id')
  .post(protectRoute.protectedRoute, eventController.removeAttend);
//edit event
router
  .route('/events/editEvent/:id')
  .put(
    protectRoute.protectedRoute,
    editEventValidator.editEventValidators,
    editEventValidator.editEventValidationHandler,
    eventController.editEvent,
  );

export default router;
