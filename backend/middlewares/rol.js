import { verifyToken } from "../utils/handleJwt.js";
import { handleHttpErrors } from "../utils/handleErrors.js";
import { models } from "../models/index.js";

export const checkRoleAuth = (roles) => async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpErrors(res, "NOT_ALLOW", 409);
      return;
    }
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);
    const userData = await models.usersModel.findById(tokenData._id);

    if ([].concat(roles).includes(userData.role)) {
      next();
    } else {
      handleHttpErrors(res, "NOT_ROL", 409);
    }
  } catch (e) {
    handleHttpErrors(res, e);
  }
};