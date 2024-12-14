import fs from 'fs';
import moment from 'moment-timezone';

let menuFormat = {
  header: '*%category*',
  body: ' » %cmd',
  footer: '',
  after: global.info.namebot
};

let handler = async (m, { conn, usedPrefix: _p, __dirname, args, command }) => {
  // Menentukan waktu dan tanggal sekarang di zona waktu Asia/Jakarta
  const waktu = moment().tz('Asia/Jakarta');
  const tampilTanggal = waktu.format('dddd, DD MMMM YYYY');
  const tampilWaktu = `Jam: ${waktu.format('HH:mm:ss')}`;

  // Hitung mundur untuk perayaan (ubah tahun ke 2025)
  const tanggalLebaran = moment("2025-03-10"); // Tanggal Lebaran 2025
  const tanggalPuasa = moment("2025-03-05");  // Tanggal awal Puasa 2025
  const tanggalIdulAdha = moment("2025-06-05"); // Tanggal Idul Adha 2025
  const tanggalNatal = moment("2025-12-25"); // Natal 2025

  const mundurLebaran = tanggalLebaran.diff(waktu, 'days');
  const mundurPuasa = tanggalPuasa.diff(waktu, 'days');
  const mundurIdulAdha = tanggalIdulAdha.diff(waktu, 'days');
  const mundurNatal = tanggalNatal.diff(waktu, 'days');

  // Definisi kategori dan perintah
  let tags = {
    general: 'G e n e r a l',
    ppob: 'P P O B',
    pushkontak: 'P u s h',
    store: 'S t o r e',
    owner: 'O w n e r',
    main: 'M a i n',
    group: 'G r o u p',
  };

  // Ambil daftar handler
  let help = Object.values(global.plugins).filter(plugin => plugin.tags && plugin.help).map(plugin => ({
    help: plugin.help,
    tags: plugin.tags,
    command: plugin.command
  }));

  // Bangun teks menu dengan format yang lebih menarik
  let menuText = `
━━━━━━━━━━━━━━━━━━━━
*Informasi Waktu*
━━━━━━━━━━━━━━━━━━━━
Nama: ${m.pushName || 'Tidak Diketahui'}
Tgl: ${tampilTanggal}
Waktu: ${tampilWaktu}

━━━━━━━━━━━━━━━━━━━━
*Hitung Mundur Perayaan:*
━━━━━━━━━━━━━━━━━━━━
- Lebaran: ${mundurLebaran} hari lagi
- Puasa: ${mundurPuasa} hari lagi
- Idul Adha: ${mundurIdulAdha} hari lagi
- Natal: ${mundurNatal} hari lagi

━━━━━━━━━━━━━━━━━━━━
`;

  menuText += Object.keys(tags)
    .map(tag => {
      // Header kategori
      let categoryHeader = menuFormat.header.replace('%category', tags[tag]);

      // Daftar perintah dalam kategori ini
      let commands = help
        .filter(plugin => plugin.tags.includes(tag))
        .map(plugin => {
          // Jika plugin.help adalah array, gabungkan perintah
          if (Array.isArray(plugin.help)) {
            return menuFormat.body.replace('%cmd', plugin.help.map(h => `${_p}${h}`).join(', '));
          } else {
            // Jika bukan array, langsung gunakan plugin.help
            return menuFormat.body.replace('%cmd', `${_p}${plugin.help}`);
          }
        })
        .join('\n');

      // Gabungkan header dan body
      return [categoryHeader, commands].filter(v => v).join('\n');
    })
    .join('\n\n'); // Pisahkan antar kategori

  // Tambahkan footer dan teks akhir
  menuText += `\n━━━━━━━━━━━━━━━━━━━━
${menuFormat.footer}\n${menuFormat.after}`;

  // Kirim menu ke pengguna
  conn.sendMessage(m.chat, {
    text: menuText,
    contextInfo: {
      externalAdReply: {
        title: global.wm,
        body: global.author,
        thumbnailUrl: global.url.thumbnail,
        sourceUrl: global.sgc,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });
};

// Metadata handler
handler.help = ['menu'];
handler.tags = ['info'];
handler.command = /^(menu|allmenu)$/i;

export default handler;