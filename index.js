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
//encontrar links con nombre
const findLinksData = (fileContent) => {
	let linkRegExp = /\[(.+)\]\((\S+)\)/gim; 
	let matches = fileContent.matchAll(linkRegExp);
	let links = Array.from(matches, match => { 
		return match[2];
	});
	return links;
};

//prueba
/*readMdFile('./README.md')
.then((fileContent)=>{
	console.log(findLinksData(fileContent))
})*/

const statusOfLink = (links) => {
	let arrObj = [];
	links.forEach((url) => {
		arrObj.push({"href" : url})
	})
	for  (let i = 0; i < arrObj.length; i++) {
		fetch(arrObj[i].href).then((response) => {
			let statusUnique =
			let statusBroken =
			let statusTotal = arrObj.length
				console.log(arrObj[i].href+ ' status: '+ response.status)
		});
	}	
};
//prueba
readMdFile('./README.md')
.then((data) =>{
 let links = findLinksData(data)
statusOfLink(links)
});




// Caso 1 .- Ruta relativa sin options
/*const mdLinks = (filePath, options) => {
	if (itsDirectory(filePath)) {
		let promise = readDirectory(filePath)
			.then((files) => {
				let promise = readMdFile(filePath)
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
			})
		return promise
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
		.then((url) => {
			fetch(url)
			.then((res) => {
				return res.status
			})
			.then((status) => {
				return [url, status];
			})
			.then((arr) =>{
				console.log(arr[0]+ " " + arr[1]);
			});
		});
	};
}
	mdLinks('./README.md')
	.then((links)=>{
		console.log(links);
	});

*/

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