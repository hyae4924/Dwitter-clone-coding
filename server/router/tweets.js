import express from "express";
import {} from "express-async-errors";
import * as tweetController from "../controller/tweet.js";
import { body } from "express-validator";
import { validator } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

const validateCreate = [
  body("text").notEmpty().withMessage("please enter text"),
  // body("userId").notEmpty().withMessage("please enter userId"),
  validator,
];

const validateUpdate = [
  [body("text").notEmpty().withMessage("plase enter text"), validator],
];

// 1.get all tweets for user's username
// 2.get all tweets
router.get("/", isAuth, tweetController.getTweets);

// 3.get tweet by id
router.get("/:id", isAuth, tweetController.getTweetById);

// 4. creating new tweet
router.post("/", validateCreate, isAuth, tweetController.createTweet);

// 5. updating tweet
router.put("/:id", validateUpdate, isAuth, tweetController.updateTweet);

// 6. delete tweet
router.delete("/:id", isAuth, tweetController.removeTweet);

export default router;
