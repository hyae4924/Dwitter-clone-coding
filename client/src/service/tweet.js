export default class TweetService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getTweets(username) {
    const query = username ? `?username=${username}` : "";
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const tweets = await fetch(`${this.baseURL}/tweets${query}`, requestOptions)
      .then(rep => rep.json())
      .catch(error => console.log("error", error));
    return tweets;
  }

  async postTweet(text) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      text,
      username: "ellie",
      name: "ellie",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const tweet = await fetch(`${this.baseURL}/tweets`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log("error", error));
    return tweet;
  }

  async deleteTweet(tweetId) {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };
    fetch(`${this.baseURL}/tweets/${tweetId}`, requestOptions) //
      .catch(error => console.log("error", error));
  }

  async updateTweet(tweetId, text) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      text,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const tweet = await fetch(
      `${this.baseURL}/tweets/${tweetId}`,
      requestOptions
    )
      .then(response => response.json())
      .catch(error => console.log("error", error));

    return tweet;
  }
}
