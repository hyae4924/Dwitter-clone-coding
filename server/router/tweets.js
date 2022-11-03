import express from "express";
import * as tweetController from "../controller/tweet.js";
import * as validator from "../middleware/validator.js";
const router = express.Router();

// 1.get all tweets for user's username
// 2.get all tweets
router.get("/", tweetController.getTweets);

// 3.get tweet by id
router.get("/:id", tweetController.getTweetById);

// 4. creating new tweet
router.post("/", validator.createTweet, tweetController.createTweet);

// 5. updating tweet
router.put("/:id", validator.updateTweet, tweetController.updateTweet);

// 6. delete tweet
router.delete("/:id", tweetController.removeTweet);

export default router;
