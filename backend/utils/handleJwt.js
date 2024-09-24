import jsonwebtoken from 'jsonwebtoken';
import { getProperties } from './handlePropertiesEngine.js';

const JWT_SECRET = process.env.JWT_SECRET;
const propertiesKey = getProperties();

/**
 * Debes de pasar el objeto del usuario
 * @param {*} user 
 */
export const tokenSign = async (user) => {
  const sign = await jsonwebtoken.sign(
    {
      [propertiesKey.id]: user[propertiesKey.id],
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: '1h',
    }
  )
  return sign;
}

/**
 * 
 * @param {*} tokenJwt 
 * @returns 
 */
export const verifyToken = async (tokenJwt) => {
  try {
    const decoded = await jsonwebtoken.verify(tokenJwt, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}