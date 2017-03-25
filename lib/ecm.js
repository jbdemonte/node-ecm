const addon = require('bindings')('addon');
const events = require('events');
const path = require('path');
var pattern = /(.*)\.ecm$/i;

module.exports = function unecm(inFilename, outFilename) {

  if (!inFilename || typeof inFilename !== 'string') {
    throw new Error('inFilename required as a string');
  }

  if (outFilename && typeof outFilename !== 'string') {
    throw new Error('outFilename has to be a string');
  }

  var match = inFilename.match(pattern);

  if (match && outFilename) {
    throw new Error('inFilename can\'t end with .ecm');
  }

  var eventEmitter = new events.EventEmitter();

  if (match) {
    outFilename = inFilename;
    inFilename = match[1];
  } else if (!outFilename) {
    outFilename = inFilename + '.ecm';
  }

  inFilename = path.resolve(inFilename);
  outFilename = path.resolve(outFilename);

  process.nextTick(function () {
    addon.ecm(
      inFilename,
      outFilename,
      function (analyse, encoding) {
        eventEmitter.emit('progress', {analyse: analyse, encoding: encoding});
      },
      function (inLength, outLength, literal, m1s, m2f1, m2f2) {
        eventEmitter.emit('complete', {inLength: inLength, outLength: outLength, literal: literal, m1s: m1s, m2f1: m2f1, m2f2: m2f2});
      },
      function (error) {
        eventEmitter.emit('error', {error: error});
      }
    );
  });

  return eventEmitter;
};