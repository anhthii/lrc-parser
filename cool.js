const fs = require('fs')

const lrc2json = require('.')
fs.readFile('./test/havana.lrc', (err, data) =>{
  console.log(lrc2json(data.toString('utf8')).scripts)
})