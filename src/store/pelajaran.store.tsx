import { create } from "zustand";
import axiosNew from "../components/axios_config";

export const usePelajaran = create((set) => ({
  pelajaran: [],
  isLoading: false,
  getPelajaran: async () => {
    set({ isLoading: true });
    await axiosNew
      .get("/kelas", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log(res.data.data)
        set({ pelajaran: res.data.data });
        set({ isLoading: false });
      });
  },
}));

export const useGetMapel = create(() => ({}));
