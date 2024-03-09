import React, { useEffect, useState } from 'react'
import {
    Box,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    Paper,
    TableRow,
    TableBody,
    Button,
    Modal,
    TextField,
    FormControl,
    Typography,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    InputAdornment,
} from "@mui/material";
import { useAdminSiswa } from '../../store/Admin/admin_siswa.store';


const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function AdminSiswa() {
    // Store
    const siswaState = useAdminSiswa((state) => state)

    // State
    const [nama, setNama] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [kelas, setKelas] = useState("")


    useEffect(() => {
        siswaState.fetchSiswa()
        siswaState.fetchKelas()
    }, [])


    return (
        <>
            <h1 className='text-4xl mb-10'>Konfigurasi Siswa</h1>
            {/* Create Button */}
            <Button variant="contained" color="primary" onClick={() => siswaState.onOpenModal()}>
                Tambah Siswa
            </Button>

            {/* Table */}
            <TableContainer component={Paper} className='mt-[70px]'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                style={{
                                    fontWeight: "bold",
                                }}
                            >
                                No
                            </TableCell>
                            <TableCell
                                style={{
                                    fontWeight: "bold",
                                }}
                            >
                                Nama Siswa
                            </TableCell>
                            <TableCell
                                style={{
                                    fontWeight: "bold",
                                }}
                            >
                                Username
                            </TableCell>
                            <TableCell
                                style={{
                                    fontWeight: "bold",
                                }}
                            >
                                Nomor Kelas
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {siswaState.siswa.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{item.nama}</TableCell>
                                <TableCell>{item.username}</TableCell>
                                <TableCell>{item.kelas.nomor_kelas}</TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal */}
            <Modal open={siswaState.addModalTrigger} onClose={() => {
                siswaState.onCloseModal()
                //  remove all value
                setNama('')
                setUsername('')
                setPassword('')
                setKelas('')
            }}>
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "60%",
                    bgcolor: "white",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                    overflowY: "auto",
                }} noValidate autoComplete="off">
                    <Typography
                        variant="h5"
                        sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                        Daftar Siswa / Siswi
                    </Typography>

                    <TextField id="outlined-basic" value={nama} label="Nama Lengkap" variant="outlined" fullWidth margin="normal"
                        onChange={(e) => {
                            // Only Alphabet
                            setNama(e.target.value.replace(/[^a-zA-Z\s]/g, ''))
                        }}
                    />
                    <TextField id="outlined-basic" value={username} label="Username" variant="outlined" fullWidth margin="normal"
                        onChange={(e) => {
                            // Remove space
                            setUsername(e.target.value.replace(/\s/g, ''))
                        }}
                    />
                    <TextField id="outlined-basic" value={password} type='password' label="Password" variant="outlined" fullWidth margin="normal"
                        onChange={(e) => {
                            // Remove space
                            setPassword(e.target.value.replace(/\s/g, ''))
                        }}
                    />
                    <Select
                        className='mt-5 mb-10'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        fullWidth
                        margin="normal"
                        value={kelas === "" ? "999" : kelas}
                        onChange={(e) => setKelas(e.target.value)}
                    >
                        <MenuItem value="999" disabled>Pilih Kelas</MenuItem>
                        {siswaState.kelas.map((item, i) => (
                            <MenuItem key={i} value={item.kelas_id}>
                                {item.nomor_kelas}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button

                        variant="contained"
                        fullWidth
                        margin="normal"
                        onClick={() => {
                            siswaState.sendCreateSiswa(nama, username, password, kelas)
                        }}
                    >
                        Submit Data
                    </Button>

                </Box>
            </Modal>
        </>
    )
}
