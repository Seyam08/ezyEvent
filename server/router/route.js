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
import * as editUserValidator from '../middleware/users/edittUserValidators.js';

const router = Router();

// Users Routes - get all users // register user
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

// get user by username // edit user
router
  .route('/users/:username')
  .get(userController.getUserByUsername)
  .put(
    protectRoute.protectedRoute,
    avatarUpload,
    editUserValidator.editUserValidators,
    editUserValidator.editUserValidationHandler,
    userController.editUser,
  );

// login route
router
  .route('/login')
  .post(
    protectRoute.alreadyLoggedIn,
    loginValidation.loginValidators,
    loginValidation.loginValidatorsHandler,
    loginController.login,
  );
// user profile route
router
  .route('/profile')
  .get(protectRoute.protectedRoute, loginController.loggedInUserInfo);
// logout route
router
  .route('/logout')
  .delete(protectRoute.protectedRoute, loginController.logout);

// Event route - get all event // register event
router
  .route('/events')
  .get(protectRoute.protectedRoute, eventController.getAllEvent)
  .post(
    protectRoute.protectedRoute,
    addEventValidation.addEventValidators,
    addEventValidation.addEventValidationHandler,
    eventController.addEvent,
  );

//single event by id // edit event // delete event
router
  .route('/event/:id')
  .get(protectRoute.protectedRoute, eventController.getEvent)
  .put(
    protectRoute.protectedRoute,
    editEventValidator.editEventValidators,
    editEventValidator.editEventValidationHandler,
    eventController.editEvent,
  )
  .delete(protectRoute.protectedRoute, eventController.deleteEvent);
// attend event route
router
  .route('/event/attend/:id')
  .post(protectRoute.protectedRoute, eventController.attendEvent);
// remove the attendence
router
  .route('/event/removeattend/:id')
  .post(protectRoute.protectedRoute, eventController.removeAttend);

// edit speaker list as host
router
  .route('/event/editspeaker/:id')
  .patch(
    protectRoute.protectedRoute,
    editEventValidator.editSpeakerValidators,
    editEventValidator.editSpeakerValidationHandler,
    eventController.editSpeakerList,
  );
// edit attendence list as host
router
  .route('/event/editattendence/:id')
  .patch(
    protectRoute.protectedRoute,
    editEventValidator.editAttendenceValidators,
    editEventValidator.editAttendenceValidationHandler,
    eventController.editAttendenceList,
  );

export default router;
