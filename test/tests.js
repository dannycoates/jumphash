var test = require('tap').test
var jumpsuit = require('jumpsuit')
var jh = require('../')
var crypto = require('crypto')

test(
  'int samesies',
  function (t) {
    for (var i = 0; i < 1000; i++) {
      var key = crypto.randomBytes(4).readUInt32BE(0)
      var b = (key % 0xFFFF) + 1
      t.equal(jh(key, b), jumpsuit(key, b), 'k=' + key + ' b=' + b)
    }
    t.end()
  }
)

test(
  'buffer samesies',
  function (t) {
    for (var i = 0; i < 1000; i++) {
      var key = crypto.randomBytes(13)
      var b = Math.floor(Math.random() * 0xFFFF)
      t.equal(jh(key, b), jumpsuit(key, b), 'k=' + key.toString('hex') + ' b=' + b)
    }
    t.end()
  }
)
