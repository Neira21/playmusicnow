import { check } from 'express-validator';
import { validateResults } from '../utils/handleValidator.js';

export const validatorRegisterItem = [
  
  check('name')
  .exists().withMessage('Name is required')
  .notEmpty().withMessage('Name cannot be empty')
  .isLength({ min: 3, max: 90 }).withMessage('Name must be between 3 and 90 characters'),
  check('age').exists().notEmpty().isNumeric(),
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().notEmpty().isLength({ min: 8, max: 15 }),

  (req, res, next) => {
    return validateResults(req, res, next);
  }
]

export const validatorLoginItem = [
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().notEmpty().isLength({ min: 8, max: 15 }),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
]