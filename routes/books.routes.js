import express from "express";

import booksController from "../controllers/books.controller.js";
import booksValidator from "../validators/books.validator.js";

import authCheck from "../middleware/auth-check.middleware.js";
import adminCheck from "../middleware/admin-check.middleware.js";
import { authLimiter } from "../middleware/rate-limit.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create Book
 *     description: Only admins can create books.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               authorID:
 *                 type: integer
 *               image:
 *                 type: string
 *               publisherID:
 *                 type: integer
 *               published:
 *                 type: string
 *               isbn13:
 *                 type: string
 *               isbn10:
 *                 type: string
 *               status:
 *                 type: string
 *             example:
 *               title: Harry Potter and the Philosopher's Stone
 *               authorID: 1
 *               image: path/to/image.jpg
 *               publisherID: 1
 *               published: "1997"
 *               isbn13: "9780747532699"
 *               isbn10: "0747532699"
 *               status: active
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
  "/",
  authLimiter,
  authCheck,
  adminCheck,
  booksValidator.createBook,
  booksController.createBook
);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get Books
 *     description: If no query parameters are provided, the API will use default values.
 *     tags: [Books]
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
router.get("/", booksValidator.getBooks, booksController.getBooks);

/**
 * @swagger
 * /api/books/search/{isbn}:
 *   get:
 *     summary: Get Book by ISBN
 *     description: Get book details by ISBN10 or ISBN13.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/search/:isbn", booksValidator.getBookByISBN, booksController.getBookByISBN);

export default router;
