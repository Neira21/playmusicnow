import { models } from '../models/index.js';
import { matchedData } from 'express-validator';
import { encryptPassword, compare } from '../utils/handlePassword.js'
import { tokenSign } from '../utils/handleJwt.js';
import { handleHttpErrors } from '../utils/handleErrors.js'

/**
 * Para registrar un usuario, y se logea automáticamente
 * @param {*} req 
 * @param {*} res 
 */

export const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const newPassword = await encryptPassword(req.password)
    const body = {...req, password: newPassword }
    const dataUser = await models.usersModel.create(body);
    const data = {
      token: await tokenSign(dataUser),
      user: dataUser
    }
    res.send({data})
  } catch (error) {
    console.log(error)
    handleHttpErrors(res, 'ERROR_REGISTER_USER')
  }
}

/**
 * Para realizar un login de un usuario ya registrado
 * @param {*} req 
 * @param {*} res 
 */
export const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await models.usersModel.findOne({email: req.email});
    if(!user) {
      handleHttpErrors(res, 'USER_NOT_FOUND', 404)
      return;
    }
    const hashPassword = user.get('password');
    const check = await compare(req.password, hashPassword);
    if(!check) {
      handleHttpErrors(res, 'PASSWORD_INCORRECT', 401)
      return;
    }
    const data = {
      token: await tokenSign(user),
      user
    }
    res.send({data})
  } catch (error) {
    handleHttpErrors(res, 'ERROR_REGISTER_USER')
  }
}
