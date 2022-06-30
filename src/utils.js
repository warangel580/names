let ratio = (current, total) => {
  if (total <= 0) return 0;

  return parseInt(current / total * 1000) / 10;
}

let dd = (...args) => { console.log(...args); process.exit(0); }

let progress = (index, total) => {
  if (index === 0 || index === total - 1 || index % 1000 === 0) {
    let _ratio = ratio(index, total)
    console.log(`- ${index + 1} / ${total} [${_ratio}%]`)
  }
}

module.exports = {
  ratio,
  dd,
  progress,
}