import { check } from "express-validator"
import { validateResults } from '../utils/handleValidator.js';



export const validatorGetItem = [
  
  check('id').exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
] 