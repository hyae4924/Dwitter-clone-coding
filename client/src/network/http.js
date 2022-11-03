export default class httpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  async fetch(url, requestOptions) {
    const response = await fetch(`${this.baseURL}${url}`, requestOptions);

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
