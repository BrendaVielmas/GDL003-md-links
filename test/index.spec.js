require('../index.js');

describe('index', () => {

  it('debería ser un objeto', () => {
    expect(typeof index).toEqual('object');
  });
});
/*
describe("itsDirectory", () => {
  it("is a function", () => {
    expect(typeof itsDirectory).toBe("function");
  });
  it("it should be return if its directory or not", () => {
  	let filePath = "./README.md";
    expect(itsDirectory(filePath)).toBe(false);
  });
});

describe("itsFile", () => {
  it("is a function", () => {
    expect (typeof itsFile).toBe("function");
  });
  it("it should be return if its file or not", () => {
  	let filePath = "./README.md";
    expect(itsFile(filePath)).toBe(true);
  });
});

describe("readDirectory", () => {
  it("is a function", () => {
    expect (typeof readDirectory).toBe("function");
  });
  it("it should be return a list of files", () => {
  	let filePath = "./";
    expect(readDirectory(filePath)).toEqual([".editorconfig", ".eslintrc", ".git", ".gitignore", ".prettierrc", "coverage", "index.js", "node_modules", "package-lock.json", "package.json", "README.md", "src", "test"]);
  });
});

describe("readFilePromise", () => {
  it("is a function", () => {
    expect (typeof index.readFilePromise).toBe("function");
  });
  it("it should be return the content of file", () => {
  	let filePath = "./README.md";
    expect(index.readFilePromise(filePath)).toBe();
  });
});

describe("itsMdFile", () => {
  it("is a function", () => {
    expect (typeof itsMdFile).toBe("function");
  });
  it("it should be return if its Md file or not", () => {
  	let filePath = "./README.md";
    expect(itsMdFile(filePath)).toBe(true);
  });
});

describe("findLinksData", () => {
  it("is a function", () => {
    expect (typeof findLinksData).toBe("function");
  });
  it("it should be return the links of data", () => {
  	let fileContent = "./README.md";
    expect(findLinksData(fileContent)).toEqual([]);
  });
});
*/