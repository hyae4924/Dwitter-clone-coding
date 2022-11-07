import express from "express";
import * as authController from "../controller/auth.js";
import * as validator from "../middleware/validator.js";
const router = express.Router();

router.post("/signup", validator.signUp, authController.signUp);
router.post("/login", validator.signIn, authController.logIn);
router.get("/me", authController.me);
export default router;
