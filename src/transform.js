const { parseJson, } = require("@warangel580/utils")
const { readData, writeData } = require("./filesystem")
const { transform } = require("./computing");

let data = parseJson(readData('parsed.json'));

data = transform(data);

writeData('transformed.json', JSON.stringify(data, null, 2));

