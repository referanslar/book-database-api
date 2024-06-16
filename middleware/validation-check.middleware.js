import { validationResult } from "express-validator";

export const validationCheck = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      result: {
        message: "Validation failed.",
        errors: errors.array(),
      },
    });
  }

  next();
};
