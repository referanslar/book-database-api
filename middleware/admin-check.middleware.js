import logger from "../helpers/logger.helper.js";

export const adminCheck = (req, res, next) => {
  logger.debug(`Admin Check Middleware: ${req.payload.aud}`);
  logger.debug(`Admin Check Middleware: ${req.originalUrl}`);

  next();
};
