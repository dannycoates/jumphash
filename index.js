var BN = require('bn.js')
var crypto = require('crypto')

const modulo64 = BN.red(new BN('10000000000000000', 16))
const multiplier = (new BN('2862933555777941757', 10)).toRed(modulo64)

function hash(key, numBuckets) {
  var j = 0
  var b = -1
  while (j < numBuckets) {
    b = j
    key = key.redMul(multiplier).iaddn(1)
    j = Math.floor((b + 1) * (2147483648 / (parseInt(key.shrn(33).toString(16), 16) + 1)))
  }
  return b
}

function jumphash(key, numBuckets, alg) {
  if (typeof key === 'number') {
    key = (new BN(Math.floor(Math.abs(key)))).toRed(modulo64)
  }
  else if (Buffer.isBuffer(key)) {
    key = (new BN(key.slice(0, Math.min(key.length, 8)))).toRed(modulo64)
  }
  else {
    var h = crypto.createHash(alg || 'sha1').update(key.toString()).digest()
    key = (new BN(h.slice(0, Math.min(h.length, 8)))).toRed(modulo64)
  }
  return hash(key, numBuckets)
}

module.exports = jumphash
