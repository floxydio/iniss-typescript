import { create } from "zustand";
import axiosNew from "../components/axios_config";

export const useKelas = create((set) => ({
  kelas: [],
  isLoading: false,
  getDataKelas: async () => {
    set({ isLoading: true });
    await axiosNew
      .get("/kelas", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        set({ kelas: res.data.data });
        set({ isLoading: false });
      });
  },
}));
