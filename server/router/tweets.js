import express from "express";
import tweets from "../archive/tweet.js";
const router = express.Router();

// 1.get all tweets for user's username
// 2.get all tweets
router.get("/", (req, res) => {
  const username = req.query.username;
  const data = username
    ? tweets.filter(tweet => Number(tweet.id) === Number(username.id))
    : tweets;
  res.status(200).json(data);
});

// 3.get tweet by id
router.get("/:id", (req, res) => {
  const finded = tweets.find(item => item.id === Number(req.params.id));
  res.status(200).json(finded);
});

// 4. creating new tweet
router.post("/", (req, res) => {
  const { name, username, text } = req.body;
  if (name && username && text) {
    const newTweet = {
      id: Math.random(),
      text,
      name,
      username,
      createdAt: new Date().toISOString(),
    };
    tweets.unshift(newTweet);
    res.status(201).json(newTweet);
  } else
    res
      .status(400)
      .json({ mesage: "Please enter your username, text and name" });
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
  res.status(200).json(finded);
});

// 6. delete tweet
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let index = tweets.findIndex(item => item.id == id);
  tweets.splice(index, 1);
  res.status(204).end();
});

export default router;
