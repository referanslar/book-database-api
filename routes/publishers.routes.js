import express from "express";

import publishersController from "../controllers/publishers.controller.js";
import publishersValidator from "../validators/publishers.validator.js";

import authCheck from "../middleware/auth-check.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/publishers:
 *   post:
 *     summary: Create Publisher
 *     description: Only admins can create publishers.
 *     tags: [Publishers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *             example:
 *               name: Penguin Books
 *               country: United Kingdom
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
  "/",
  authCheck,
  publishersValidator.createPublisher,
  publishersController.createPublisher
);

/**
 * @swagger
 * /api/publishers/{publisherID}:
 *   get:
 *     summary: Get Publisher by ID
 *     tags: [Publishers]
 *     parameters:
 *       - in: path
 *         name: publisherID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get(
  "/:publisherID",
  publishersValidator.getPublisherByID,
  publishersController.getPublisherByID
);

export default router;