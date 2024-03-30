import { create } from "zustand";
import { toast } from "react-toastify";
import axiosNew from "../components/axios_config";

export const useAuth = create(() => ({
  user: {},
  signInFetchAndNavigate: async (
    username: string,
    password: string,
    navigate: any
  ) => {
    await axiosNew
      .post(
        "/sign-in",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          navigate("/");
        }
      })
      .catch(() => {
        toast.error("Username atau Password Salah!");
      });
  },
}));
