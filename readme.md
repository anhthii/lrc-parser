# lrc-parser

[![Build Status](https://travis-ci.org/dkakashi69/lrc-parser.svg?branch=master)](https://travis-ci.org/dkakashi69/lrc-parser)

Parse LRC file into json format, works on both node and browser
## Install
```
$ npm install lrc-parser
```

## Usage

### Node
```js
const lrcParser = require('lrc-parser')
const fs = require('fs')

fs.readFile('havana.lrc', (err, data) => {
  const data = lrcParser(data.toString('utf8'))
})

```

### Browser
```js
const file = ...
const fileReader = new FileReader()

fileReader.addEventListener('load', e => {
  const data = lrcParser(e.target.result)
})

fileReader.readAsText(file)
```
```
havana.lrc
[ar: Camila Cabello, Young Thug]
[ti: Havana]
[al: Havana (Single)]
[length: 03:36]
[00:00.00]Song: Havana
[00:02.00]Singer: Camila Cabello, Young Thug
[00:04.00]
[00:08.86]Havana ooh na-na (ayy)
[00:11.56]Half of my heart is in Havana 
[00:14.11]Ooh-na-na (ayy ayy)
[00:16.03]He took me back 
[00:17.25]To East Atlanta na-na-na
[00:19.95]
[00:20.60]All of my heart is in Havana (ayy)
[00:23.51]There's somethin' 'bout his manners 
....
```
```
{
  ar: 'Camila Cabello, Young Thug',
  ti: 'Havana',
  al: 'Havana (Single)',
  length: '03:36',
  scripts: [ { start: 0, text: 'Song: Havana', end: 2 },
    { start: 2, text: 'Singer: Camila Cabello, Young Thug', end: 4 },
    { start: 8.86, text: 'Havana ooh na-na (ayy)', end: 11.56 },
    { start: 11.56,
      text: 'Half of my heart is in Havana ',
      end: 14.11 },
    { start: 14.11, text: 'Ooh-na-na (ayy ayy)', end: 16.03 },
    { start: 16.03, text: 'He took me back ', end: 17.25 },
    { start: 17.25, text: 'To East Atlanta na-na-na', end: 19.95 },
    { start: 20.6,
      text: 'All of my heart is in Havana (ayy)',
      end: 23.51 },
    { start: 23.51,
      text: 'There\'s somethin\' \'bout his manners ',
      end: 26.04 },
    ....
  ]
}
```
