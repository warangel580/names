const { parseJson } = require("@warangel580/utils")
const { readData, writeData } = require("./filesystem");
const { history } = require("./computing");
const { arg } = require("./utils");

let name = arg(2);

if (! name) {
  console.error(`Usage: history <name>`);
  console.error(`Exemple: history "MARIE-ANTOINE"`);
  return;
}

let data = parseJson(readData('stats.json'));

name = name.toUpperCase();

console.log(`Historique du prénom ${name}`)

// history <name>
let result = history(data, name);

writeData('history.txt', result);