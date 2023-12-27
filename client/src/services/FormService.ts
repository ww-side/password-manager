// Core
import { type FieldValues } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

class FormService {
  async login(data: FieldValues) {
    try {
      const res = await axios.post(
        "http://localhost:5050/api/auth/login",
        data
      );

      if (res.status === 200) {
        localStorage.setItem("jwtToken", res.data);
      }

      return res;
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  }

  async registration(data: FieldValues) {
    try {
      const res = await axios.post(
        "http://localhost:5050/api/auth/registration",
        data
      );

      if (res.status === 200) {
        await formService.login(data);
      }

      return res;
    } catch (e: any) {
      const { errors } = e.response.data.errors;
      toast.error(errors.map((i: any) => `${i.msg}.\n`));
    }
  }
}

const formService = new FormService();

export default formService;
