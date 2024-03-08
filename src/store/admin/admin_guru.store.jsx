import { create } from "zustand";
import axiosNew from "../../components/AxiosConfig";

export const useAdminGuru = create((set, get) => ({
  guru: [],
  isLoading: false,
  getGuru: async () => {
    set({ isLoading: true });
    await axiosNew
      .get("/admin/find-guru", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          set({ guru: res.data.data });
          set({ isLoading: false });
        }
      });
  },
  createGuru: async () => {}
}));