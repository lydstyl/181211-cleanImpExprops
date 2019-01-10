/**
 * Ce script fonctionne avec le fichier opts.json qu'il faut préalablement éditier.
 * 
 * Il comporte 3 modes :
 * 
 * 1/ 'extract' 
 *      Il génère un .json qu'il faudra traduire.
 * 
 * 2/ 'import'
 *      Il nécessite d'avoir lancé extract en premier.
 *      Placez le .json extrait et traduit à la racine de ce dossier.
 *      Le script génère toutes les .properties traduites.
 * 
 * 3/ 'remove duplicates'
 *      Il nécessite d'avoir lancé extract en premier.
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
if (opts.mode == 'emptyOrFR') { // vides ou même valeur que FR
    
}