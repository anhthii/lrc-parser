# lrc2jsn

[![Build Status](https://travis-ci.org/dkakashi69/lrc2json.svg?branch=master)](https://travis-ci.org/dkakashi69/lrc2json)

Convert LRC file into json format
## Install
```
$ npm install lrc2jsn
```

## Usage
```js
const lrc2json = require('lrc2jsn')
const fs = require('fs')

fs.readFile('havana.rlc', (err, data) => {
  rlc2json(data.toString('utf8'))
})

```
```
{ 
  ar: 'Camila Cabello, Young Thug',
  ti: 'Havana',
  al: 'Havana (Single)',
  by: 'ZingMp3 Lyric',
  length: '03:36',
  scripts: [
    {start: '00:00.00', text: 'Song: Havana', end: '00:02.00' },
    { start: '00:02.00',
      text: 'Singer: Camila Cabello, Young Thug',
      end: '00:04.00' },
    { start: '00:08.86',
      text: 'Havana ooh na-na (ayy)',
      end: '00:11.56' },
    { start: '00:11.56',
      text: 'Half of my heart is in Havana ',
      end: '00:14.11' },
    { start: '00:14.11',
      text: 'Ooh-na-na (ayy ayy)',
      end: '00:16.03' },
    { start: '00:16.03', text: 'He took me back ', end: '00:17.25' },
    { start: '00:17.25',
      text: 'To East Atlanta na-na-na',
      end: '00:19.95' },
    { start: '00:20.60',
      text: 'All of my heart is in Havana (ayy)',
      end: '00:23.51' },
    { start: '00:23.51',
      text: 'There\'s somethin\' \'bout his manners',
      end: '00:26.04' } 
  ]
}
```
