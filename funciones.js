const { MessageEmbed } = require('discord.js');
const search = require('youtube-search'); //Youtube search api
const ytdl = require('ytdl-core'); // youtube API
//npm install discordjs/discord.js discordjs/Commando ffmpeg-static node-opus simple-youtube-api ytdl-core

const API_KEY  = "AIzaSyCKkEtIQDL8e7UlnE1sp_Gu_F02cm127t8";
const msgColor = 0xff0000;

function createMessage(str){
	const embed = new MessageEmbed()
		.setColor(msgColor)
		.setDescription(str);
	return embed;
}

async function buscar(args){
		var opts = {
		  maxResults: 1,
		  key: API_KEY,
			q: args
		};

	var s = await search(args, opts);
	return s.results[0];
}

function play(connection, server){

	const stream = ytdl(server.queue[0].url, { filter : 'audioonly' });
	server.distpatcher = connection.play(stream);

	server.distpatcher.on("finish", finish => {

		console.log("Video terminado");

		server.queue.shift();

		if(server.queue[0]){
			play(connection, server);
		}
		else{
			server.queue = [];
			connection.disconnect();
			console.log("desconectado");
		}
	});
}

module.exports = {createMessage, buscar, play};
