export default class AuthService {
  constructor(http) {
    this.http = http;
  }
  async signup(username, password, name, email, url) {
    const raw = JSON.stringify({
      username,
      password,
      name,
      email,
      url,
    });

    const requestOptions = {
      method: "POST",
      body: raw,
      redirect: "follow",
    };

    const data = await this.http.fetch("/auth/signup", requestOptions);
    return data;
  }
  // ---------------------------------
  async login(username, password) {
    const raw = JSON.stringify({
      username,
      password,
    });

    const requestOptions = {
      method: "POST",

      body: raw,
      redirect: "follow",
    };

    const data = await this.http.fetch("/auth/login", requestOptions);
    return data;
  }
  // ---------------------------------
  async me() {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const data = await this.http.fetch("/auth/me", requestOptions);
    return data;
  }
  async logout() {
    const requestOptions = {
      method: "POST",
      redirect: "follow",
    };
    const data = await this.http.fetch("/auth/logout", requestOptions);
    return data;
  }
}
