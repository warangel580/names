const { readData, writeData } = require("./filesystem")
const { parse } = require("./computing");

let data = readData('names.csv');

console.log(`Parsing ${data.length} lines ...`);

// parse [minYear] [maxYear]
let minYear = process.argv[2]
let maxYear = process.argv[3]

if (minYear == '_') minYear = undefined;
if (maxYear == '_') maxYear = undefined;

let stats = parse(data, minYear, maxYear);

console.log(`> ${Object.keys(stats.names).length} names`);

writeData('parsed.json', JSON.stringify(stats, null, 2));
