const { readData, writeData } = require("./filesystem")
const { parse } = require("./computing");

let data = readData('names.csv');

console.log(`Parsing ${data.length} lines ...`);

let stats = parse(data);

console.log(`> ${Object.keys(stats.names).length} names`);

writeData('parsed.json', JSON.stringify(stats, null, 2));
