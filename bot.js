//https://discord.com/oauth2/authorize?client_id=787316492080906250&permissions=8&scope=bot

const TOKEN = "Nzg3MzE2NDkyMDgwOTA2MjUw.X9TLnw.Pary5FZQ02oDUrFEwGMBHTdc_48";

const { Client, MessageEmbed, MessageAttachmen} =
			require('discord.js');


const client = new Client();

client.login(TOKEN);

client.on('ready', () => {
	console.log("BOT iniciado");
});

const commandHandler = require("./commands.js");

client.on('message', commandHandler);
