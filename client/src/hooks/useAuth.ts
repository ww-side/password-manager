// Core
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

// Utils
import jwtTokenService from "@/services/JwtTokenService";

const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();

  const getIsLoginUser = async () => {
    try {
      const jwtToken = await jwtTokenService.getToken();

      if (!jwtToken) {
        router.push("/auth");
      }

      const res = await jwtTokenService.isTokenValid();
      if (res.data && pathname === "/auth") {
        router.replace("/");
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError;
        if (axiosError.response?.status === 403) {
          router.replace("/auth");
        } else {
          console.error("Error checking token validity:", e);
        }
      }
    }
  };

  useEffect(() => {
    getIsLoginUser();
  }, []);
};

export default useAuth;
