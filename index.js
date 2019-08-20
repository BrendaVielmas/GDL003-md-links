
let fs = require("fs");
let path = require("path");

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
	let linkRegExp = /\[(\S+)\]\((\S+)\)/gim; 
	//let linkRegExp = /https?:\S+\w/gim;
	let matches = fileContent.matchAll(linkRegExp);
	let links = Array.from(matches, match => { 
		return {"name": match[1], "link": match[2]}
	});
	return links;
}

//console.log(findLinksData(readMdFile('./README.md')));

const links = () => { 
	let linkArray = findLinksData(readMdFile('./README.md'));
	for (let i = 0; i < linkArray.length; i++) {
		console.log(linkArray[i].link);
	};
	return linkArray;
};

console.log(links())

/*const saveLinks = () => {
	let save = links();
	for (let i = 0; i < save.length; i++) {
		console.log(save[i].link);
	};
	return save;
};

console.log(saveLinks())*/

//validar link
const linkOk = (url, status) => {
	console.log(url + " was found, status" + status);
}
const linkNotOk = (url, status) => {
	console.log(url + " was not found, status" + status);
}
const test = (url) => {
	let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			linkOk(url, xhttp.status);
		} else if (xhttp.readyState == 4 && xhttp.status != 200) {
			linkNotOk(url, xhttp.status);
		}
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
//test(saveLinks());


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
	}return false;
};
*/
// return path.extname(filePath) === ".md" ? true : false;
//module.exports =(filePath) => path.extname(filepath) === ".md" ? true : false;
//module.exports = filePath => path.extname(filepath) === ".md" ? true : false;
//module.exports = filePath => path.extname(filepath) === ".md";
