// Core
import axios from "axios";
import toast from "react-hot-toast";

// Utils
import jwtTokenService from "@/services/JwtTokenService";

// Types
import { PasswordType } from "@/types/password";

class UserService {
  async getAllSavedPasswords() {
    const token = await jwtTokenService.getToken();
    try {
      const res = await axios.get(
        "http://localhost:5050/api/user/getAllSavedPasswords",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }

  async savePassword(data: PasswordType) {
    const token = await jwtTokenService.getToken();
    try {
      const res = await axios.post(
        "http://localhost:5050/api/user/savePassword",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (e: any) {
      if (e.response.data.errors) {
        const { errors } = e.response.data;
        toast.error(errors.map((i: any) => `${i.msg}.\n`));
        return;
      }

      const { message } = e.response.data;
      toast.error(message);
    }
  }

  async deletePassword(label: string) {
    const token = await jwtTokenService.getToken();

    try {
      const res = await axios.delete(
        `http://localhost:5050/api/user/deletePassword/${label}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
}

const userService = new UserService();

export default userService;
