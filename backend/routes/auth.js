import express from 'express';
import { registerCtrl, loginCtrl } from '../controllers/auth.js';

import { models } from '../models/index.js';
import { validatorRegisterItem, validatorLoginItem } from '../validators/auth.js';



const authRouter = express.Router();

//TODO http://localhost:3000/api/auth/login
//TODO http://localhost:3000/api/auth/register


// validatorRegisterItem y validaorLoginItem son un middleware que se encarga de validar los datos de entrada

authRouter.post("/auth/register", validatorRegisterItem, registerCtrl)

authRouter.post("/auth/login", validatorLoginItem, loginCtrl)


export default authRouter;