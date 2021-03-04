const funciones = require('../funciones.js');

module.exports = function(message, argumentos, servers){
	var server = servers[message.guild.id];

	server.queue.shift();															//pasamos de cancion

	if(server.queue[0]){															//si la cola tiene algo
		if(!message.guild.voiceConnection){
			message.member.voice.channel.join().then(function (connection) {
						funciones.play(connection, server);			//reproducimos el siguiente
				});
		}
	}
	else{
		message.channel.send("No quedan mas caciones");
		server.distpatcher.end();
	}
};
