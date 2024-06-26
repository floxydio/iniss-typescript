import { create } from "zustand";
import axiosNew from "../components/axios_config";
import { toast } from "react-toastify";

export const useKelas = create((set) => ({

  kelas: [],

  fetchKelas: async () => {
    const userId = localStorage.getItem("role_id");
    if (userId === undefined || userId === null) {
      toast.error("Id Guru tidak ditemukan");
    } else {
      await axiosNew.get(`/kelas?user_id=${userId}`).then((res) => {
        set({ kelas: res.data.data });
      });
    }
  },
  
}));

// export const useUjian = create((set) => ({
//     ujian: [],
//     isLoading: false,
//     getUjian: async () => {
//         set({ isLoading: true })
//         await axiosNew.get("/all-ujian", {

//         }).then((res) => {
//             set({ ujian: res.data.data })
//             set({ isLoading: false })
//         })
//     }
// }))
