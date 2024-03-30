import { create } from "zustand";
import { toast } from "react-toastify";
import axiosNew from "../../components/axios_config";

export const useAdminMapel = create((set, get: any) => ({

  mapel: [],
  addModalTrigger: false,

  openAddModal: async () => {
    set({ addModalTrigger: true });
  },
  closeAddModal: async () => {
    set({ addModalTrigger: false });
  },

  getMapel: async () => {
    set({ mapel: [] });
    await axiosNew.get(`/find-pelajaran?user_id=${1}`).then((res) => {
      if (res.status === 200) {
        set({ mapel: res.data.data });
      }
    });
  },

  submitMapel: async (
    nama_pelajaran: string,
    guruId: number,
    kelasId: number,
    jadwalId: number,
    jam: string
  ) => {
    await axiosNew
      .post(
        "/admin/create-pelajaran",
        {
          nama: nama_pelajaran,
          guruId: guruId,
          kelasId: kelasId,
          jadwal: jadwalId,
          jam: jam,
          createdAt: new Date().toISOString(),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          get().getMapel();
          get().closeAddModal();
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? "Something Went Wrong");
      });
  },

}));
