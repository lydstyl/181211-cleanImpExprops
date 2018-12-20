const opts = require('./opts')
console.log(`Your opts.json:`)
console.log(opts)
if (opts.mode == 'import') {
    const generateTranslatedProps = require('./main/generateTranslatedProps')
    generateTranslatedProps()
}
if (opts.mode == 'extract') {
    const extractFrontKeys = require('./main/extractFrontKeys')
    const getEssential = require('./main/getEssential')
    const getToTranslate = require('./main/getToTranslate')
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
    extractFrontKeysSync() // this create ./generated/ALL-PROPS.json
    getEssential() // this create ./generated/ESSENTIAL.json a file without duplicate
    getToTranslateSync()
}
if (opts.mode == 'remove duplicates') {
    const rmDuplicateKeys = require('./main/rmDuplicateKeys')
    rmDuplicateKeys()
}