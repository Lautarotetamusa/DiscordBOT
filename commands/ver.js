const funciones = require('../funciones.js');

module.exports = async function (message, argumentos, servers){
	if(!argumentos){
		message.channel.send("si no pones nada no se que queres ver pa");
		return;
	}

	if(!message.member.voice.channel){
		message.channel.send("metete a un canal negrazo");
		return;
	}

	if(!servers[message.guild.id]) servers[message.guild.id] = {
		queue : []
	}

	var server = servers[message.guild.id];

	var s = await funciones.buscar(argumentos);

	let queueElement = {url : s.link, title : s.title};

	message.channel.send("Pusiste "+s.link+" :sunglasses:");

	server.queue.push(queueElement);					//metemos el video en la lista

	//if(server.queue.length <= 1){							//solo llamamos a play() con el primero
		if(!message.guild.voiceConnection){
			message.member.voice.channel.join().then(function (connection) {
						console.log("BOT conectado al canal");
						funciones.play(connection, server);
				});
		}
	//}
};
