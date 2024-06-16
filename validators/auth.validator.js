import { body } from "express-validator";
import { validationCheck } from "../middleware/validation-check.middleware.js";

const fields = {
  email: body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email must be a valid email address.")
    .normalizeEmail(),
  name: body("name").trim().notEmpty().withMessage("Name is required."),
  surname: body("surname").trim().notEmpty().withMessage("Surname is required."),
  password: body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  refreshToken: body("refreshToken")
    .trim()
    .notEmpty()
    .withMessage("Refresh token is required.")
    .isJWT()
    .withMessage("Invalid refresh token."),
};

const authValidator = {
  signup: [fields.name, fields.surname, fields.email, fields.password, validationCheck],
  signin: [fields.email, fields.password, validationCheck],
  refresh: [fields.refreshToken, validationCheck],
  signout: [fields.refreshToken, validationCheck],
};

export default authValidator;
