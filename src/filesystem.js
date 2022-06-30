const { join: joinPath } = require("path")
const { readFileSync, writeFileSync } = require("fs")

let readData = function (filename) {
  console.log(`Reading ${filename} ...`);
  return readFileSync(joinPath(__dirname, '..', 'data', filename), 'utf-8')
}

let writeData = function (filename, contents) {
  console.log(`Writing ${filename} ...`);
  return writeFileSync(joinPath(__dirname, '..', 'data', filename), contents, 'utf-8')
}

module.exports = {
  readData,
  writeData,
}