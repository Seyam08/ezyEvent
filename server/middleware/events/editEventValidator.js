import { check, validationResult } from 'express-validator';
import createError from 'http-errors';
import Client from '../../models/Clients.js';

// edit event validators and handlers
export const editEventValidators = [
  // eventName validator
  check('eventName')
    .optional()
    .custom(async (value, { req }) => {
      if (req.body.hasOwnProperty('eventName')) {
        throw new createError(`You edit event name!`);
      }
    }),
  // eventDate validator
  check('eventDate')
    .optional()
    .isDate()
    .withMessage('Please provide a valid date. Example (2024-10-15)'),
  // attendanceLimit validator
  check('attendanceLimit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage(
      'Attendance limit is required and must be a number between 1-100',
    ),
  // status validator\
  check('status').optional().isString(),
  // hostName validator
  check('hostName')
    .optional()
    .custom(async (value, { req }) => {
      if (req.body.hasOwnProperty('hostName')) {
        throw new createError(`You edit host name!`);
      }
    }),
  // speakerName validator
  check('speakerName')
    .optional()
    .custom(async (value, { req }) => {
      if (req.body.hasOwnProperty('speakerName')) {
        throw new createError(`You can't edit speaker name from here!`);
      }
    }),
  // attendees validator
  check('attendees')
    .optional()
    .custom(async (value, { req }) => {
      if (req.body.hasOwnProperty('attendees')) {
        throw new createError(`You can't edit attendees from here!`);
      }
    }),
];
export function editEventValidationHandler(req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
}

// edit speaker of event validator and handlers
export const editSpeakerValidators = [
  // speakerName validator
  check('speakerNames')
    .isArray()
    .withMessage('Speaker name should be an array')
    .custom(async (value) => {
      let foundUsernames;
      try {
        // Find users from value
        const users = await Client.find({
          username: { $in: value },
        }).select({
          username: 1,
        });

        // Creating an array of existing username
        foundUsernames = users.map((user) => user.username);
      } catch (error) {
        throw createError(error.message);
      }
      // compare with array that gotted from value
      const missingUsernames = value.filter(
        (username) => !foundUsernames.includes(username),
      );

      if (missingUsernames.length > 0) {
        throw createError(
          `${missingUsernames.join(', ')} is not registered, it can't be added as Speaker`,
        );
      }
    }),
];
export function editSpeakerValidationHandler(req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
}

// edit attendence of event validator and handlers
export const editAttendenceValidators = [
  // speakerName validator
  check('attendeesNames')
    .isArray()
    .withMessage('attendeesNames name should be an array')
    .custom(async (value) => {
      let foundUsernames;
      try {
        // Find users from value
        const users = await Client.find({
          username: { $in: value },
        }).select({
          username: 1,
        });

        // Creating an array of existing username
        foundUsernames = users.map((user) => user.username);
      } catch (error) {
        throw createError(error.message);
      }
      // compare with array that gotted from value
      const missingUsernames = value.filter(
        (username) => !foundUsernames.includes(username),
      );

      if (missingUsernames.length > 0) {
        throw createError(
          `${missingUsernames.join(', ')} is not registered, it can't be added as Attendence`,
        );
      }
    }),
];
export function editAttendenceValidationHandler(req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
}
