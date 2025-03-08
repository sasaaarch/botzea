import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)

// FAKE KONTAK
 const repPy = {
	key: {
		remoteJid: '0@s.whatsapp.net',
		fromMe: false,
		id: global.info.wm,
		participant: '0@s.whatsapp.net'
	},
	message: {
		requestPaymentMessage: {
			currencyCodeIso4217: "USD",
			amount1000: 999999999,
			requestFrom: '0@s.whatsapp.net',
			noteMessage: {
				extendedTextMessage: {
					text: global.info.namebot,
				}
			},
			expiryTimestamp: 999999999,
			amount: {
				value: 91929291929,
				offset: 1000,
				currencyCode: "INR"
			}
		}
	}
}

  const sentMsg = await conn.sendContactArray(m.chat, [
    [`${global.info.nomerown}`, `${await conn.getName(global.info.nomerown+'@s.whatsapp.net')}`, `VynaaValerie `, `Bukan Sepuh`, `vynaavalerie@vlshop.me`, `🇮🇩Indonesia, Pekanbaru`, `https://linkbio.co/VLShop`, ` Creator Vynaa AI`],
    [`${conn.user.jid.split('@')[0]}`, `${await conn.getName(conn.user.jid)}`, `Whatsapp Bot`, `Don't Spam`, `Nothing`, `🇮🇩 Indonesia`, `Nothing`, `Bot MultiDevice`]
  ], repPy)
  await conn.reply(m.chat, `
*About Vynaa Valerie*

Hai, saya Vynaa Valerie! Seorang creator bot dan developer freelance dengan pengalaman lebih dari 2 tahun dalam membangun solusi cerdas berbasis teknologi melalui platform VynaaAI. Selain itu, saya juga seorang YouTuber, berbagi konten edukasi dan inspirasi tentang dunia pengembangan bot, teknologi, dan tips seputar freelancing.

Saya melayani pembuatan bot untuk berbagai kebutuhan, seperti otomatisasi bisnis, chatbot interaktif, hingga sistem berbasis AI yang dapat disesuaikan dengan kebutuhan spesifik Anda.

Mari kolaborasi untuk menciptakan solusi cerdas bersama! 

*Info Owner*
• Instagram: https://instagram.com/vynaa_valerie
• YouTube: https://youtube.com/@VynaaChan
• Discord: https://discord.gg/c6wYDZfhhc
• Ch wa: https://whatsapp.com/channel/0029VaHPYh6LNSa81M9Xcq1K
• website: https://linkbio.co/VLShop
`, sentMsg)
  } 

handler.help = ['owner', 'creator']
handler.tags = ['general']
handler.command = /^(owner|creator)/i
export default handler