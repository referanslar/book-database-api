import redis from "redis";

import config from "../config/index.config.js";
import logger from "../helpers/logger.helper.js";

class Redis {
  constructor() {
    this.client = redis.createClient({
      host: config.cache.redis.host,
      port: config.cache.redis.port,
    });

    this.client.on("connect", () => {
      logger.info("Client has connected to Redis...");
    });

    this.client.on("ready", () => {
      logger.info("Client is now connected to Redis and ready to be used...");
    });

    this.client.on("error", (err) => {
      logger.error("An error occurred with Redis:", err.message);
    });

    this.client.on("end", () => {
      logger.warn("Client has been disconnected from Redis.");
    });

    process.on("SIGINT", () => {
      logger.warn("Client has been closed and disconnected from Redis due to SIGINT.");
      this.client.quit();
    });
  }

  getClient() {
    return this.client;
  }
}

export default new Redis().getClient();
