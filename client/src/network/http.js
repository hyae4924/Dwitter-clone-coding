export default class httpClient {
  constructor(baseURL, authErrorEventBus, getCsrfToken) {
    this.baseURL = baseURL;
    this.authErrorEventBus = authErrorEventBus;
    this.getCsrfToken = getCsrfToken;
  }

  async fetch(url, requestOptions) {
    const option = {
      ...requestOptions,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Csrf-Token": this.getCsrfToken(),
      },
    };
    const response = await fetch(`${this.baseURL}${url}`, option);

    let data;
    try {
      //바디가 없는 것을 json()하는경우 에러가나옴
      data = await response.json();
    } catch (e) {
      console.error(e);
    }
    if (response.status > 299 || response.status < 200) {
      const message = data && data.message ? data.message : "somethin is wrong";
      throw new Error(message);
    }
    return data;
  }
}
