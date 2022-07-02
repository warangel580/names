const { readData, writeData } = require("./filesystem")
const { parse } = require("./computing");
const { arg } = require("./utils");

let data = readData('names.csv');

console.log(`Parsing ${data.length} lines ...`);

// parse [minYear] [maxYear]
let stats = parse(data, arg(2), arg(3));

console.log(`> ${Object.keys(stats.names).length} names`);

writeData('parsed.json', JSON.stringify(stats, null, 2));
