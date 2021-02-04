import axios from "axios";

class Api {
  constructor() {
    this.baseUrl = "http://localhost:3000";
  }

  async get(url) {
    return axios.get(`${this.baseUrl}${url}`);
  }

  async patch(url, params) {
    return axios.patch(`${this.baseUrl}${url}`, params);
  }

  async post(url, params) {
    return axios.get(`${this.baseUrl}${url}`, params);
  }

  async delete(url) {
    return axios.delete(`${this.baseUrl}${url}`);
  }
}

export default new Api();
