const search 	  = require('youtube-search'); //Youtube search api
const funciones = require('../funciones.js');
const API_KEY   = "AIzaSyCKkEtIQDL8e7UlnE1sp_Gu_F02cm127t8";

module.exports = async function (message, args){

	args = args.split('$');
	var busqueda   = args[0];
	var maxResults = parseInt(args[1]);

	if(!maxResults){
		maxResults = 1;
	}

	console.log("Buscando ", busqueda, maxResults);

		var opts = {
		  maxResults: maxResults,
		  key: API_KEY,
			q: busqueda
		};

	var s = await search(busqueda, opts);

	if(!s){
		message.channel.send("no se encontraron resultados");
		return;
	}

	var str = "";
	for(var i = 0; i < s.results.length; i++){
		str += ":eyes:  " + s.results[i].title + "\n" +s.results[i].link + "\n\n";
	}

	const embed = funciones.createMessage(str);
	message.channel.send(embed);
};
