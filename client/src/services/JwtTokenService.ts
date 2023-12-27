// Core
import axios from "axios";

class JwtTokenService {
  async getToken() {
    return localStorage.getItem("jwtToken");
  }

  async isTokenValid() {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      return Promise.reject(new Error("jwtToken is missing in localStorage"));
    }

    try {
      return axios.get("http://localhost:5050/api/user/isTokenValid", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    } catch (e) {
      throw e;
    }
  }
}

const jwtTokenService = new JwtTokenService();

export default jwtTokenService;
