import { body, param } from "express-validator";
import { validationCheck } from "../middleware/validation-check.middleware.js";

const fields = {
  name: body("name").trim().notEmpty().withMessage("Name is required."),
  country: body("country").trim().notEmpty().withMessage("Country is required."),
};

const params = {
  publisherID: param("publisherID").notEmpty().withMessage("Publisher ID is required."),
};

const publishersValidator = {
  createPublisher: [fields.name, fields.country, validationCheck],
  getPublisherByID: [params.publisherID, validationCheck],
};

export default publishersValidator;
