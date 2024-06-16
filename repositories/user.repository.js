import createError from "http-errors";

import logger from "../helpers/logger.helper.js";
import postgres from "../database/postgres.database.js";

class UserRepository {
  async createUser(user) {
    try {
      return await postgres.prisma.user.create({ data: user });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Unable to create the user at the moment.");
    }
  }

  async getUserByID(userID) {
    try {
      return await postgres.prisma.user.findUnique({
        where: { id: String(userID) },
      });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Unable to get the userID at the moment.");
    }
  }

  async getUserByEmail(email) {
    try {
      return await postgres.prisma.user.findUnique({
        where: { email: email },
      });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Unable to get the email at the moment.");
    }
  }
}

export default new UserRepository();
