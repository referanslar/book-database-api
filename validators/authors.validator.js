import { body, param, query } from "express-validator";
import { validationCheck } from "../middleware/validation-check.middleware.js";

const fields = {
  name: body("name").trim().notEmpty().withMessage("Name is required."),
  country: body("country").trim().notEmpty().withMessage("Country is required."),
};

const params = {
  authorID: param("authorID").notEmpty().withMessage("Author ID is required."),
};

const queries = {
  currentPage: query("currentPage")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Current page must be a positive integer."),
  perPage: query("perPage")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Per page must be a positive integer."),
};

const authorsValidator = {
  createAuthor: [fields.name, fields.country, validationCheck],
  getAuthors: [queries.currentPage, queries.perPage, validationCheck],
  getAuthorByID: [params.authorID, validationCheck],
  updateAuthor: [params.authorID, fields.name, fields.country, validationCheck],
  deleteAuthor: [params.authorID, validationCheck],
};

export default authorsValidator;
