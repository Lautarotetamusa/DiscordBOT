const funciones = require("../funciones.js");
const search    = require('youtube-search'); //Youtube search api
const buscar 	  = require('./buscar.js');
const ver 			= require('./ver.js');

module.exports = async function (message, args, servers){

	var cant = parseInt(args[0]);

	if(!cant){
		cant = 1;
	}

	for(var i = 0; i < cant; i++){
		var s = await funciones.buscar("PREVIA Y CACHENGUE");
		var title = s.title;

		title = title.split("#");
		var last = title[1].split(" ", 1);
		last = parseInt(last[0]);

		var rnd = Math.floor(Math.random() * last) + 1;

		var q = "PREVIA Y CACHENGUE #" + rnd;

		ver(message, q, servers);
	}
};
