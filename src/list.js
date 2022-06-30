const { parseJson, get } = require("@warangel580/utils")
const { readData, writeData } = require("./filesystem");
const { list } = require("./computing");

let data = parseJson(readData('transformed.json'));

// list [year] [sortBy=gender|popularity]
let year   = process.argv[2]
let sortBy = process.argv[3]

if (year == '_')   year   = undefined;
if (sortBy == '_') sortBy = undefined;

let result = list(data, year, sortBy)

writeData('list.txt', result);

