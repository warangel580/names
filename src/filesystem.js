const { join: joinPath } = require("path")
const { readFileSync, writeFileSync } = require("fs")

let dataPath = (filename) => {
  return joinPath(__dirname, '..', 'data', filename);
}

let readData = function (filename) {
  console.log(`Reading ${filename} ...`);
  return readFileSync(dataPath(filename), 'utf-8')
}

let writeData = function (filename, contents) {
  console.log(`Writing ${filename} ...`);
  return writeFileSync(dataPath(filename), contents, 'utf-8')
}

module.exports = {
  readData,
  writeData,
}