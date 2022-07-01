const { parseJson, get } = require("@warangel580/utils")
const { readData, writeData } = require("./filesystem");
const { list } = require("./computing");

let data = parseJson(readData('transformed.json'));

// list [sortBy=gender|popularity]
let sortBy = process.argv[2]

if (sortBy == '_') sortBy = undefined;

let result = list(data, sortBy)

writeData('list.txt', result);

