const tweets = [
  {
    id: 1,
    text: "드림코딩에서 강의 들으면 너무 좋으다",
    createdAt: "2021-05-09T04:20:57.000Z",
    name: "Bob",
    username: "Bob",
  },
];

export async function getAll() {
  return tweets;
}

export async function getAllByUsername(username) {
  return tweets.filter(tweet => tweet.username === username);
}

export async function getById(id) {
  return tweets.find(tweet => tweet.id === id);
}

export async function create(name, username, text) {
  const newTweet = {
    id: Math.random(),
    text,
    name,
    username,
    createdAt: new Date().toISOString(),
  };
  tweets.unshift(newTweet);
  return newTweet;
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
  return finded;
}

export async function remove(id) {
  let index = tweets.findIndex(item => item.id == id);
  tweets.splice(index, 1);
}
