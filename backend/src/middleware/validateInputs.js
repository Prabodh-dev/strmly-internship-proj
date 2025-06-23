import { validationResult } from "express-validator";

export const validateInputs = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0].msg;
    res.status(400);
    throw new Error(firstError);
  }
  next();
};
