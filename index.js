const opts = require('./opts')
const extractFrontKeys = require('./main/extractFrontKeys')
const getEssential = require('./main/getEssential')
const getToTranslate = require('./main/getToTranslate')
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
async function getToTranslateSync() {
    await getToTranslate(opts.languageToTranslate)
}

console.log(`Your opts.json:`)
console.log(opts)
extractFrontKeysSync() // this create ./generated/ALL-PROPS.json
getEssential() // this create ./generated/ESSENTIAL.json a file without duplicate

getToTranslateSync() // fr_FR --> "_fr_FR.properties"

// saveChangedKeysInMainCartridge()
// rmDuplicateKeys()