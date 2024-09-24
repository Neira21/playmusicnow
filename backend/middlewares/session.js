import { handleHttpErrors } from "../utils/handleErrors.js"
import { verifyToken } from "../utils/handleJwt.js"
import { models } from "../models/index.js"
import { getProperties } from "../utils/handlePropertiesEngine.js"


const propertiesKey = getProperties();

export const authMiddleware = async (req, res, next) => {
  try {
    if(!req.headers.authorization) {
      handleHttpErrors(res, 'NOT_TOKEN', 401)
      return;
    }
    const token = req.headers.authorization.split(' ')[1]
    const decoded = await verifyToken(token)
    if(!decoded){
      handleHttpErrors(res, 'NOT_AUTHENTICATE', 401)
      return;
    }
    
    const query = {
      [propertiesKey.id]: decoded[propertiesKey.id],
    }

    const user = await models.usersModel.findOne(query);
    
    // Si no se encuentra el usuario
    if (!user) {
      handleHttpErrors(res, 'USER_NOT_FOUND', 404);
      return;  // Detener ejecución después de enviar la respuesta
    }
    
    user.password = undefined;
    req.user = user;
    next();
  } catch (error) {
    handleHttpErrors(res, 'USER_NOT_AUTHORIZED', 401)
  }
}