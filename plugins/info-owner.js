import fs from 'fs'

let handler = async (m, { conn }) => {
	let tqto = `
┏ ━━━❐ *▸ Bot Tenz Info ◂* ❐━━━━╼⪼
│➤✶ Name Owner : *TENZ STORE*
│➤✶ Name Bot : *TENZ STORE*
│➤✶ Numb Owner :  *+601123399291*
┗ ━━━━━━━━✦━━━━━━╼⪼
❒╾─❐ *CONTACT OWNER* ❐─╼❒
╽ ┏☛ WA : +601123399291☚┓╽
  ┃☛ IG : s.tnxncemboy18     ☚┃
╿ ┗☛ TT : tenzgamingstore ☚┛╿
❒╾────────✛───────╼❒
© Tenz Store Botz Wa	
	
`;
	await conn.sendMessage(m.chat, { image: { url: 'https://itzpire.com/file/b949f69f3592.jpg' }, caption: tqto }, m)
}
handler.help = ['owner']
handler.tags = ['info']
handler.command = /^(owner)$/i;

export default handler;
