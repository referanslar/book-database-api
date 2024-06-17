import createError from "http-errors";
import logger from "../helpers/logger.helper.js";

import usersService from "../services/users.service.js";

const adminCheck = async (req, res, next) => {
  try {
    const userID = req.payload.aud;
    const user = await usersService.getUserByID(userID);

    if (user.role !== "admin") {
      return next(createError.Unauthorized("You are not authorized to perform this action."));
    }

    next();
  } catch (error) {
    return next(
      createError.InternalServerError("An error occurred while verifying your authorization.")
    );
  }
};

export default adminCheck;
