import * as userRepository from "../data/user.js";
const tweets = [
  {
    id: "1",
    text: "인생사 새옹지마",
    createdAt: new Date().toString(),
    userId: "1",
  },
  {
    id: "2",
    text: "인생은 폼생폼사",
    createdAt: new Date().toString(),
    userId: "1",
  },
];

// review
export async function getAll() {
  return Promise.all(
    tweets.map(async tweet => {
      const { username, name, url } = await userRepository.findbyId(
        tweet.userId
      );
      return { ...tweet, username, name, url };
    })
  );
}

export async function getAllByUsername(username) {
  const tweets = await getAll();
  console.log(tweets);
  return tweets.filter(tweet => tweet.username === username);
}

export async function getById(id) {
  const found = tweets.find(tweet => tweet.id === id);
  if (!found) return null;
  const { username, name, url } = await userRepository.findbyId(found.userId);
  return { ...found, username, name, url };
}

export async function create(userId, text) {
  const newTweet = {
    id: new Date().toString(),
    text,
    createdAt: new Date().toString(),
    userId,
  };
  tweets.unshift(newTweet);

  return getById(newTweet.id);
}

export async function update(id, text) {
  let index;
  const finded = tweets.find((item, idx) => {
    if (Number(item.id) === Number(id)) {
      index = idx;
      return true;
    }
  });
  finded.text = text;
  tweets[index] = finded;
  return getById(finded.id);
}

export async function remove(id) {
  let index = tweets.findIndex(item => item.id == id);
  tweets.splice(index, 1);
}
