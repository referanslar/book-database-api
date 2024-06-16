import { PrismaClient } from "@prisma/client";

import logger from "../helpers/logger.helper.js";

class Postgres {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async connect() {
    try {
      await this.prisma.$connect();
      logger.info("PostgreSQL connection successful.");
    } catch (err) {
      logger.error("PostgreSQL connection error:", err);
    }
  }

  async disconnect() {
    try {
      await this.prisma.$disconnect();
      logger.info("PostgreSQL disconnection successful.");
    } catch (err) {
      logger.error("PostgreSQL disconnection error:", err);
    }
  }
}

export default new Postgres();
