
let fs = require("fs");
let fsPromises = require("fs").promises;
let path = require("path");
const fetch = require("node-fetch");
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
	return fs.readFileSync(filePath).toString();
};
const readFilePromise = (filePath) => {
	return fsPromises.readFile(filePath)
	.then ((content) => {
		return content.toString()
	});
};
//console.log(readFile('./README.md'));

//Ver si es .md
const itsMdFile = (filePath) => {
	return path.extname(filePath) === ".md";
};

//console.log(itsMdFile('./README.md'));

//Leer archivo MD
const readMdFile = (filePath) => {
	if (itsMdFile(filePath)) {
		return readFilePromise(filePath);
	}else {
		return "";
	}
}

//console.log(readMdFile('./README.md'));

//encontrar links con nombre
const findLinksData = (fileContent) => {
	let linkRegExp = /\[(.+)\]\((\S+)\)/gim; 
	let matches = fileContent.matchAll(linkRegExp);
	let links = Array.from(matches, match => { 
	//	return {"name": match[1], "link": match[2]}
		return match[2];
	});
	return links;
}

//console.log(findLinksData(readMdFile('./README.md')));


// Caso 1 .- Ruta relativa sin options
const mdLinks = (filePath, options) => {
		if (itsDirectory(filePath)) {
			return readDirectory(filePath)
			.then((filePath) => {
				return readMdFile(filePath)
				.then((fileContent) => {
					return findLinksData(fileContent)
				})
				.then((links) => {
					let arrObj = [];
				links.forEach((url) => {
					arrObj.push({"href" : url})
				})
				return arrObj;
			})
		});
		} else if (itsFile(filePath)) {
			return readMdFile(filePath)
			.then((fileContent) => {
				return findLinksData(fileContent)
			})
			.then((links) => {
				let arrObj = [];
				links.forEach((url) => {
					arrObj.push({"href" : url})
				})
				return arrObj;
			})
		}
};

mdLinks('./README.md');

/*links.forEach((url) => {
	})
fetch(url)
   		.then((res) => {
   			return res.status
   		})
   		.then((status) => {
   			return [url, status];
  	 	})
  	 	.then((arr) =>{
  	 		console.log(arr[0]+ " " + arr[1]);
  	 	})*/
/*
mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
    console.log("basico")
    console.log(links)
  })
  .catch(console.error);
// Caso  .- Ruta relativa con option (validate)
mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
    console.log("validate true")
    console.log(links)
  })
  .catch(console.error);

// Caso 3 .- Ruta relativa de un directorio sin options
mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }]
    console.log("dir")
    console.log(links)
  })
  .catch(console.error); */
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
