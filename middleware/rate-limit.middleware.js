import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  // Set the time window to 15 minutes. (15 * 60 * 1000 milliseconds.)
  windowMs: 15 * 60 * 1000,
  // Limit each IP to a maximum of 10 requests per time window.
  max: 10,
});
