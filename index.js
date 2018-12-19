const opts = require('./opts')
const extractFrontKeys = require('./main/extractFrontKeys')
const getEssential = require('./main/getEssential')
// const saveChangedKeysInMainCartridge = require('./main/saveChangedKeysInMainCartridge')
// const rmDuplicateKeys = require('./main/rmDuplicateKeys')
// const read = require( 'utils-fs-read-properties' )

function extractFrontKeysAsync() {
    return new Promise(resolve => {
        extractFrontKeys()
    })
}
async function extractFrontKeysSync() {
    await extractFrontKeysAsync()
}

console.log(`Your opts.json:`)
console.log(opts)
extractFrontKeysSync() // this create ./generated/ALL-PROPS.json
getEssential() // this create ./generated/ESSENTIAL.json a file without duplicate
// saveChangedKeysInMainCartridge()
// rmDuplicateKeys()