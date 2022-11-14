import * as tweetRepository from "../model/data/tweet.js";
import * as userRepository from "../model/data/user.js";
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
  const { text } = req.body;
  const user = await userRepository.findByusername(req.username);
  const newTweet = await tweetRepository.create(user.id, text);
  res.status(201).json(newTweet);
};

export const updateTweet = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const found = await tweetRepository.getById(id);
  if (!found)
    return res.status(404).json({ message: `Tweet id${id} does not exist` });

  const user = await userRepository.findByusername(req.username);

  if (user.id !== found.userId)
    return res.stats(403).json({ message: "no authorization" });
  else {
    const updated = await tweetRepository.update(id, text);
    res.status(200).json(updated);
  }
};

export const removeTweet = async (req, res) => {
  const { id } = req.params;
  const found = await tweetRepository.getById(id);
  if (!found)
    return res.status(404).json({ message: `Tweet id${id} does not exist` });
  const user = await userRepository.findByusername(req.username);
  if (user.id !== found.userId)
    return res.status(403).json({ message: "no authorization" });
  else {
    await tweetRepository.remove(id);
    return res.status(204).json({ message: "Delete success" });
  }
};
