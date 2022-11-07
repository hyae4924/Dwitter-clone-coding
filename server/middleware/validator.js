import { body, header, validationResult } from "express-validator";

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

export const signUp = [
  body("userId").notEmpty().withMessage("please enter userId"),
  body("password").notEmpty().withMessage("please enter password"),
  body("username").notEmpty().withMessage("please enter username"),
  body("email").notEmpty().withMessage("please enter email"),
  body("profile_picture")
    .notEmpty()
    .withMessage("please enter profile_picture"),
  validator,
];
export const signIn = [
  body("userId").notEmpty().withMessage("please enter userId"),
  body("password").notEmpty().withMessage("please enter password"),
  validator,
];

export const me = [header("token").isJWT().withMessage()];
