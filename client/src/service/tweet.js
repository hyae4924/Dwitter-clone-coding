export default class TweetService {
  constructor(http) {
    this.http = http;
  }

  // -------------------
  async getTweets(username) {
    const query = username ? `?username=${username}` : "";
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    return this.http.fetch(`/tweets${query}`, requestOptions);
  }

  // -------------------
  async postTweet(text) {
    const raw = JSON.stringify({
      text,
    });

    const requestOptions = {
      method: "POST",
      body: raw,
      redirect: "follow",
    };

    return this.http.fetch(`/tweets`, requestOptions);
  }

  // -------------------

  async deleteTweet(tweetId) {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };
    return this.http.fetch(`/tweets/${tweetId}`, requestOptions);
  }

  // -------------------
  async updateTweet(tweetId, text) {
    const raw = JSON.stringify({
      text,
    });

    const requestOptions = {
      method: "PUT",
      body: raw,
      redirect: "follow",
    };
    return this.http.fetch(`/tweets/${tweetId}`, requestOptions);
  }
}
