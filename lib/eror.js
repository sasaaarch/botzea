import axios from 'axios';
import fs from 'fs';
import path from 'path';

const getUserIP = async () => {
    const ipResponse = await axios.get('https://ipinfo.io/json');
    return ipResponse.data.ip;
};

const getUserAccess = async (userIP) => {
    const accessListResponse = await axios.get('https://vynaa.vercel.app/akses/vynaa.json');
    const accessList = accessListResponse.data;
    return accessList.some(entry => entry.Ip === userIP && entry.Access);
};

const forceDeleteFile = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);  // Menghapus file secara paksa
            console.log('File telah dihapus!');
        } else {
            console.log('File tidak ditemukan.');
        }
    } catch (err) {
        console.error('Terjadi kesalahan saat menghapus file:', err.message);
    }
};

const validateTokenAndAccess = async (globalToken) => {
    // Dapatkan IP pengguna
    const userIP = await getUserIP();
    console.log(`IP pengguna: ${userIP}`);

    // Periksa apakah akses diberikan berdasarkan IP
    const hasAccess = await getUserAccess(userIP);
    if (!hasAccess) {
        console.log('Akses tidak diberikan berdasarkan IP!');
        return;
    }

    // URL token
    const url = 'https://tokens-eight.vercel.app/p/I/N/A/token.json';
    let tokenData;

    try {
        // Ambil data token dari URL
        const res = await axios.get(url);
        if (!res.status === 200) throw new Error(`Gagal mengambil data dari ${url}`);
        tokenData = res.data;
    } catch (err) {
        throw new Error(`Terjadi kesalahan saat memeriksa token: ${err.message}`);
    }

    // Cek apakah token ada dalam data yang diambil
    if (!tokenData.tokens.includes(globalToken)) {
        console.log('Token salah masukkan token di config.js global.info.token. lalu upload kembali!!!');
        
        // Langsung hapus main.js
        const mainPath = path.resolve('main.js');
        forceDeleteFile(mainPath);

        throw new Error('Token salah masukkan token di config.js global.info.token. lalu upload kembali!!!');
    }

    console.log('TOKEN BENER ☺️ TERIMAKASIH TELAH AMANAH');
};

export { getUserIP, getUserAccess, validateTokenAndAccess };