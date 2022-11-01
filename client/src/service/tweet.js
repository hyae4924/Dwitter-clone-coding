export default class TweetService {
  async getTweets(username) {
    let tweets;
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    await fetch("http://localhost:8080/tweets", requestOptions)
      .then(response => response.json())
      .then(result => {
        tweets = result;
      })
      .catch(error => console.log("error", error));

    return username
      ? tweets.filter(tweet => tweet.username === username)
      : tweets;
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
    let tweet;
    await fetch("http://localhost:8080/tweets", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        tweet = result;
      })
      .catch(error => console.log("error", error));

    return tweet;
  }

  async deleteTweet(tweetId) {
    // this.tweets = this.tweets.filter(tweet => tweet.id !== tweetId);
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`http://localhost:8080/tweets/${tweetId}`, requestOptions) //
      .catch(error => console.log("error", error));
  }

  async updateTweet(tweetId, text) {
    // if (!tweet) {
    //   throw new Error("tweet not found!");
    // }
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
    let tweet;
    await fetch(`http://localhost:8080/tweets/${tweetId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        tweet = result;
      })
      .catch(error => console.log("error", error));

    return tweet;
  }
}
