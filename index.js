const opts = require('./opts')
const extractFrontKeys = require('./main/extractFrontKeys')
const getEssential = require('./main/getEssential')

var read = require( 'utils-fs-read-properties' )
// const saveChangedKeysInMainCartridge = require('./main/saveChangedKeysInMainCartridge')
// const rmDuplicateKeys = require('./main/rmDuplicateKeys')

console.log(`Your opts.json:`)
console.log(opts)

function extractFrontKeysAsync() {
    return new Promise(resolve => {
        console.log('aaa') // ok
        extractFrontKeys()
        console.log('a2') // ok
    })
}

async function extractFrontKeysSync() {
    console.log('111') // ok
    var x = await extractFrontKeysAsync();
    // extractFrontKeysAsync().then( ()=>{
    //     console.log('then');
        
    // } )
}
// extractFrontKeys() // this create ./generated/ALL-PROPS.json
//wait finish here !!!
extractFrontKeysSync()
console.log('ccc')
getEssential() // this create ./generated/ESSENTIAL.json a file without duplicate
console.log('ddd')
// saveChangedKeysInMainCartridge()
// rmDuplicateKeys()