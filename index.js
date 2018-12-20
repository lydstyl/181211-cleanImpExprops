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
    
    getToTranslateSync() // fr_FR --> "_fr_FR.properties"
}
if (opts.mod == 'remove duplicates') {
    // const rmDuplicateKeys = require('./main/rmDuplicateKeys')
    // rmDuplicateKeys()


    // Caroll = A

    // A key:val --> ne pas supprimer
    // B key:val-différente
    // C key:val

    // A key:val --> supprimer
    // B key:val
    // C key:val1


    // si pas de ALL-PROPS.json
    //     log il faut lancer extract avant !

    // sinon
    //     let mainProps = {}
    //     pour chaque mainProp dans main (app_carroll)
    //         pour chaque mainKey
    //             let mainVal
    //             pour chaque cartridge sauf main du plus au moins important
    //                 pour chaque prop
    //                     si prop == mainProp
    //                         pour chaque key
    //                             si key == mainKey
    //                                 let val
    //                                 si val != mainVal
    //                                     diffKeys.push({propName:propName, key:key}) // ajouter la key dans diffkeys
    //                                 sinon
    //                                     si key non présente dans diffKeys
    //                                         supprimer le couple mainKey et mainVal de mainProps
}