import express from "express";

import authController from "../controllers/auth.controller.js";
import authValidator from "../validators/auth.validator.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Sign up
 *     description: Create a new user account.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               name: "Name"
 *               surname: "Surname"
 *               email: "namesurname@domain.com"
 *               password: "123456"
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/signup", authValidator.signup, authController.signup);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Sign in
 *     description: Sign in with an existing user account.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "namesurname@domain.com"
 *               password: "123456"
 *     responses:
 *       200:
 *         description: OK
 */
router.post("/signin", authValidator.signin, authController.signin);

/**
 * @swagger
 * /api/auth/refresh:
 *   put:
 *     summary: Refresh tokens
 *     description: Refresh the access token using the refresh token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: ""
 *     responses:
 *       200:
 *         description: OK
 */
router.put("/refresh", authValidator.refresh, authController.refresh);

/**
 * @swagger
 * /api/auth/signout:
 *   delete:
 *     summary: Sign out
 *     description: Sign out the currently authenticated user.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: ""
 *     responses:
 *       200:
 *         description: OK
 */
router.delete("/signout", authValidator.signout, authController.signout);

export default router;
