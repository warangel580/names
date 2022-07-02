const { parseJson } = require("@warangel580/utils")
const { readData, writeData } = require("./filesystem");
const { list } = require("./computing");
const { arg } = require("./utils");

let data = parseJson(readData('transformed.json'));

// list [sortBy=gender_spectrum|popularity_spectrum|popularity|gender_popularity|gender] [minUsage] [maxUsage]
let result = list(data, arg(2), arg(3), arg(4))

writeData('list.txt', result);

