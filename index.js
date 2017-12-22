
/**
 * 
 * @param {string} data 
 * @example [length: 03:36]
 * @return {<Array>{string}} ['length', '03:06']
 */

function extractInfo(data) {
  const regex = /\[(.+)\:\s(.+)\]/
  const [, key, value] = regex.exec(data)
  return [key, value]
}

function lrc2json(data) {
  if (typeof data !== 'string') {
    throw new TypeError('expect first argument to be a string')
  }

  const lines = data.split('\r')
  const infos = lines.splice(0, 5)
  console.log(infos)
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