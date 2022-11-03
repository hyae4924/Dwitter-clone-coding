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
    return this.http.fetch(`/tweets/${tweetId}`, requestOptions);
  }
}
