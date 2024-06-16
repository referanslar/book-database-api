import createError from "http-errors";

import tokenService from "../services/token.service.js";

const authCheck = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) throw createError.Unauthorized("Please log in.");

    const bearerToken = authHeader.split(" ");
    req.payload = await tokenService.verifyAccessToken(bearerToken[1]);

    next();
  } catch (error) {
    next(error);
  }
};

export default authCheck;
