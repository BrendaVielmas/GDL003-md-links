
let fs = require("fs");
let path = require("path");

//Es directorio
const itsDirectory = (filePath) => {
	let resultOfDirectory = fs.lstatSync(filePath).isDirectory()
	return resultOfDirectory;	
};

//console.log(itsDirectory('./README.md'));

//Es archivo
const itsFile = (filePath) => {
	let resultOfFile = fs.lstatSync(filePath).isFile()
	return resultOfFile;
};

//console.log(itsFile('./README.md'));

//Leer directorio
const readDirectory = (filePath) => {
	let listOfFiles = fs.readdirSync(filePath)
	return listOfFiles;
};

//console.log(readDirectory('./'));

//Leer archivo
const readFile = (filePath) => {
	let showFile = fs.readFileSync(filePath)
	return showFile.toString();
};

//console.log(readFile('./README.md'));

//Ver si es .md
const itsMdFile = (filePath) => {
	if (path.extname(filePath) === ".md") {
		return true;
	}
	return false;
};

//console.log(itsMdFile('./README.md'));

//Leer archivo MD
const readMdFile = (filePath) => {
	if (itsMdFile(filePath)) {
		return readFile(filePath);
	}else {
		return "";
	}
}

//console.log(readMdFile('./README.md'));

//encontrar links con nombre
const findLinksData = (fileContent) => {
	let linkRegExp = /\[(.*)\]\((.*)\)/gim; 
	let matches = fileContent.matchAll(linkRegExp);
	let links = Array.from(matches, match => { 
		return {"name": match[1], "link": match[2]}
	});
	return links;
}

console.log(findLinksData(readMdFile('./README.md')));


//encontrar nombre de link
const nameLinks = (fileContent) => {
	let matches = fileContent.matchAll(linkRegExp);
	let links = Array.from(matches, match => match[1]);
	return linksName;
}

//console.log(nameLinks(readMdFile('./README.md')));

/*Problema W: enseñar links validados
Para resolver W necesito X: validar links
Para resolver X necesito Y: encontrar links
Para resolver Y necesito Z: leer un archivo md.
Para resolver Z necesito A: filtrar archivos md.
Para resolver A necesito B: leer directorio.
Para resolver B necesito C: que sepa si es archivo o directorio.*/

/*module.exports = (filePath) => {
	if (path.extname(filePath) === ".md") {
		return true;
	}
	return false;
};
*/
// return path.extname(filePath) === ".md" ? true : false;
//module.exports =(filePath) => path.extname(filepath) === ".md" ? true : false;
//module.exports = filePath => path.extname(filepath) === ".md" ? true : false;
//module.exports = filePath => path.extname(filepath) === ".md";


