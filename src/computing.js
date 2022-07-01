const { get, setUnsafe, pushLast, each, transform } = require("@warangel580/utils")
const { ratio, progress } = require("./utils")

let parse = function (data, minYear, maxYear) {
  let [headers, ...contents] = data.split("\r\n");

  headers = headers.split(';');

  let total = contents.length;

  return transform({}, contents, (stats, line, lineIndex) => {
    let parts = line.split(';');

    let attrs = transform({}, parts, (attrs, value, attributeIndex) => {
      return Object.assign(attrs, {
        [headers[attributeIndex]]: value
      })
    });

    let gender = get(attrs, 'gender', '1') === '1' ? 'H' : 'F';
    let name   = get(attrs, 'name', '?')
    let year   = get(attrs, 'year', '?')
    let count  = parseInt(get(attrs, 'count', '0'))

    let matchYear = true;

    if (minYear) {
      matchYear = matchYear && year >= minYear;
    }

    if (maxYear) {
      matchYear = matchYear && year <= maxYear;
    }

    if (name != '_PRENOMS_RARES' && name != '?' && matchYear) {
      stats = setUnsafe(stats, ['names', name, 'genders', gender, 'years',   year,   'total'], count)
      stats = setUnsafe(stats, ['names', name, 'years',   year,   'genders', gender, 'total'], count)
    }

    // Show progress in case it's slow
    progress(lineIndex, total);

    return stats;
  });
}

let _transform = (data) => {
  let fullTotal  = 0;
  let nameIndex  = 0;
  let totalNames = Object.keys(data.names).length;

  each(data.names, (nameData, name) => {
    let nameTotal = 0;

    each(nameData.genders, (genderData, gender) => {
      let genderTotal = 0;
  
      each(genderData.years, (yearData, _) => {
        genderTotal += get(yearData, 'total', 0);
      })
  
      data = setUnsafe(data, ['names', name, 'genders', gender, 'total'], genderTotal);
      
      each(genderData.years, (yearData, year) => {
        data = setUnsafe(data, ['names', name, 'genders', gender, 'years', year, 'ratio'], ratio(get(yearData, 'total', 0), genderTotal));
      })

      nameTotal += genderTotal;
    })

    data = setUnsafe(data, ['names', name, 'total'], nameTotal);

    each(nameData.genders, (genderData, gender) => {
      data = setUnsafe(data, ['names', name, 'genders', gender, 'ratio'], ratio(get(genderData, 'total', 0), nameTotal));
    })

    each(nameData.years, (yearData, year) => {
      let yearTotal = 0;

      each(yearData.genders, (genderData, _) => {
        yearTotal += get(genderData, 'total', 0);
      })

      data = setUnsafe(data, ['names', name, 'years', year, 'total'], yearTotal);

      each(yearData.genders, (genderData, gender) => {
        data = setUnsafe(data, ['names', name, 'years', year, 'genders', gender, 'ratio'], ratio(get(genderData, 'total', 0), yearTotal));
      })
    })

    fullTotal += nameTotal;

    // Show progress in case it's slow
    progress(nameIndex, totalNames);

    nameIndex++;
  })

  nameIndex = 0;
  each(data.names, (nameData, name) => {
    data = setUnsafe(data, ['names', name, 'ratio'], ratio(get(nameData, 'total', 0), fullTotal));

    each(nameData.years, (yearData, year) => {
      data = setUnsafe(data, ['names', name, 'years', year, 'ratio'], ratio(get(yearData, 'total', 0), fullTotal));
    })

    // Show progress in case it's slow
    progress(nameIndex, totalNames);

    nameIndex++;
  })

  return data;
}

let list = (data, sortBy = "gender") => {
  let names = [];

  let totalNames = Object.keys(data.names).length;
  let nameIndex  = 0;

  each(data.names, (nameData, name) => {
    let ratioH = get(nameData, ['genders', 'H', 'ratio'], 0);
    let ratioF = get(nameData, ['genders', 'F', 'ratio'], 0);
    let usage  = get(nameData, 'total', 0);
    let _ratio = ratioH > ratioF ? ratioH : ratioF;
    let type   = ratioH > ratioF ?    'H' :    'F';

    if (usage <= 0) return;

    names = pushLast(names, [name, ratioF, type, _ratio, usage]);

    // Show progress in case it's slow
    progress(nameIndex, totalNames);

    nameIndex++;
  });

  names.sort(([,r1,t1,,u1], [,r2,t2,,u2]) => {
    if (t1 != t2) {
      return t1 == 'F' ? -1 : 1;
    }

    if (sortBy == "gender") {
      // Sort by "gender %" first
      return r1 != r2
      ? r2 - r1
      : t1 == 'F' ? u2 - u1 : u1 - u2;
    }

    // Sort by popularity first
    return u2 != u1
      ? t1 == 'F' ? u2 - u1 : u1 - u2
      : r2 - r1;
  });

  let result = "";

  each(names, ([name, _, type, ratio, usage]) => {
    result += [name.padEnd(30, ' '), (type + " " + String(ratio) + "%").padEnd(10, ' '), (String(usage)).padStart(10, ' ')].join(' ') + "\n";
  })

  return result;
}


module.exports = {
  parse,
  transform: _transform,
  list,
}