export default class AuthService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }
  async signup(username, password, name, email, url) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username,
      password,
      name,
      email,
      url,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const data = await this.http.fetch("/auth/signup", requestOptions);
    console.log(data, "singnup data");
    this.tokenStorage.saveToken(data.token);
    return data;
  }
  // ---------------------------------
  async login(username, password) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const data = await this.http.fetch("/auth/login", requestOptions);
    console.log(data, "this is signin data");
    this.tokenStorage.saveToken(data.token);
    return data;
  }
  // ---------------------------------
  async me() {
    console.log("123123123");
    const token = this.tokenStorage.getToken();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const data = await this.http.fetch("/auth/me", requestOptions);
    console.log(data, "this is auth/me data");
    return data;
  }
  async logout() {
    this.tokenStorage.clearToken();
  }
}
