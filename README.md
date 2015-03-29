# jumphash

Javascript implementation of [jump consistent hash](http://arxiv.org/pdf/1406.2294v1.pdf)

For a faster node module see [jumpsuit](https://github.com/ceejbot/jumpsuit)

## Example

```js
var jumphash = require('jumphash')

// jumphash(key, numBuckets)

// number keys - uses the floor of the absolute value
console.log(jumphash(23102, 16)) // 2

// buffer keys - uses the first 8 bytes as the key
console.log(jumphash(Buffer('1234567890ABCDEF', 'hex'), 1024)) // 888

// string keys - hashes the string with sha1
console.log(jumphash('live long and prosper', 256)) // 9

// optionally, specify a different string hash algorithm
console.log(jumphash('live long and prosper', 256, 'sha256')) // 82

```
