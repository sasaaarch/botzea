import cron from 'node-cron';
import moment from 'moment-timezone';
import axios from 'axios';  // To make API requests

let shalatTasks = [];  // Menyimpan task shalat yang dijadwalkan
let shalatEnabled = {};  // Menyimpan status aktif/nonaktif untuk setiap chat

// Function to fetch prayer times from the API
async function fetchPrayerTimes() {
    const city = 'indragirihulu';
    const country = 'Indonesia';
    const date = moment().format('DD-MM-YYYY'); // Get current date in DD-MM-YYYY format
    const url = `https://api.aladhan.com/v1/timingsByCity/${date}?city=${city}&country=${country}&method=8`;

    try {
        const response = await axios.get(url);
        if (response.data.code === 200) {
            return response.data.data.timings;
        } else {
            console.error('Error fetching prayer times');
            return null;
        }
    } catch (error) {
        console.error('Error fetching prayer times:', error);
        return null;
    }
}

// Function to schedule prayer reminders
async function schedulePrayerReminders(chatId, conn) {
    const prayerTimes = await fetchPrayerTimes(); // Fetch real-time prayer times

    if (prayerTimes) {
        Object.keys(prayerTimes).forEach(prayer => {
            let waktu = prayerTimes[prayer];
            let [hour, minute] = waktu.split(':');
            let cronTime = `${minute} ${hour} * * *`;
            let timeZone = 'Asia/Jakarta';

            let task = cron.schedule(cronTime, () => {
                if (shalatEnabled[chatId]) {
                    let message = `${prayerMessages[prayer](waktu)}`;
                    conn.sendMessage(chatId, { text: message });
                }
            }, { timezone: timeZone });

            shalatTasks.push({ task, chatId, prayer });
        });
    }
}

// Pesan ucapan untuk setiap waktu shalat
const prayerMessages = {
    imsak: waktu => `_Waktu Imsak Telah Tiba 🌙_ (${waktu})\n\nMari bersiap untuk memulai aktivitas hari ini.`,
    shubuh: waktu => `_Waktu Sholat Subuh Telah Tiba 🕌_ (${waktu})\n\nAmbil air wudhu dan segeralah sholat.`,
    dhuhur: waktu => `_Waktu Sholat Dhuhur Telah Tiba ☀️_ (${waktu})\n\nLuangkan waktu untuk menunaikan sholat Dhuhur.`,
    ashar: waktu => `_Waktu Sholat Ashar Telah Tiba 🌇_ (${waktu})\n\nSaatnya menunaikan sholat Ashar.`,
    maghrib: waktu => `_Waktu Sholat Maghrib Telah Tiba 🌆_ (${waktu})\n\nWaktunya menunaikan sholat Maghrib.`,
    isya: waktu => `_Waktu Sholat Isya Telah Tiba 🌌_ (${waktu})\n\nAkhiri hari dengan sholat Isya untuk kedamaian hati.`
};

// Command untuk mengaktifkan/mematikan autoshalat
let handler = async (m, { conn, text }) => {
    let status = text.trim().toLowerCase();

    if (status === 'on') {
        shalatEnabled[m.chat] = true;
        await schedulePrayerReminders(m.chat, conn);  // Fetch prayer times and schedule
        conn.sendMessage(m.chat, { text: '🕌 Fitur pengingat shalat diaktifkan. Kamu akan menerima pengingat sesuai jadwal shalat.' });
    } else if (status === 'off') {
        shalatEnabled[m.chat] = false;
        shalatTasks.forEach(taskObj => {
            if (taskObj.chatId === m.chat) {
                taskObj.task.stop();
            }
        });
        conn.sendMessage(m.chat, { text: '🕌 Fitur pengingat shalat dimatikan. Kamu tidak akan menerima pengingat lagi.' });
    } else {
        conn.sendMessage(m.chat, { text: 'Penggunaan: .autoshalat on/off' });
    }
};

handler.help = ['autoshalat'];
handler.tags = ['general'];
handler.command = /^(autoshalat)$/i;
handler.group = true;
handler.admin = true;

export default handler;