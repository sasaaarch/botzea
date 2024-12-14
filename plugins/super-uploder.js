/*
SCRIPT BY © VYNAA VALERIE 
•• recode kasih credits 
•• contacts: (t.me/VLShop2)
•• instagram: @vynaa_valerie 
•• (github.com/VynaaValerie) 
*/
/*
SCRIPT BY © VYNAA VALERIE 
•• recode kasih credits 
•• contacts: (t.me/VLShop2)
•• instagram: @vynaa_valerie 
•• (github.com/VynaaValerie) 
*/
import axios from 'axios';
import FormData from 'form-data';

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';

  // Cek apakah ada media, jika tidak ada, kirim pesan "Mana medianya?"
  if (!mime) {
    return m.reply('Mana medianya? Balas dengan gambar, video, audio, zip, json, html, atau js!');
  }

  let media = await q.download(); // Download the media

  // Kirim pesan "Loading" saat proses upload dimulai
  m.reply('🔄 Loading, mohon tunggu...');

  // Tentukan ekstensi file berdasarkan tipe MIME
  let fileName = '';
  let contentType = mime;

  if (mime.includes('image')) {
    fileName = mime === 'image/jpeg' ? 'image.jpg' : 'image.png';
  } else if (mime.includes('video')) {
    fileName = 'video.mp4'; // semua video menggunakan .mp4
  } else if (mime.includes('audio')) {
    fileName = 'audio.mp3'; // semua audio menggunakan .mp3
  } else if (mime.includes('zip')) {
    fileName = 'file.zip';
  } else if (mime.includes('json')) {
    fileName = 'file.json';
  } else if (mime.includes('html')) {
    fileName = 'file.html';
  } else if (mime.includes('javascript') || mime.includes('js')) {
    fileName = 'file.js';
  } else {
    return m.reply('Tipe file tidak didukung! Gunakan gambar, video, audio, zip, json, html, atau js.');
  }

  // Prepare FormData for Itzpire API
  let formDataItzpire = new FormData();
  formDataItzpire.append('file', media, {
    filename: fileName,  // Filename sesuai dengan tipe file
    contentType: contentType,
  });

  // Make a POST request to Itzpire API
  try {
    let itzpireResponse = await axios.post('https://itzpire.com/tools/upload', formDataItzpire, {
      headers: {
        ...formDataItzpire.getHeaders()  // Include the necessary headers from FormData
      }
    });

    // Extract the result from Itzpire API
    let itzpireLink = itzpireResponse.data.fileInfo.url;
    let itzpireDownloadLink = itzpireResponse.data.fileInfo.downloadUrl;
    let fileSize = itzpireResponse.data.fileInfo.size;

    // Kirim respon dengan link dari Itzpire saja
    m.reply(`
🌐 *Itzpire Link:*\n${itzpireLink}
📥 *Download Link (Itzpire):*\n${itzpireDownloadLink}
📊 *File Size:* ${fileSize} Bytes
    `);
  } catch (error) {
    console.error('Error uploading to Itzpire:', error);
    m.reply('Terjadi kesalahan saat mengunggah ke Itzpire.');
  }
};

handler.help = ['tourl'];
handler.tags = ['main'];
handler.command = /^(tourl|upload)$/i;

export default handler;