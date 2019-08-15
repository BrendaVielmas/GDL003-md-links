
let fs = require("fs");
//Es directorio
const itsDirectory = (path) => {
	let resultOfDirectory = fs.lstatSync('./README.md').isDirectory()

	return resultOfDirectory;
	
};
console.log(itsDirectory());

//Es archivo
const itsFile = (path) => {
	let resultOfFile = fs.lstatSync('./README.md').isFile()

	
	console.log(itsFile());
	if (resultOfFile == true) {
		//Leer archivos
		exports.mdLinks = (path, opts) => {
	
			fs.readFile('./README.md', (err, data) => {
				if (err) throw err;
				console.log(data.toString())
			});
		}
		exports.mdLinks()
		return resultOfFile;
	} 
	
};


/*Problema W: enseñar links validados
Para resolver W necesito X: validar links
Para resolver X necesito Y: encontrar links
Para resolver Y necesito Z: leer un archivo md.
Para resolver Z necesito A: filtrar archivos md.
Para resolver A necesito B: leer directorio.
Para resolver B necesito C: que sepa si es archivo o directorio.*/

module.exports = (filePath) => {
	if (path.extname(filePath) === ".md") {
		return true;
	}
	return false;
};


// return path.extname(filePath) === ".md" ? true : false;

//module.exports =(filePath) => path.extname(filepath) === ".md" ? true : false;

//module.exports = filePath => path.extname(filepath) === ".md" ? true : false;

//module.exports = filePath => path.extname(filepath) === ".md";