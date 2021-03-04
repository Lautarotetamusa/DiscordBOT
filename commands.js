const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core'); // youtube API
//npm install discordjs/discord.js discordjs/Commando ffmpeg-static node-opus simple-youtube-api ytdl-core
const ver    = require("./commands/ver.js");
const pasar  = require("./commands/pasar.js");
const buscar = require("./commands/buscar.js");
const ferpa  = require("./commands/ferpa.js");
const funciones = require('./funciones.js');

const commands = { ver, pasar, lista, buscar, mezclar, desconectar, hola, ferpa };

let servers = {};

module.exports = async function (message){

	var splited = message.content.split(' ');

  var command    = splited[0].toLowerCase();;
  var argumentos = "";

	for(var i = 1; i < splited.length; i++){
		argumentos += " " + splited[i];
	}
	argumentos = argumentos.substr(1);	//sacamos el espacio del principio

	if(command[0] != '$') return;

	command = command.substr(1);

	commands[command](message, argumentos, servers);
};

function hola(message){
  var channelID = message.member.voice.channelID;

  if( channelID != null ){
    const embed = funciones.createMessage("Hola idiotas!");
    message.channel.send(embed);

    const channel = message.author.client.channels.cache.get(channelID);
    if (!channel) return console.error("El canal no existe!");

      channel.join().then(connection => {
            console.log("Hola diotas");
            const distpatcher = connection.play('./media/holaIdiota.mp3', { volume: 0.8 });

            distpatcher.on("finish", function() {
              channel.leave();
            });
        })
  }
  else{
    embed = funciones.createMessage("Conectate a un canal, negro");
    message.channel.send(embed);
  }
}

function lista(message) {
	var server = servers[message.guild.id];
  var str = "--------- :musical_keyboard: Lista de reproduccion :musical_keyboard: ---------\n\n";

  for(var i = 0; i < server.queue.length; ++i){
    var title = server.queue[i].title;
    str += `${i + 1}. ${title}\n\n`;
  }

	embed = funciones.createMessage(str);
  var msg = message.channel.send(embed);
}

function mezclar(message){

	var server = servers[message.guild.id];
	var arr = server.queue;

	var i, j, temp;
	for (i = arr.length - 1; i > 1; i--) {
			j = Math.floor(Math.random() * (i + 1));
			temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
	}
	lista(message);
}

function desconectar(message){
	message.guild.voiceConnection.disconnect();
	message.channel.send("adios idiotas");
}
