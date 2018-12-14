const opts = require('./opts')
const extractFrontKeys = require('./main/extractFrontKeys')

var read = require( 'utils-fs-read-properties' );
// const saveChangedKeysInMainCartridge = require('./main/saveChangedKeysInMainCartridge')
// const rmDuplicateKeys = require('./main/rmDuplicateKeys')

console.log(`Your opts.json:`)
console.log(opts)

extractFrontKeys()
// saveChangedKeysInMainCartridge()
// rmDuplicateKeys()