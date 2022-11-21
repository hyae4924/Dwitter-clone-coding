import express from "express";
import {} from "express-async-errors";
import { body } from "express-validator";
import { validator } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";
import * as authController from "../controller/auth.js";

const router = express.Router();
const validateSignup = [
  body("username").notEmpty().withMessage("please enter username"),
  body("password").notEmpty().withMessage("please enter password"),
  body("name").notEmpty().withMessage("please enter name"),
  body("email").notEmpty().withMessage("please enter email"),
  body("url").optional({ nullable: true, checkFalsy: true }),
  validator,
];

const validatelogin = [
  body("username").notEmpty().withMessage("please enter username"),
  body("password").notEmpty().withMessage("please enter password"),
  validator,
];

router.post("/signup", validateSignup, authController.signup);
router.post("/login", validatelogin, authController.login);
router.post("/logout", isAuth, authController.logout);
router.get("/me", isAuth, authController.me);
export default router;
