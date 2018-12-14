const opts = require('./opts')
const extractFrontKeys = require('./main/extractFrontKeys')
const getEssential = require('./main/getEssential')

var read = require( 'utils-fs-read-properties' );
// const saveChangedKeysInMainCartridge = require('./main/saveChangedKeysInMainCartridge')
// const rmDuplicateKeys = require('./main/rmDuplicateKeys')

console.log(`Your opts.json:`)
console.log(opts)

extractFrontKeys() // this create ./generated/ALL-PROPS.json
getEssential() // this create ./generated/ESSENTIAL.json a file without duplicate

// saveChangedKeysInMainCartridge()
// rmDuplicateKeys()