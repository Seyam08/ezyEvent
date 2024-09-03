import { check, validationResult } from 'express-validator';
import createError from 'http-errors';
import Client from '../../models/Clients.js';
import Event from '../../models/Events.js';

export const addEventValidators = [
  // eventName validator
  check('eventName')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Event name is required and Maximum 100 character.')
    .custom(async (value) => {
      try {
        const eventName = await Event.findOne({ eventName: value });
        if (eventName) {
          throw createError('eventName already in use');
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),
  // eventDate validator
  check('eventDate')
    .isDate()
    .withMessage('Please provide a valid date. Example (2024-10-15)'),
  // attendanceLimit validator
  check('attendanceLimit')
    .isInt({ min: 1, max: 100 })
    .withMessage(
      'Attendance limit is required and must be a number between 1-100',
    ),
  // hostName validator
  check('hostName')
    .optional()
    .isArray()
    .withMessage('Hostname should be an array')
    .custom(async (value) => {
      let foundUsernames;
      try {
        // Find users by value
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
          `${missingUsernames.join(', ')} is not registered, it can't be added as Host`,
        );
      }
    }),
  // speakerName validator
  check('speakerName')
    .optional()
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
  // attendees validator
  check('attendees')
    .optional()
    .custom(async (value, { req }) => {
      if (req.body.hasOwnProperty('attendees')) {
        throw new Error(`You can't add attendees!`);
      }
    }),
];

export function addEventValidationHandler(req, res, next) {
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
