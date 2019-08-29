const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
//const matchAll = require("match-all");
//Es directorio
const itsDirectory = (filePath) => {
	let directoryPromise = new Promise ((resolve, reject)=> {
		fs.lstat(filePath, (err, stats)=> {
			if (err) {
				reject(err)
				return 
			}
			resolve (stats.isDirectory())
		})
	})
	return directoryPromise
};
//prueba
/*itsDirectory("./README.md")
	.then((isDirectory)=> {
		if (isDirectory) {
			console.log("ok")
		} else {
			console.log("not ok")
		}
	})*/

//Es archivo
const itsFile = (filePath) => {
	return new Promise((resolve, reject) => {
		fs.lstat(filePath, (err, stats) =>{
			if (err) {
				reject(err);
				return
			}
			resolve(stats.isFile());
		})
	})
	
	return resultOfFile;
};
//prueba
/*itsFile("./README.md")
	.then((isFile) => {
		if (isFile) {
			console.log("it is")
		} else {
			console.log("its not")
		}
	})*/

//Leer directorio
const readDirectory = (filePath) => {
	return new Promise((resolve, reject) => {
		fs.readdir(filePath, (err, files) => {
			if (err) {
				reject(err);
				return
			}
			resolve(files);
		})
	})
};
//prueba
/*readDirectory("./")
	.then((files) => {
			console.log(files)
	})*/


//Leer archivo
const readFile = (filePath) => {
	return new Promise ((resolve, reject) => {
		fs.readFile(filePath, "utf8", (err, data) => {
			if (err) {
				reject(err);
				return
			}
			resolve(data);
		})
	})
};
//prueba
/*readFile("./README.md")
	.then((data) => {
		console.log(data)
	})*/

//Ver si es .md
const itsMdFile = (filePath) => {
	return path.extname(filePath) === ".md";
};
//prueba
//console.log(itsMdFile('./README.md'));

//Leer archivo MD
const readMdFile = (filePath) => {
	return new Promise ((resolve, reject) => {
		if (itsMdFile(filePath)) {
			resolve(readFile(filePath));
		}else {
			resolve("");
		}
	})
};
//prueba
/*readMdFile('./README.md')
	.then((data) => {console.log(data)});
*/
// ["./README1.md","./README2.md","./README3.md"]
const readMdFiles = (filePaths) => {
	return new Promise((resolve, reject) =>{
		let arrPromise = [];
		for (let i = 0; i < filePaths.length; i++) {
			let promise = readMdFile(filePaths[i])
			arrPromise.push(promise)
		}	
		resolve (Promise.all(arrPromise))
	})
	
};

//encontrar links con nombre
const findLinksData = (fileContent) => {
	let linkRegExp = /\[(.+)\]\((\S+)\)/gim; 
	let matches = fileContent.matchAll(linkRegExp);
	let links = Array.from(matches, match => { 
		return {"text": match[1], "href": match[2]};
	});
	return links;
};

//prueba
/*readMdFile('./README.md')
.then((fileContent)=>{
	console.log(findLinksData(fileContent))
})*/

const findLinksFiles = (filesContent) => {
	let linkRegExp = /\[(.+)\]\((\S+)\)/gim; 
	let arrLinks = [];
	for (let i = 0; i < filesContent.length; i++) {
		let links = findLinksData(filesContent[i])
		arrLinks = arrLinks.concat(links)
	}
	return arrLinks;
};
//prueba
/*readDirectory("./")
.then((files)=>{
	console.log(files)
return readMdFiles(files)
})
.then((filesContent)=>{
	console.log(filesContent)
	return findLinksFiles(filesContent)
}) 
.then((links)=>{
	console.log(links)
})*/

const statusOfLink = (links) => {
	return new Promise((resolve, reject) =>{
		let arrPromise = [];
		for (let i = 0; i < links.length; i++) {
			let promise = fetch(links[i].href).then((response) => {
				return {
					"text" : links[i].text, 
					"href" : links[i].href, 
					"status" : response.status,
					//"file" : path.basename(links)
				}
			});
			arrPromise.push(promise)
		}	
		resolve (Promise.all(arrPromise))
	})
};

//prueba
readMdFile('./README.md')
	.then((fileContent) =>{
		let links = findLinksData(fileContent)
		return statusOfLink(links)
	})
	.then((linksProperties) =>{
		console.log(linksProperties)
	})


const mdLinks = (filePath, options) => {
	return itsDirectory(filePath)
		.then((responseYesOrNot)=>{
			if (responseYesOrNot === true) {
				return readDirectory(filePath)
					.then((files)=>{
						return readMdFiles(files)
					})
					.then((filesContent)=>{
						return findLinksFiles(filesContent)
					}) 
			}else {
				return itsFile(filePath)
					.then((responseYesOrNot)=>{
						if (responseYesOrNot === true) {
							return readMdFile(filePath)
								.then((fileContent) =>{
									if (options && options.validate === true) {
										let links = findLinksData(fileContent)
										return statusOfLink(links)
									} else {
										let links = findLinksData(fileContent)
										return links
									}
								})
						}
					})
			}
		})
}

module.exports = {
	itsDirectory : itsDirectory,
	itsFile : itsFile,
	readDirectory : readDirectory,
	readFile : readFile,
	itsMdFile : itsMdFile,
	readMdFile : readMdFile,
	readMdFiles : readMdFiles,
	findLinksData : findLinksData,
	findLinksFiles : findLinksFiles,
	statusOfLink : statusOfLink,
	mdLinks: mdLinks
}

// Caso 1 .- Ruta relativa sin options
/*mdLinks("./README.md")
  .then(links => {
    // => [{ href, text, file }]
    console.log("basico")
    console.log(links)
  })
  .catch(console.error);*/
 // Caso 2 .- Ruta relativa con option (validate)
/*mdLinks("./README.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
    console.log("validate true")
    console.log(links)
  })
  .catch(console.error);
// Caso 3 .- Ruta relativa de un directorio sin options
mdLinks("./")
  .then(links => {
    // => [{ href, text, file }]
    console.log("dir")
    console.log(links)
  })
  .catch(console.error); */