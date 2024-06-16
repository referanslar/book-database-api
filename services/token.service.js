import createError from "http-errors";
import jsonwebtoken from "jsonwebtoken";

import redisService from "./redis.service.js";

import config from "../config/index.config.js";
import logger from "../helpers/logger.helper.js";

/**
 * Represents a service for managing tokens.
 * @class TokenService
 */
class TokenService {
  /**
   * Creates an access token for the specified user ID.
   * @param {string} userID - The ID of the user.
   * @returns {string} - The generated access token.
   * @throws {Error} - Throws an error if unable to create the access token.
   */
  async createAccessToken(userID) {
    try {
      const secret = config.token.access.secret;
      const options = {
        expiresIn: config.token.access.options.expiresIn,
        issuer: "referanslar.github.io",
        audience: String(userID),
      };

      return jsonwebtoken.sign({}, secret, options);
    } catch (error) {
      logger.error(error);
      throw createError.InternalServerError("Unable to create access token.");
    }
  }

  /**
   * Creates a refresh token for the specified user ID.
   * @param {string} userID - The ID of the user.
   * @returns {Promise<string>} The generated refresh token.
   * @throws {createError.InternalServerError} If unable to create the refresh token.
   */
  async createRefreshToken(userID) {
    try {
      const secret = config.token.refresh.secret;
      const options = {
        expiresIn: config.token.refresh.options.expiresIn,
        issuer: "referanslar.github.io",
        audience: String(userID),
      };

      const refreshToken = jsonwebtoken.sign({}, secret, options);
      await redisService.set(String(userID), refreshToken, 86400);

      return refreshToken;
    } catch (error) {
      logger.error(error);
      throw createError.InternalServerError("Unable to create refresh token.");
    }
  }

  /**
   * Verifies the access token.
   * @param {string} accessToken - The access token to be verified.
   * @returns {object} - The decoded access token.
   * @throws {Error} - Throws an error if the access token is invalid or expired.
   */
  async verifyAccessToken(accessToken) {
    try {
      return jsonwebtoken.verify(accessToken, config.token.access.secret);
    } catch (error) {
      throw createError.Unauthorized("Please sign in again.");
    }
  }

  /**
   * Verifies the refresh token and returns the user ID.
   * @param {string} refreshToken - The refresh token to be verified.
   * @returns {string} - The user ID extracted from the refresh token.
   * @throws {Error} - Throws an error if the refresh token is invalid or expired.
   */
  async verifyRefreshToken(refreshToken) {
    const secret = config.token.refresh.secret;
    const payload = jsonwebtoken.verify(refreshToken, secret);
    const userID = payload.aud;

    const storedRefreshToken = await redisService.get(userID);

    if (refreshToken !== storedRefreshToken) {
      throw createError.Unauthorized("Please sign in again.");
    }

    return userID;
  }

  /**
   * Deletes the refresh token associated with the specified user ID.
   * @param {string} userID - The ID of the user.
   * @throws {Error} - Throws an error if unable to delete the refresh token.
   */
  async deleteRefreshToken(userID) {
    try {
      await redisService.del(userID);
    } catch (error) {
      logger.error(error);
      throw createError.InternalServerError("Unable to delete refresh token.");
    }
  }
}

export default new TokenService();
