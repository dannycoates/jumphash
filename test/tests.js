var test = require('tap').test
var jumpsuit = require('jumpsuit')
var jh = require('../')
var crypto = require('crypto')

test(
  'negative key',
  function (t) {
    var k = -100
    var b = 20
    t.equal(jh(k, b), jh(-k, b))
    t.end()
  }
)

test(
  'string keys',
  function (t) {
    var k = 'this is a test'
    var buf = crypto.createHash('sha1').update(k).digest()
    var b = 20
    t.equal(jh(k, b), jh(buf, b))
    t.end()
  }
)

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
