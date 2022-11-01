import express from "express";
import tweets from "../archive/tweet.js";
const router = express.Router();

// 1.get all tweets for user's username
router.get("/", (req, res, next) => {
  if (!!req.query) return next();
  const filterd = tweets.filter(item => {
    if (item.username === req.query.username) return true;
  });
  res.send(filterd);
});

// 2.get all tweets
router.get("/", (req, res) => {
  res.send(tweets);
});

// 3.get tweet by id
router.get("/:id", (req, res) => {
  const filterd = tweets.filter(item => {
    if (item.id === Number(req.params.id)) return true;
  });
  res.send(filterd);
});

// 4. creating new tweet
router.post("/", (req, res) => {
  const { name, username, text } = req.body;
  const newTweet = {
    id: Math.random(),
    text,
    name,
    username,
    createdAt: new Date().toISOString(),
  };
  tweets.push(newTweet);
  res.send(newTweet);
});

// 5. updating tweet
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  let index;
  const finded = tweets.find((item, idx) => {
    if (Number(item.id) === Number(id)) {
      index = idx;
      return true;
    }
  });
  finded.text = text;
  tweets[index] = finded;
  res.send(finded);
});

// 6. delete tweet
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let index = tweets.findIndex(item => {
    if (item.id === id) return true;
  });
  tweets.splice(index, 1);
  res.status(204).end();
});

export default router;
