import express from "express";

import authorsController from "../controllers/authors.controller.js";
import authorsValidator from "../validators/authors.validator.js";

import authCheck from "../middleware/auth-check.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Create Author
 *     description: Only admin can create author.
 *     tags: [Authors]
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
 *               name: J.R.R. Tolkien
 *               country: United Kingdom
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", authCheck, authorsValidator.createAuthor, authorsController.createAuthor);

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Get Authors
 *     description: Only admin can get all authors.
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: currentPage
 *         schema:
 *           type: int
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: int
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", authCheck, authorsValidator.getAuthors, authorsController.getAuthors);

/**
 * @swagger
 * /api/authors/{authorID}:
 *   get:
 *     summary: Get Author by ID
 *     description: Only admin can get author by ID.
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: authorID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get(
  "/:authorID",
  authCheck,
  authorsValidator.getAuthorByID,
  authorsController.getAuthorByID
);

/**
 * @swagger
 * /api/authors/{authorID}:
 *   put:
 *     summary: Update Author
 *     description: Only admin can update author.
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: authorID
 *         required: true
 *         schema:
 *           type: string
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
 *               name: J.R.R. Tolkien
 *               country: United Kingdom
 *     responses:
 *       200:
 *         description: OK
 */
router.put("/:authorID", authCheck, authorsValidator.updateAuthor, authorsController.updateAuthor);

/**
 * @swagger
 * /api/authors/{authorID}:
 *   delete:
 *     summary: Delete Author
 *     description: Only admin can delete author.
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: authorID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No Content
 */
router.delete(
  "/:authorID",
  authCheck,
  authorsValidator.deleteAuthor,
  authorsController.deleteAuthor
);

export default router;