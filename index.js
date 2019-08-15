
let fs = require("fs");

exports.mdLinks = (path, opts) => {
	
	fs.readFile('./README.md', (err, data) => {
		if (err) throw err;
		console.log(data.toString())
	});
}

exports.printMsg()