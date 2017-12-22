const fs = require('fs')
const { test } = require('tap')
const lrc2json = require('../')

test('should convert lrc to json', t => {
  fs.readFile('./test/havana.lrc', 'utf8', function(err, data) {
    if (err) {
      throw err
    }

    const jsonData = lrc2json(data)
    console.log(jsonData)
    t.equal(jsonData.ar, 'Camila Cabello, Young Thug')
    t.equal(jsonData.ti, 'Havana')
    t.equal(jsonData.al, 'Havana (Single)')
    t.equal(jsonData.by, 'ZingMp3 Lyric')
    t.equal(jsonData.length, '03:36')
    t.ok(Array.isArray(jsonData.scripts))

    const script = jsonData.scripts[0]
    t.ok(typeof script === 'object')
    t.equal(script.start, '00:00.00')
    t.equal(script.text, 'Song: Havana')
    t.equal(script.end, '00:02.00')
    t.end()
  }) 
})
