import { body, param } from "express-validator";
import { validationCheck } from "../middleware/validation-check.middleware.js";

const fields = {
  title: body("title").trim().notEmpty().withMessage("Title is required."),
  authorID: body("authorID").notEmpty().withMessage("Author ID is required."),
  image: body("image").optional().isURL().withMessage("Image must be a valid URL."),
  publisherID: body("publisherID").notEmpty().withMessage("Publisher ID is required."),
  published: body("published")
    .optional()
    .isISO8601()
    .withMessage("Published date must be a valid date."),
  isbn13: body("isbn13")
    .optional()
    .isISBN(13)
    .withMessage("ISBN-13 must be a valid ISBN-13 number."),
  isbn10: body("isbn10")
    .optional()
    .isISBN(10)
    .withMessage("ISBN-10 must be a valid ISBN-10 number."),
  status: body("status").trim().notEmpty().withMessage("Status is required."),
};

const params = {
  isbn: param("isbn").notEmpty().withMessage("ISBN is required."),
};

const booksValidator = {
  createBook: [
    fields.title,
    fields.authorID,
    fields.image,
    fields.publisherID,
    fields.published,
    fields.isbn13,
    fields.isbn10,
    fields.status,
    validationCheck,
  ],
  getBookByISBN: [params.isbn, validationCheck],
};

export default booksValidator;
