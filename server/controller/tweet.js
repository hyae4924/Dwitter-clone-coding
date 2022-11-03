import * as tweetRepository from "../data/tweet.js";

export const getTweets = async (req, res) => {
  const username = req.query.username;
  const data = username
    ? await tweetRepository.getAllByUsername(username)
    : await tweetRepository.getAll();
  res.status(200).json(data);
};

export const getTweetById = async (req, res) => {
  const { id } = req.params;
  if (id) {
    const found = await tweetRepository.getById(id);
    res.status(200).json(found);
  } else res.status(400).json({ message: "please enter id" });
};

export const createTweet = async (req, res) => {
  const { name, username, text } = req.body;
  if (name && username && text) {
    const newTweet = await tweetRepository.create(name, username, text);
    res.status(201).json(newTweet);
  } else
    res
      .status(400)
      .json({ mesage: "Please enter your username, text and name" });
};

export const updateTweet = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const updated = await tweetRepository.update(id, text);
  if (id && text) res.status(200).json(updated);
  else return res.status(400).json({ message: "Please enter id and text" });
};

export const removeTweet = async (req, res) => {
  const { id } = req.params;
  if (id) {
    await tweetRepository.remove(id);
    res.status(204).end();
  } else res.status(400).json({ message: "please enter id" });
};
