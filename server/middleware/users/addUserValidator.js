import { check, validationResult } from 'express-validator';
import { unlink } from 'fs';
import createError from 'http-errors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import Client from '../../models/Clients.js';

export const addUserValidators = [
  check('username')
    .isLength({ min: 1 })
    .withMessage('Username is required')
    .trim(),
  check('name')
    .isLength({ min: 1 })
    .withMessage('Name is required')
    .isAlpha('en-US', { ignore: ' -' })
    .withMessage('Name must not contain anything other than alphabet')
    .trim(),
  check('email')
    .isEmail()
    .withMessage('Invalid email address')
    .trim()
    .custom(async (value) => {
      try {
        const user = await Client.findOne({ email: value });
        if (user) {
          throw createError('Email already is use!');
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check('password')
    .isStrongPassword()
    .withMessage(
      'Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol',
    ),
];

export function addUserValidationHandler(req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove uploaded files
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      const dirName = dirname(fileURLToPath(import.meta.url));

      unlink(`${dirName}/../../public/uploads/avatars/${filename}`, (err) => {
        if (err) console.log(err);
      });
    }

    // response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
}
