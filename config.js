/*
        ••JANGAN HAPUS INI••
SCRIPT BY © VYNAA VALERIE 
•• recode kasih credits 
•• contacts: (6282389924037)
•• instagram: @vynaa_valerie 
•• (github.com/VynaaValerie) 

• Menerima pembuatan script bot
• Menerima perbaikan script atau fitur bot
• Menerima pembuatan fitur bot
• Menerima semua kebutuhan bot
• Menerima Jadi Bot

ℹ️ Information

• Pembayaran bisa dicicil
• Bisa bayar di awal atau akhir
• Pembayaran melalu QRIS Only
• Testimoni Banyak

Aturan:
1. Dilarang memperjualbelikan script ini.
2. Hak cipta milik Vynaa Valerie.

“Dan janganlah kamu makan harta di antara kamu dengan jalan yang batil, dan janganlah kamu membunuh dirimu sendiri. Sesungguhnya Allah adalah Maha Penyayang kepadamu.” (QS. Al-Baqarah: 188)
*/
import { watchFile, unwatchFile } from 'fs';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

// Global Settings
global.setting = {
  autoclear: false,
  addReply: true, // Tambahkan balasan dengan thumbnail di pesan
};

// Owner Information
global.owner = [
  ['6282389924037', 'Pinaa', true],
];

// Bot Information
global.info = {
  nomerbot: '6283896757956',
  pairingNumber: '6283896757956',
  nameown: 'Pinaa',
  nomerown: '6282389924037',
  token: 'VynaaMD1a2b3c', // Token harus diisi agar bot dapat berjalan
  packname: 'sticker by',
  author: 'Vynaa Valerie',
  namebot: 'Vynaa MD 10.23',
  wm: 'made by Pinaa',
  stickpack: 'YTB Vynaa Valerie',
  stickauth: 'S U B S C R I B E',
};

global.wait = '_M O H O N - T U N G G U_'; // Pesan saat menunggu
global.maxwarn = 5;

// URLs
global.url = {
  profil: 'https://files.catbox.moe/kmpu9v.jpg',
  did: 'https://files.catbox.moe/1nu52l.jpg',
  rules: 'https://files.catbox.moe/1nu52l.jpg',
  thumbnail: 'https://files.catbox.moe/m5nrgb.jpg',
  thumb: 'https://files.catbox.moe/m5nrgb.jpg',
  logo: 'https://files.catbox.moe/kmpu9v.jpg',
  unReg: 'https://files.catbox.moe/m5nrgb.jpg',
  registrasi: 'https://files.catbox.moe/m5nrgb.jpg',
  confess: 'https://telegra.ph/file/03cabea082a122abfa5be.jpg',
  akses: 'https://files.catbox.moe/6yhcfm.jpg',
  wel: 'https://files.catbox.moe/uqxdr6.mp4', // menu GIF
  bye: 'https://files.catbox.moe/uqxdr6.mp4', // Goodbye GIF
  sound: 'https://j.top4top.io/m_3355ivh460.mp3', // Audio menu
  sig: '',
  sgh: 'https://github.com/VynaaValerie',
  sgc: 'https://whatsapp.com/channel/0029VaHPYh6LNSa81M9Xcq1K',
};

// Payment Information
global.payment = {
  psaweria: 'https://saweria.co/',
  ptrakterr: '-',
  pdana: '',
};

// API Configuration
global.api = {
  btch: 'Ganti_apimu',
  rose: 'Ganti_apimu',
};
global.APIs = {
  btch: 'https://api.botcahx.eu.org',
  rose: 'https://api.itsrose.rest',
};
global.APIKeys = {
  'https://api.botcahx.eu.org': 'Ganti_apimu',
  'https://api.itsrose.rest': 'Ganti_apimu',
};

// Watch for File Changes
let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright("Update 'config.js'"));
  import(`${file}?update=${Date.now()}`);
});

/*
        ••JANGAN HAPUS INI••
SCRIPT BY © VYNAA VALERIE 
•• recode kasih credits 
•• contacts: (6282389924037)
•• instagram: @vynaa_valerie 
•• (github.com/VynaaValerie) 

• Menerima pembuatan script bot
• Menerima perbaikan script atau fitur bot
• Menerima pembuatan fitur bot
• Menerima semua kebutuhan bot
• Menerima Jadi Bot

ℹ️ Information

• Pembayaran bisa dicicil
• Bisa bayar di awal atau akhir
• Pembayaran melalu QRIS Only
• Testimoni Banyak

Aturan:
1. Dilarang memperjualbelikan script ini.
2. Hak cipta milik Vynaa Valerie.

“Dan janganlah kamu makan harta di antara kamu dengan jalan yang batil, dan janganlah kamu membunuh dirimu sendiri. Sesungguhnya Allah adalah Maha Penyayang kepadamu.” (QS. Al-Baqarah: 188)
*/