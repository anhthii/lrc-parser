const EOL = typeof window === 'undefined' ? require('os').EOL : '\n'

/**
 * 
 * @param {string} data 
 * @example [length: 03:36]
 * @return {<Array>{string}} ['length', '03:06']
 */

function extractInfo(data) {
  const info = data.trim().slice(1, -1) // remove brackets: length: 03:06
  return info.split(': ')
}

function lrcParser(data) {
  if (typeof data !== 'string') {
    throw new TypeError('expect first argument to be a string')
  }
  // split a long stirng into lines by system's end-of-line marker line \r\n on Windows
  // or \n on POSIX
  let lines = data.split(EOL)
  const timeStart = /\[(\d*\:\d*\.?\d*)\]/ // i.g [00:10.55]
  const scriptText = /(.+)/ // Havana ooh na-na (ayy) 
  const timeEnd = timeStart
  const startAndText = new RegExp(timeStart.source + scriptText.source)


  const infos = []
  const scripts = []
  const result = {}

  for(let i = 0; startAndText.test(lines[i]) === false; i++) {
    infos.push(lines[i])
  }

  infos.reduce((result, info) => {
    const [key, value] = extractInfo(info)
    result[key] = value
    return result
  }, result)

  lines.splice(0, infos.length) // remove all info lines
  const qualified = new RegExp(startAndText.source + '|' + timeEnd.source)
  lines = lines.filter(line => qualified.test(line))
  
  for (let i = 0, l = lines.length; i < l; i++) {
    const matches = startAndText.exec(lines[i])
    const timeEndMatches = timeEnd.exec(lines[i + 1])  
    if (matches && timeEndMatches) {
      const [, start, text] = matches
      const [, end] = timeEndMatches
      scripts.push({
        start: convertTime(start),
        text,
        end: convertTime(end),
      })
    }
  }

  result.scripts = scripts
  return result
}

// convert time string to seconds
// i.g: [01:09.10] -> 69.10
function convertTime(string) {
  string = string.split(':');
  const minutes = parseInt(string[0], 10)
  const seconds = parseFloat(string[1])
  if (minutes > 0) {
    const sc = minutes * 60 + seconds
    return parseFloat(sc.toFixed(2))
  }
  return seconds
}

module.exports = lrcParser
