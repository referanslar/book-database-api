import logger from "../helpers/logger.helper.js";

const roleCheck = (req, res, next) => {
  logger.debug(`Role Check Middleware: User ID is ${req.payload.aud}`);
  logger.debug(`Role Check Middleware: Coming from ${req.originalUrl}`);

  next();
};

export default roleCheck;
