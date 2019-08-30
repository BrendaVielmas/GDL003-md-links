const index = require('../index.js');

describe("itsDirectory", () => {
  it("is a function", () => {
    expect(typeof index.itsDirectory).toBe("function");
  });
  it("it should be return if its directory or not", () => {
    expect.assertions(1);
  	let filePath = "./fixtures/README.md";
    return index.itsDirectory(filePath).then((isDirectory)=>{
      expect(isDirectory).toBe(false);
    });
  }); 
});

describe("itsFile", () => {
  it("is a function", () => {
    expect (typeof index.itsFile).toBe("function");
  });
  it("it should be return if its file or not", () => {
  	expect.assertions(1);
    let filePath = "./fixtures/README.md";
    return index.itsFile(filePath).then((isFile)=>{
      expect(isFile).toBe(true)
    });
  });
});

describe("readDirectory", () => {
  it("is a function", () => {
    expect (typeof index.readDirectory).toBe("function");
  });
  it("it should be return a list of files", () => {
    expect.assertions(1);
    let filePath = "./fixtures";
    return index.readDirectory(filePath).then((files)=>{
      expect(files).toEqual(["README.md", "README2.md", "README3.md", "index.html", "index.js"]);
   });
  });
});

describe("readFile", () => {
  it("is a function", () => {
    expect (typeof index.readFile).toBe("function");
  });
  it("it should be return the content of file", () => {
    expect.assertions(1);
    let filePath = "./fixtures/index.js";
    return index.readFile(filePath).then((fileContent) => {
      expect(fileContent).toBe('console.log("hola");')
    });
  });
});

describe("itsMdFile", () => {
  it("is a function", () => {
    expect (typeof index.itsMdFile).toBe("function");
  });
  it("it should be return if its Md file or not", () => {
    let filePath = "./fixtures/README.md";
    expect (index.itsMdFile(filePath)).toBe(true)
  });
});

describe("readMdFile", () => {
  it("is a function", () => {
    expect (typeof index.readMdFile).toBe("function");
  });
  it("it should be return the content of Md file", () => {
    expect.assertions(1);
    let filePath = "./fixtures/README3.md";
    return index.readMdFile(filePath).then((fileContent) => {
      expect(fileContent).toEqual({"content": "Hola README", "file": "./fixtures/README3.md"})
    });
  });
});
describe("readMdFiles", () => {
  it("is a function", () => {
    expect (typeof index.readMdFiles).toBe("function");
  });
  it("it should be return the content of Md files", () => {
    expect.assertions(1);
    let filePaths = ["./fixtures/index.js", "./fixtures/README3.md"];
    return index.readMdFiles(filePaths).then((filesContent) => {
      expect(filesContent).toEqual([{"content": "", "file": "./fixtures/index.js"}, {"content": "Hola README", "file": "./fixtures/README3.md"}])
    });
  });
});

describe("findLinksData", () => {
  it("is a function", () => {
    expect (typeof index.findLinksData).toBe("function");
  });
  it("it should be return the links of data", () => {
    expect.assertions(1);
    let filePath = "./fixtures/README.md";
    return index.readMdFile(filePath).then((fileContent) => {
      expect(index.findLinksData(fileContent)).toEqual([
        {"file": "./fixtures/README.md", "href": "https://nodejs.org/es/", "text": "Node.js"},
        {"file": "./fixtures/README.md", "href": "https://en.wikipedia.org/wiki/Parsing", "text": "Parsing"},
        {"file": "./fixtures/README.md", "href": "https://semver.org/", "text": "semver"}]);
    });
  });
});


describe("findLinksFiles", () => {
  it("is a function", () => {
    expect (typeof index.findLinksFiles).toBe("function");
  });
  it("it should be return the links of datas", () => {
    expect.assertions(1);
    let filesContent = ["./fixtures/README2.md", "./fixtures/README.md"];
    return index.readMdFiles(filesContent).then((filesContent) => {
      expect(index.findLinksFiles(filesContent)).toEqual([
        {"file": "./fixtures/README2.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"},
        {"file": "./fixtures/README2.md", "href": "https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg", "text": "md-links"},
        {"file": "./fixtures/README2.md", "href": "https://nodejs.org/es/", "text": "Node.js"},
        {"file": "./fixtures/README2.md", "href": "https://developers.google.com/v8/", "text": "motor de JavaScript V8 de Chrome"},
        {"file": "./fixtures/README.md", "href": "https://nodejs.org/es/", "text": "Node.js"},
        {"file": "./fixtures/README.md", "href": "https://en.wikipedia.org/wiki/Parsing", "text": "Parsing"},
        {"file": "./fixtures/README.md", "href": "https://semver.org/", "text": "semver"}]);
     });
  });
});

describe("statusOfLink", () => {
  it("is a function", () => {
    expect (typeof index.statusOfLink).toBe("function");
  });
  it("it should be return the status of links", () => {
    expect.assertions(1);
    let links = [
      {"href": "https://en.wikipedia.org/wiki/Parsing", "text": "Parsing"}, 
      {"href": "https://semver.org/", "text": "semver"}
    ]
    return index.statusOfLink(links).then((linksStatus) => {
      expect(linksStatus).toEqual([
        {"href": "https://en.wikipedia.org/wiki/Parsing", "status" : 200, "text": "Parsing"}, 
        {"href": "https://semver.org/", "status" : 200, "text": "semver"}
      ])
    });
  }); 
});

describe("countLinks", () => {
  it("is a function", () => {
    expect (typeof index.countLinks).toBe("function");
  });
  it("it should be return the total, broken and unique links", () => {
   let links = [
      {"href": "https://en.wikipedia.org/wiki/Parsing", "status" : 200, "text": "Parsing"}, 
      {"href": "https://semver.org/", "status" : 200, "text": "semver"},
      {"href": "https://semver.org/", "status" : 200, "text": "semver"},
      {"href": "https://nodejs.org/es/", "status" : 404, "text": "Node.js"}
    ]
    expect (index.countLinks(links, true)).toEqual({"total" : 4, "unique" : 3, "broken" : 1})
  });
});

describe("mdLinks", () => {
  it("is a function", () => {
    expect (typeof index.mdLinks).toBe("function");
  });
  it("it should be return an array of links", () => {
    expect.assertions(1);
    let filePath = "./fixtures/README.md";
    return index.mdLinks(filePath).then((links) => {
      expect (links).toEqual([
        {"file": "./fixtures/README.md", "href": "https://nodejs.org/es/", "text": "Node.js"},
        {"file": "./fixtures/README.md", "href": "https://en.wikipedia.org/wiki/Parsing", "text": "Parsing"},
        {"file": "./fixtures/README.md", "href": "https://semver.org/", "text": "semver"}])
    });
  });
  it("it should be return an array of links with validate or not", () => {
    expect.assertions(1);
    let filePath = "./fixtures/README.md";
    return index.mdLinks(filePath, {validate: true}).then((links) => {
      expect (links).toEqual([
        {"file": "./fixtures/README.md", "href": "https://nodejs.org/es/", "status" : 200, "text": "Node.js"}, 
        {"file": "./fixtures/README.md", "href": "https://en.wikipedia.org/wiki/Parsing", "status" : 200, "text": "Parsing"}, 
        {"file": "./fixtures/README.md", "href": "https://semver.org/", "status" : 200, "text": "semver"}
      ])
    });
  });
  it("it should be return an array of links from directory's files", () => {
    expect.assertions(1);
    let filePath = "./fixtures";
    return index.mdLinks(filePath).then((links) => {
      expect (links).toEqual([
        {"file": "./fixtures/README.md", "href": "https://nodejs.org/es/", "text": "Node.js"},
        {"file": "./fixtures/README.md", "href": "https://en.wikipedia.org/wiki/Parsing", "text": "Parsing"},
        {"file": "./fixtures/README.md", "href": "https://semver.org/", "text": "semver"},
        {"file": "./fixtures/README2.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"},
        {"file": "./fixtures/README2.md", "href": "https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg", "text": "md-links"},
        {"file": "./fixtures/README2.md", "href": "https://nodejs.org/es/", "text": "Node.js"},
        {"file": "./fixtures/README2.md", "href": "https://developers.google.com/v8/", "text": "motor de JavaScript V8 de Chrome"}])
    });
  });
  it("it should be return the acum of links stats in a file", () => {
    expect.assertions(1);
    let filePath = "./fixtures/README2.md";
    return index.mdLinks(filePath, {stats : true}).then((links) => {
      expect (links).toEqual({total: 4, unique: 4})
    });
  });

  it("it should be return the acum of links stats in a directory", () => {
    expect.assertions(1);
    let filePath = "./fixtures";
    return index.mdLinks(filePath, {stats : true}).then((links) => {
      expect (links).toEqual({total: 7, unique: 6})
    });
  });
});