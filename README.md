# ECM encode utility for Node.js

[![travis build](https://img.shields.io/travis/jbdemonte/node-ecm.svg)](https://travis-ci.org/jbdemonte/node-ecm)
[![Coverage Status](https://coveralls.io/repos/github/jbdemonte/node-ecm/badge.svg?branch=master)](https://coveralls.io/github/jbdemonte/node-ecm?branch=master)
[![NPM Version](https://img.shields.io/npm/v/ecm.svg)](https://www.npmjs.com/package/ecm)

This project is a port of the ECM encode utility from [ECM](https://github.com/kidoz/ecm).

## Installation
```
npm install ecm --save
```

## Usage

```javascript
var ecm = require('ecm')

var handler = ecm('Metal Slug X.img');

handler.on('error', function (data) {
  console.log(data);
});

handler.on('progress', function (data) {
  console.log(data);
});

handler.on('complete', function (data) {
  console.log(data);
});
```

### ecm([source], [destination])

Either the source or the destination has to be provided.
__Note: a source file can't ends with `.ecm`, the destination must ends with `.ecm`__

The ECM format allows you to reduce the size of a typical CD image file (BIN, CDI, NRG, CCD, or any other format that uses raw sectors; results may vary).

#### Parameters:

`source` - string - The source file. If not provided, the destination path minus the `.ecm` will be used.
`destination` - string - The destination file. If not provided, the source path plus the `.ecm` will be used.

#### Returns:

[EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

#### Events

##### `progress`
*Emitted during the encoding*

parameter: `data`

`data.analyse` - Number - 0..100 - Progression of the analysis
`data.encoding` - Number - 0..100 - Progression of the encoding

##### `error`
*Emitted when an error has occurred*

parameter: `data`

`data.error` - String - Label of the error


##### `complete`
*Emitted when encoding is finished*

parameter: `data`

`data.inLength` - Number - Source length
`data.outLength` - Number - Destination length
`data.literal` - Number - Literal bytes
`data.m1s` - Number - Mode 1 sectors
`data.m2f1` - Number - Mode 2 form 1 sectors
`data.m2f2` - Number - Mode 2 form 2 sectors

## License
[GPL-2.0](https://opensource.org/licenses/GPL-2.0)