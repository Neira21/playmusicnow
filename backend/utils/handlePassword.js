import bcryptjs from 'bcryptjs';

/**
 * Contraseña sin encriptar
 * @param {*} passwordPlain
 * @returns 
 */

export const encryptPassword = async (passwordPlain) => {
  const hash = await bcryptjs.hash(passwordPlain, 10);
  return hash;
}

/**
 * Pasar la contraseña encriptada con el sin encriptar y realizar la comparación
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */

export const compare = async (passwordPlain, hashPassword) => {
  return await bcryptjs.compare(passwordPlain, hashPassword);
}