/**
 * Ce script fonctionne avec le fichier opts.json qu'il faut préalablement éditier.
 * 
 * Il comporte 3 modes :
 * 
 * 1/ 'extract' 
 *      Il génère un .json qu'il faudra traduire.
 * 
 * 
 * ATTENTION : pour les autre modes ci-dessous, il est nécessaire d'avoir lancé le mode extract d'abord.
 * 
 * 1.2/ 'remove the already translated from extract'
 *      Il génère un .jsoin qu'il faudra traduire sans ce qui est déjà traduit.
 * 
 * 2/ 'import'
 *      Placez le .json extrait et traduit à la racine de ce dossier.
 *      Le script génère toutes les .properties traduites.
 * 
 * 3/ 'remove duplicates'
 *      Le script génère uniquement les .properties qui avaient une ou plusieurs clés en double.
 */

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
if (opts.mode == 'remove the already translated from extract') {
    require('./main/rmAlreadyTranslated')()
}
if (opts.mode == 'extract only new Langage'){ // eg only extract info from properties thant includes es_ES
    // needs to launch extract mode first
    require('./main/extracOnlyNewLangage')()
}
if (opts.mode == 'babyliss e-commerce extract') {
    // for a list of locales, extract only the keys and values that are in fr_FR en nl_NL but not in the requested locale.
    // like always, it needs to launch extract mode first
    require('./main/ecommerceExtract') ()
}
if (opts.mode == 'babyliss e-commerce import addEcommerceCSVtoEssential') {
    // first run extract mode
    // then make essentialWithEcommerceAdded.json with this script
    // then getToTranslateSync
    require('./main/addEcommerceCSVtoEssential.js') ()
    
    
    
}
// if (opts.mode == 'babyliss e-commerce essentialWithEcommerceAdded.json --> properties') {
//     require('./main/ecommerceToProps.js') ()
    
// }