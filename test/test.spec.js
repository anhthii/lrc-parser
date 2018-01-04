const fs = require('fs')
const { test } = require('tap')
const lrcParser = require('../')

test('should convert lrc to json', t => {
  fs.readFile('./test/havana.lrc', function(err, data) {
    if (err) {
      throw err
    }

    const jsonData = lrcParser(data.toString('utf8'))
    t.equal(jsonData.ar, 'Camila Cabello, Young Thug')
    t.equal(jsonData.ti, 'Havana')
    t.equal(jsonData.al, 'Havana (Single)')
    t.equal(jsonData.length, '03:36')
    t.ok(Array.isArray(jsonData.scripts))

    const script = jsonData.scripts[2]
    t.ok(typeof script === 'object')
    t.equal(script.start, 8.86)
    t.equal(script.text, 'Havana ooh na-na (ayy)')
    t.equal(script.end, 11.56)
    t.end()
  }) 
})
