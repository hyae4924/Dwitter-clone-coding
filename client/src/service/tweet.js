export default class TweetService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  getHeder() {
    const token = this.tokenStorage.getToken();
    return { Authorization: `Bearer ${token}` };
  }
  // -------------------
  async getTweets(username) {
    const query = username ? `?username=${username}` : "";
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: this.getHeder(),
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
      headers: { ...this.getHeder(), "Content-Type": "application/json" },
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
      headers: this.getHeder(),
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
      headers: { ...this.getHeder(), "Content-Type": "application/json" },
      body: raw,
      redirect: "follow",
    };
    return this.http.fetch(`/tweets/${tweetId}`, requestOptions);
  }
}
