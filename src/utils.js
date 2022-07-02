let ratio = (current, total, precision = 1) => {
  if (total <= 0) return 0;

  return parseInt(current / total * 100 * Math.pow(10, precision)) / Math.pow(10, precision);
}

let dd = (...args) => { console.log(...args); process.exit(0); }

let progress = (index, total) => {
  if (index === 0 || index === total - 1 || index % 5000 === 0) {
    let _ratio = ratio(index, total)
    console.log(`- ${index + 1} / ${total} [${_ratio}%]`)
  }
}

let arg = (index) => {
  let value = process.argv[index];

  return value == '_' ? undefined : value;
}

module.exports = {
  ratio,
  dd,
  progress,
  arg
}