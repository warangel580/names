const { parseJson } = require("@warangel580/utils")
const { readData, writeData } = require("./filesystem");
const { list } = require("./computing");

let data = parseJson(readData('transformed.json'));

// list [sortBy=gender_spectrum|popularity_spectrum|popularity|gender_popularity|gender] [minUsage] [maxUsage]
let sortBy   = process.argv[2]
let minUsage = process.argv[3]
let maxUsage = process.argv[4]

if (sortBy == '_')   sortBy = undefined;
if (minUsage == '_') minUsage = undefined;
if (maxUsage == '_') maxUsage = undefined;

let result = list(data, sortBy, minUsage, maxUsage)

writeData('list.txt', result);

