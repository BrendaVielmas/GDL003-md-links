const index = require('../index.js');


describe("itsDirectory", () => {
  it("is a function", () => {
    expect(typeof index.itsDirectory).toBe("function");
  });
  it("it should be return if its directory or not", () => {
  	let filePath = "./README.md";
    index.itsDirectory(filePath).then((isDirectory)=>{
      expect(isDirectory).toBe(false)
    });
  });
});

describe("itsFile", () => {
  it("is a function", () => {
    expect (typeof index.itsFile).toBe("function");
  });
  it("it should be return if its file or not", () => {
  	let filePath = "./README.md";
    index.itsFile(filePath).then((isFile)=>{
      expect(isFile).toBe(false)
    });
  });
});

describe("readDirectory", () => {
  it("is a function", () => {
    expect (typeof index.readDirectory).toBe("function");
  });
  it("it should be return a list of files", () => {
    let filePath = "./";
    index.readDirectory(filePath).then((files)=>{
    expect(files).toEqual([".editorconfig", ".eslintrc", ".git", ".gitignore", ".prettierrc", "README.md", "coverage", "index.js", "node_modules", "package-lock.json", "package.json", "test"]);
   });
  });
});

describe("readFile", () => {
  it("is a function", () => {
    expect (typeof index.readFile).toBe("function");
  });
  it("it should be return the content of file", () => {
    let filePath = "./README.md";
    index.readFile(filePath).then((fileContent) => {
    expect(fileContent).toBe(data)
    });
  });
});


describe("itsMdFile", () => {
  it("is a function", () => {
    expect (typeof index.itsMdFile).toBe("function");
  });
  it("it should be return if its Md file or not", () => {
    let filePath = "./README.md";
    expect (index.itsMdFile(filePath)).toBe(true)
  });
});

describe("readMdFile", () => {
  it("is a function", () => {
    expect (typeof index.readMdFile).toBe("function");
  });
  it("it should be return the content of Md file", () => {
    let filePath = "./README.md";
    index.readMdFile(filePath).then((fileContent) => {
      expect(fileContent).toBe(data)
    });
  });
});
describe("readMdFiles", () => {
  it("is a function", () => {
    expect (typeof index.readMdFiles).toBe("function");
  });
  it("it should be return the content of Md files", () => {
    let filePaths = "./README.md";
    index.readMdFiles(filePaths).then((filesContent) => {
      expect(filesContent).toBe(data)
    });
  });
});

describe("findLinksData", () => {
  it("is a function", () => {
    expect (typeof index.findLinksData).toBe("function");
  });
  it("it should be return the links of data", () => {
  	let fileContent = "./README.md";
    expect(index.findLinksData(fileContent)).toEqual([]);
  });
});

describe("findLinksFiles", () => {
  it("is a function", () => {
    expect (typeof index.findLinksFiles).toBe("function");
  });
  it("it should be return the links of datas", () => {
  	let filesContent = "./README.md";
    expect(index.findLinksFiles(filesContent)).toEqual([]);
  });
});

describe("statusOfLink", () => {
  it("is a function", () => {
    expect (typeof index.statusOfLink).toBe("function");
  });
  it("it should be return the status of links", () => {
    let links = findLinksData(filePath);
    index.statusOfLink(links).then((arrLinksWithStatus) => {
    expect(arrLinksWithStatus).toBe(data)
    });
  });
});

/*
mdlinks
*/