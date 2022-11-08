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
  const found = await tweetRepository.getById(id);
  if (found) return res.status(200).json(found);
  else return res.status(404).json({ message: `Tweet id${id} does not exist` });
};

export const createTweet = async (req, res) => {
  const { userId, text } = req.body;
  const newTweet = await tweetRepository.create(userId, text);
  res.status(201).json(newTweet);
};

export const updateTweet = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const found = await tweetRepository.getById(id);
  if (!found)
    return res.status(404).json({ message: `Tweet id${id} does not exist` });
  const updated = await tweetRepository.update(id, text);
  res.status(200).json(updated);
};

export const removeTweet = async (req, res) => {
  const { id } = req.params;
  await tweetRepository.remove(id);
  res.status(204).end();
};
