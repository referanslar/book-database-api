import express from "express";

import booksController from "../controllers/books.controller.js";
import booksValidator from "../validators/books.validator.js";

import authCheck from "../middleware/auth-check.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create Book
 *     tags: [Books]
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
router.post("/", authCheck, booksValidator.createBook, booksController.createBook);

/**
 * @swagger
 * /api/books/{isbn}:
 *   get:
 *     summary: Get Book by ISBN
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
router.get("/:isbn", booksValidator.getBookByISBN, booksController.getBookByISBN);

export default router;
