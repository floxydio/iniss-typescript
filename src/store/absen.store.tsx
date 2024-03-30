import { create } from "zustand"
import axiosNew from "../components/axios_config"

export interface AbsenForm {
    guruId: number
    pelajaranId: number
    kelasId: number
    userId: number
    keterangan: string
    reason: string
    day: number
    month: number
    year: number
    time: string
    type: string
}


export const useAbsen = create((set, get: any) => ({
    absen: [],
    isLoading: false,
    removeAbsen: async () => {
        set({ absen: [] })
    },
    getAbsen: async () => {
        set({ isLoading: true })
        await axiosNew.get("/absen", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        }).then((res) => {

            set({ isLoading: false })
            if (res.status == 200) {
                set({ absen: res.data.data })
            }
        })
    },
    getAbsenFilterOrderBy: async (params: any) => {
        await axiosNew.get("/absen", {
            params: params,
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        }).then((res) => {
            set({ absen: [] })
            if (res.status === 200) {
                set({ absen: res.data.data })
            }
        })
    },
    createAbsen: async (form: AbsenForm) => {
        await axiosNew.post("/absen", {
            guru_id: form.guruId,
            pelajaran_id: form.pelajaranId,
            kelas_id: form.kelasId,
            user_id: form.userId,
            keterangan: form.keterangan,
            reason: form.type === "IZIN" ? form.reason : "-",
            day: form.day,
            month: form.month,
            year: form.year,
            time: form.time,
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": localStorage.getItem("token")
            }
        }).then((res) => {
            get().removeAbsen()
            if (res.status === 200) {
                get().getAbsen()
            }

        })
    },
    editAbsen: async (form: AbsenForm, id: number) => {
        await axiosNew.put(`/edit-absen/${id}`, {
            guru_id: form.guruId,
            pelajaran_id: form.pelajaranId,
            kelas_id: form.kelasId,
            user_id: form.userId,
            keterangan: form.keterangan,
            reason: form.type === "IZIN" ? form.reason : "-",
            day: form.day,
            month: form.month,
            year: form.year,
            time: form.time,
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": localStorage.getItem("token")
            }
        }).then((res) => {
            get().removeAbsen()
            if (res.status === 200) {
                get().getAbsen()
            }
        })
    },
}
))