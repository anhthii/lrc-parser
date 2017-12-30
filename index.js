const os = require('os')

/**
 * 
 * @param {string} data 
 * @example [length: 03:36]
 * @return {<Array>{string}} ['length', '03:06']
 */

function extractInfo(data) {
  const info = data.slice(1, -1) // remove brackets: length: 03:06
  return info.split(': ')
}

function lrc2json(data) {
  if (typeof data !== 'string') {
    throw new TypeError('expect first argument to be a string')
  }
  // split a long stirng into lines by system's end-of-line marker line \r\n on Windows
  // or \n on POSIX
  const lines = data.split(os.EOL)
  
  const infos = lines.splice(0, 5)
  const result = {}

  infos.reduce((result, info) => {
    const [key, value] = extractInfo(info)
    result[key] = value
    return result
  }, result)

  const regex = /\[(.+)\](.+)/
  const timeRegex = /\[(.+)\]/
  const scripts = []
  
  for (var i = 0, l = lines.length; i < l; i++) {
    const matches = regex.exec(lines[i])
    const timeEndMatches = timeRegex.exec(lines[i + 1])  
    if (matches && timeEndMatches) {
      const [, start, text] = matches
      const [, end] = timeEndMatches
      scripts.push({
        start,
        text,
        end
      })
    }
  }

  result.scripts = scripts
  return result
}

module.exports = lrc2json