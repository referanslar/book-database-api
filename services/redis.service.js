import createError from "http-errors";

import redis from "../cache/redis.cache.js";

import logger from "../helpers/logger.helper.js";

/**
 * Represents a service for interacting with Redis.
 * @class
 */
class RedisService {
  /**
   * Sets the specified key and value in Redis with an expiration time.
   * @param {string} key - The key to set in Redis.
   * @param {string} value - The value to set in Redis.
   * @param {number} expireTime - The expiration time in seconds.
   * @throws {Error} Throws an error if unable to set value in Redis.
   */
  async set(key, value, expireTime) {
    try {
      await redis.set(key, value);
      await redis.expire(key, expireTime);
    } catch (error) {
      logger.error("Error occurred while setting value in Redis:", error);
      throw createError.InternalServerError("Unable to set value in Redis.");
    }
  }

  /**
   * Retrieves the value associated with the specified key from Redis.
   * @param {string} key - The key to retrieve the value for.
   * @returns {Promise<any>} - A promise that resolves to the value associated with the key.
   * @throws {InternalServerError} - If an error occurs while getting the value from Redis.
   */
  async get(key) {
    try {
      return await redis.get(key);
    } catch (error) {
      logger.error("Error occurred while getting value from Redis:", error);
      throw createError.InternalServerError("Unable to get value from Redis.");
    }
  }

  /**
   * Deletes the specified key from Redis.
   * @param {string} key - The key to delete from Redis.
   * @throws {Error} Throws an error if unable to delete key from Redis.
   */
  async del(key) {
    try {
      await redis.del(key);
    } catch (error) {
      logger.error("Error occurred while deleting key from Redis:", error);
      throw createError.InternalServerError("Unable to delete key from Redis.");
    }
  }
}

export default new RedisService();
