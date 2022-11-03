import { body, validationResult } from "express-validator";

export const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

export const createTweet = [
  body("name").notEmpty().withMessage("please enter name"),
  body("username").notEmpty().withMessage("please enter username"),
  body("text").notEmpty().withMessage("please enter text"),
  validator,
];

export const updateTweet = [
  [body("text").notEmpty().withMessage("plase enter text"), validator],
];
