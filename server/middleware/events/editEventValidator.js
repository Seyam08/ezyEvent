import { check, validationResult } from 'express-validator';

export const editEventValidators = [
  // eventName validator
  check('eventName')
    .optional()
    .custom(async (value, { req }) => {
      if (req.body.hasOwnProperty('eventName')) {
        throw new Error(`You edit event name!`);
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
        throw new Error(`You edit host name!`);
      }
    }),
  // speakerName validator
  check('speakerName')
    .optional()
    .custom(async (value, { req }) => {
      if (req.body.hasOwnProperty('speakerName')) {
        throw new Error(`You can't edit speaker name from here!`);
      }
    }),
  // attendees validator
  check('attendees')
    .optional()
    .custom(async (value, { req }) => {
      if (req.body.hasOwnProperty('attendees')) {
        throw new Error(`You can't edit attendees from here!`);
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
