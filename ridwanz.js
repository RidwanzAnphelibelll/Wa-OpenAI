const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, typing } = require("@adiwajshing/baileys");
const fs = require("fs");
const { exec } = require("child_process");
const yts = require('yt-search');
const axios = require('axios');
const util = require("util");
const si = require('systeminformation');
const os = require("os");
const chalk = require("chalk");
const { Configuration, OpenAIApi } = require("openai");
let setting = require("./key.json");
module.exports = ridwanz = async (client, m, chatUpdate, store) => {
 try {
 var body =
 m.mtype === "conversation"
 ? m.message.conversation
 : m.mtype == "imageMessage"
 ? m.message.imageMessage.caption
 : m.mtype == "videoMessage"
 ? m.message.videoMessage.caption
 : m.mtype == "extendedTextMessage"
 ? m.message.extendedTextMessage.text
 : m.mtype == "buttonsResponseMessage"
 ? m.message.buttonsResponseMessage.selectedButtonId
 : m.mtype == "listResponseMessage"
 ? m.message.listResponseMessage.singleSelectReply.selectedRowId
 : m.mtype == "templateButtonReplyMessage"
 ? m.message.templateButtonReplyMessage.selectedId
 : m.mtype === "messageContextInfo"
 ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text
 : "";
 var budy = typeof m.text == "string" ? m.text : "";
 // var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
 var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/";
 const isCmd2 = body.startsWith(prefix);
 const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();
 const args = body.trim().split(/ +/).slice(1);
 const pushname = m.pushName || "No Name";
 const botNumber = await client.decodeJid(client.user.id);
 const itsMe = m.sender == botNumber ? true : false;
 let text = (q = args.join(" "));
 const arg = budy.trim().substring(budy.indexOf(" ") + 1);
 const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);
 const from = m.chat;
 const reply = m.reply;
 const sender = m.sender;
 const mek = chatUpdate.messages[0];

 const color = (text, color) => {
 return !color ? chalk.green(text) : chalk.keyword(color)(text);
 };

 // AUTO Read Message 
 client.readMessages([m.key]); 

 // Group
 const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch((e) => {}) : "";
 const groupName = m.isGroup ? groupMetadata.subject : "";

 // Push Message To Console
 let argsLog = budy.length > 30 ? `${q.substring(0, 30)}...` : budy;

 if (isCmd2 && !m.isGroup) {
 console.log(chalk.black(chalk.bgWhite("[ LOGS ]")), color(argsLog, "turquoise"), chalk.magenta("From"), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`));
 } else if (isCmd2 && m.isGroup) {
 console.log(
 chalk.black(chalk.bgWhite("[ LOGS ]")),
 color(argsLog, "turquoise"),
 chalk.magenta("From"),
 chalk.green(pushname),
 chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`),
 chalk.blueBright("IN"),
 chalk.green(groupName)
 );
 }

 if (isCmd2) {

switch (command) {
case "infoowner":
  const adminInfoMessage = `
👤 *Info Owner* 👤

👋 *Nama:* Ridwanz Saputra
📱 *Nomor:* +6285225416745
📍 *Asal:* Karanggayam, Jawa Tengah
💬 *Status:* Lajang
🌟 *Hobi:* Makan, Tidur, Ngoding

Terima kasih sudah menggunakan bot ini! 🤖✨`;
  m.reply(adminInfoMessage);
  break;
  
case "totalfitur":
  const totalFeatures = 60;
  m.reply(`Bot ini memiliki total ${totalFeatures} fitur.`);
  break;
  
case "cekumur":
  const randomAge = Math.floor(Math.random() * 100) + 1;
  m.reply(`Umur saya adalah ${randomAge} tahun.`);
  break;
  
case "bendera":
  const namaNegara = arg.toLowerCase();

  const daftarBendera = {
    indonesia: "🇮🇩",
    cina: "🇨🇳",
    amerika: "🇺🇸",
    jepang: "🇯🇵",
    singapura: "🇸🇬",
    korea: "🇰🇷",
    india: "🇮🇳",
    brazil: "🇧🇷",
    rusia: "🇷🇺",
    kanada: "🇨🇦",
    australia: "🇦🇺",
    perancis: "🇫🇷",
    jerman: "🇩🇪",
    italia: "🇮🇹",
    spanyol: "🇪🇸",
    argentina: "🇦🇷",
    meksiko: "🇲🇽",
    mesir: "🇪🇬",
    nigeria: "🇳🇬",
    afrikaSelatan: "🇿🇦",
    turki: "🇹🇷",
    arabSaudi: "🇸🇦",
    iran: "🇮🇷",
    irak: "🇮🇶",
    pakistan: "🇵🇰",
    malaysia: "🇲🇾",
    thailand: "🇹🇭",
    vietnam: "🇻🇳",
    filipina: "🇵🇭",
    argentina: "🇦🇷",
  };

  if (daftarBendera.hasOwnProperty(namaNegara)) {
    m.reply(daftarBendera[namaNegara]);
  } else {
    m.reply("Negara tidak dikenal atau tidak ada emoji bendera untuk negara tersebut.");
  }
  break;

case "ceknomor":
  m.reply(`Nomor Anda: ${m.sender}`);
  break;

 case "ai": 
 case "openai": 
 try { 
 if (!text) return reply(`*Contoh :*\n.ai apa itu hacker.`);
 const configuration = new Configuration({
 apiKey: setting.keyopenai,
 });
 const openai = new OpenAIApi(configuration);

 /*const response = await openai.createCompletion({
 model: "text-davinci-003",
 prompt: text,
 temperature: 0, // Higher values means the model will take more risks.
 max_tokens: 600, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
 top_p: 1, // alternative to sampling with temperature, called nucleus sampling
 frequency_penalty: 0.3, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
 presence_penalty: 0 // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
 });
 m.reply(`${response.data.choices[0].text}`);*/
 const response = await openai.createChatCompletion({
 model: "gpt-3.5-turbo-0301",
 messages: [{role: "user", content: text}],
 });
 m.reply(`${response.data.choices[0].message.content}`);
 } catch (error) {
 if (error.response) {
 console.log(error.response.status);
 console.log(error.response.data);
 console.log(`${error.response.status}\n\n${error.response.data}`);
 } else {
 console.log(error);
 m.reply("Maaf, sepertinya ada yang error :"+ error.message);
 }
 } 
 break;
 case "sc":
 case "script":
 case "scbot":
 m.reply("Bot Ini Menggunakan Script Dari https://github.com/Ridwanz-Saputra/Wa-OpenAI");
 break; 

case "owner":
 m.reply(`Nomor Owner : *+6285225416745*`);
 break;
 
case "infobot":
 m.reply(`ℹ️ *Info Bot:*\n\nBot ini dibuat oleh Ridwanz dan menggunakan teknologi OpenAI untuk memberikan jawaban otomatis atas pertanyaan Anda. Jangan ragu untuk mencoba perintah .ai atau .openai untuk memulai percakapan dengan bot ini!`);
 break;

case "rules":
 m.reply(`📜 *Rules:*\n\n1. Hargai dan hormati sesama pengguna.\n2. Tidak diperkenankan melakukan spam atau flood pesan.\n3. Hindari penggunaan kata-kata kasar atau mengandung unsur negatif.\n4. Gunakan perintah dengan bijak dan sesuai kebutuhan.\n5. Dilarang mengirim konten yang tidak sesuai atau melanggar hukum.\n\nTerima kasih atas kerjasama Anda!`);
 break;

case "uptime":
 const uptimeSeconds = process.uptime();
 const hours = Math.floor(uptimeSeconds / 3600);
 const minutes = Math.floor((uptimeSeconds % 3600) / 60);
 const seconds = Math.floor(uptimeSeconds % 60);
 const uptime = `${hours} jam ${minutes} menit ${seconds} detik`;
 m.reply(`*⏰ʙᴏᴛ ᴡᴀ-ᴏᴘᴇɴᴀɪ ᴀᴋᴛɪꜰ ꜱᴇʟᴀᴍᴀ :*\n${uptime}`);
 break;

case "ping":
 const start = new Date().getTime();
 const simulatedProcessingTime = 1000;
 while (new Date().getTime() - start < simulatedProcessingTime) {}
 const end = new Date().getTime();
 const responseTime = (end - start) / 1000;
 m.reply(`Bot response time: ${responseTime.toFixed(2)} seconds`);
 break;
 
case "getfiles":
 if (m.sender !== "6285225416745@s.whatsapp.net") {
 m.reply("Maaf, hanya owner bot yang dapat menggunakan perintah ini.");
 break;
 }

 if (args.length < 1) {
 m.reply("*Contoh :*\n.getfiles ridwanz.js");
 } else {
 try {
 const fileName = args[0];
 const fileContent = fs.readFileSync(fileName, "utf8");
 m.reply(`${fileContent}`);
 } catch (error) {
 m.reply(`Error reading file: ${error.message}`);
 }
 }
 break;

case "savefiles":
 if (m.sender !== "6285225416745@s.whatsapp.net") {
 m.reply("Maaf, hanya owner bot yang dapat menggunakan perintah ini.");
 break;
 }

 if (args.length < 2) {
 m.reply("*Contoh :*\n.savefiles ridwanz.js <kode>");
 } else {
 try {
 const fileName = args[0];
 const content = args.slice(1).join(" ");
 fs.writeFileSync(fileName, content, "utf8");
 m.reply(`File ${fileName} saved successfully.`);
 } catch (error) {
 m.reply(`Error saving file: ${error.message}`);
 }
 }
 break;
 
case "hapusfiles":
  if (m.sender !== "6285225416745@s.whatsapp.net") {
    m.reply("Maaf, hanya owner bot yang dapat menggunakan perintah ini.");
    break;
  }

  if (args.length < 1) {
    m.reply("*Contoh :*\n.hapusfile ridwanz.js");
  } else {
    try {
      const fileNameToDelete = args[0];
      fs.unlinkSync(fileNameToDelete);
      m.reply(`File ${fileNameToDelete} berhasil dihapus.`);
    } catch (error) {
      m.reply(`Error menghapus file: ${error.message}`);
    }
  }
  break;

case "selamat":
const currentHour = new Date().getHours();

  let greetingMessage = "";
  if (currentHour >= 0 && currentHour < 12) {
    greetingMessage = "Selamat pagi!";
  } else if (currentHour >= 12 && currentHour < 18) {
    greetingMessage = "Selamat siang!";
  } else {
    greetingMessage = "Selamat malam!";
  }

  m.reply(greetingMessage);
  break;

case "tagall":
 if (m.isGroup) {
 const groupId = m.chat;
 const groupMetadata = await client.groupMetadata(groupId).catch((e) => {});

 if (groupMetadata) {
 const ownerNumber = "6285225416745@s.whatsapp.net";
 const isOwner = m.sender === ownerNumber;
 const isAdmin = groupMetadata.admins?.includes(m.sender) || false;

 if (isOwner || isAdmin) {
 const participants = groupMetadata.participants || [];
 const mentionString = participants
 .filter((participant) => participant.id !== m.sender)
 .map((participant) => `@${participant.id.replace("@s.whatsapp.net", "")}`)
 .join(" ");

 m.reply(`*Semua Member Group:*\n\n${mentionString}`);
 } else {
 m.reply("Maaf, hanya owner bot dan admin grup yang dapat menggunakan perintah ini.");
 }
 } else {
 m.reply("Terjadi kesalahan saat mengambil informasi grup.");
 }
 } else {
 m.reply("Perintah ini hanya bisa digunakan di dalam grup.");
 }
 break;
 
 case "tagme":
 m.reply(`Hai, @${m.sender.replace("@s.whatsapp.net", "")}! Kamu sudah ditag.`);
 break;

 case 'joingroup':
 const ownerNumber = '6285225416745@s.whatsapp.net';
 if (m.sender !== ownerNumber) return m.reply("Hanya owner bot yang dapat menggunakan perintah ini.");
 
 if (!text.startsWith("http")) return m.reply("*Masukkan link grupnya cuk!*");

 try {
 const groupLink = text.split('https://chat.whatsapp.com/')[1];
 await client.groupAcceptInvite(groupLink);
 m.reply("*Sukses join grup!*");
 } catch (error) {
 console.error("Error joining group:", error);
 m.reply("Gagal join grup. Pastikan link grup valid dan bot memiliki izin untuk join.");
 }
 break;
 
case "leavegroup":
 const ownerNumberLeave = "6285225416745@s.whatsapp.net";
 if (m.sender !== ownerNumberLeave) return m.reply("Hanya owner bot yang dapat menggunakan perintah ini.");
 
 if (m.isGroup) {
 await client.groupLeave(m.chat);
 console.log(chalk.black(chalk.bgYellow("[ INFO ]")), color("Bot meninggalkan grup", "yellow"), color(groupName, "green"));
 m.reply("Bot meninggalkan grup.");
 } else {
 m.reply("Perintah ini hanya bisa digunakan di dalam grup.");
 }
 break;

case "getnomor": { 
 const target = m.quoted ? m.quoted.sender : args[0];
 if (target) {
 m.reply(`Nomor Dari *${target.replace("@s.whatsapp.net", "")}*`);
 } else {
 m.reply("Maaf, tidak dapat menemukan nomor. Pastikan menyertakan pesan atau menyebutkan pengguna.");
 }
 break;
}

case 'cuaca':
 if (!args[0]) return m.reply('Silakan masukkan nama kota untuk mengetahui cuaca.');

 try {
 const cityName = args[0];
 const apiKey = '40ba538bb0c3704cda21328a9a70d270';
 const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&lang=id&units=metric`);

 const { main, weather } = response.data;
 const deskripsiCuaca = weather[0].description;

 const hasilCuaca = `Cuaca saat ini di *${cityName}*\n\n`
 + `Temperatur : *${main.temp}°C*\n`
 + `Kelembaban : *${main.humidity}%*\n`
 + `Cuaca : *${deskripsiCuaca}*`;

 m.reply(hasilCuaca);
 } catch (error) {
 console.error('Error fetching weather:', error);

 if (error.response && error.response.data) {
 console.error('OpenWeatherMap API Error:', error.response.data);
 }

 m.reply('Maaf, terjadi kesalahan saat mengambil informasi cuaca. Coba lagi nanti.');
 }
 break;
 
case "kalkulator":
case "hitung":
 if (args.length !== 3) {
 m.reply(`*Contoh :*\n${prefix + command} 50 × 50`);
 break;
 }

 const number1 = parseFloat(args[0]);
 const operator = args[1];
 const number2 = parseFloat(args[2]);
 let result;

 switch (operator) {
 case "+":
 result = number1 + number2;
 break;
 case "-":
 result = number1 - number2;
 break;
 case "×":
 result = number1 * number2;
 break;
 case "÷":
 if (number2 === 0) {
 m.reply("Tidak dapat dibagi dengan nol!");
 break;
 }
 result = number1 / number2;
 break;
 default:
 m.reply("Operator tidak valid. Gunakan +, -, ×, ÷");
 return;
 }

 m.reply(`Hasil : *${result}*`);
 break;

case "ytsearch":
case "yotubesearch":
 if (!args[0]) {
 m.reply("Silakan masukkan kata kunci untuk mencari di YouTube.");
 break;
 }

 try {
 const searchQuery = args.join(" ");
 const searchResults = await yts(searchQuery);
 
 if (searchResults.videos.length > 0) {
 const firstResult = searchResults.videos[0];
 const videoTitle = firstResult.title;
 const videoURL = firstResult.url;
 const videoDescription = firstResult.description || "_Deskripsi tidak tersedia._";

 const replyMessage = `🎥 *Hasil Pencarian YouTube "${searchQuery}"* 🎉\n\n`;
 const messageBody = `📜 *Judul :* ${videoTitle}\n📝 *Deskripsi :* ${videoDescription}\n🔗 *Link :* ${videoURL}`;

 m.reply(`${replyMessage}${messageBody}`);
 } else {
 m.reply(`Tidak dapat menemukan hasil untuk *${searchQuery}* di YouTube.`);
 }
 } catch (error) {
 console.error('Error searching YouTube:', error);
 m.reply('Maaf, terjadi kesalahan saat melakukan pencarian di YouTube. Coba lagi nanti.');
 }
 break;
 
case "githubsearch":
 if (!args[0]) {
 m.reply("Silakan masukkan nama pengguna GitHub untuk mencari.");
 break;
 }

 try {
 const githubUsername = args[0];
 const response = await axios.get(`https://api.github.com/users/${githubUsername}/repos`);
 
 if (response.data.length > 0) {
 const repositories = response.data.map(repo => {
 const repoLink = `[${repo.name}](${repo.html_url})`;
 const description = repo.description || "_Deskripsi tidak tersedia._";
 return `📌 *${repoLink}*\n${description}\n`;
 });
 
 const replyMessage = `🔍 *Repositori GitHub untuk ${githubUsername}*\n\n${repositories.join("\n")}`;
 m.reply(replyMessage);
 } else {
 m.reply(`Tidak dapat menemukan repositori untuk pengguna GitHub *${githubUsername}*.`);
 }
 } catch (error) {
 console.error('Error searching GitHub:', error);
 m.reply('Maaf, terjadi kesalahan saat melakukan pencarian di GitHub. Coba lagi nanti.');
 }
 break;
 
case "kalender":
 const tahun2023 = 2023;
 const tahun2024 = 2024;
 const jumlahHariPerBulan = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
 const hariDalamSeminggu = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

 const tampilkanKalender = (tahun) => {
 let kalender = `📅 *Kalender Tahun ${tahun}*\n\n`;

 for (let bulan = 0; bulan < 12; bulan++) {
 const namaBulan = new Date(tahun, bulan, 1).toLocaleString('id-ID', { month: 'long' });
 kalender += `\n*${namaBulan}*\n`;
 
 hariDalamSeminggu.forEach((hari) => (kalender += `*${hari}*\t`));

 const tanggalAwal = new Date(tahun, bulan, 1);
 const hariAwal = tanggalAwal.getDay();

 kalender += "\n\t".repeat(hariAwal);

 for (let tanggal = 1; tanggal <= jumlahHariPerBulan[bulan]; tanggal++) {
 kalender += `${tanggal}\t`;

 if ((hariAwal + tanggal) % 7 === 0) {
 kalender += "\n\t";
 }
 }
 kalender += "\n\n";
 }

 return kalender;
 };

 const kalender2023 = tampilkanKalender(tahun2023);
 const kalender2024 = tampilkanKalender(tahun2024);

 m.reply(`${kalender2023}\n\n${kalender2024}`);
 break;

 default: {
 if (isCmd2 && budy.toLowerCase() != undefined) {
 if (m.chat.endsWith("broadcast")) return;
 if (m.isBaileys) return;
 if (!budy.toLowerCase()) return;
 if (argsLog || (isCmd2 && !m.isGroup)) {
 // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
 console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("command", "turquoise"), color(`${prefix}${command}`, "turquoise"), color("tidak tersedia", "turquoise"));
 } else if (argsLog || (isCmd2 && m.isGroup)) {
 // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
 console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("command", "turquoise"), color(`${prefix}${command}`, "turquoise"), color("tidak tersedia", "turquoise"));
 }
 }
 }
 }
 }
 } catch (err) {
 m.reply(util.format(err));
 }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
 fs.unwatchFile(file);
 console.log(chalk.redBright(`Update ${__filename}`));
 delete require.cache[file];
 require(file);
});