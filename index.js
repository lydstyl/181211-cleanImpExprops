const opts = require('./opts')
const path = require('path')
const rootDir = path.join(__dirname)
const modes = {
    extract: () => {
        require( path.join(rootDir, 'scripts/extract/') )()
    },
    import: () => {
        require( path.join(rootDir, 'scripts/import/') )()
    },
    specificExtract: () => {
        require( path.join(rootDir, 'scripts/specificExtract/') )()
    },
    specificImport: () => {
        require( path.join(rootDir, 'scripts/specificImport/') )()
    },
    ecommerceExtract: () => {
        require(path.join(rootDir, 'scripts/ecommerceExtract/') )()
    }
}
try {
    modes[opts.mode]()
} catch (error) {
    console.log(`Le mode ${opts.mode} n'existe pas, merci de le modifier dans opts.json\n`)
    console.log(error);
}

// // OLD MODE TO DO THE WAY LIKE EXTRACT OR IMPORT
// if (opts.mode == 'remove duplicates') {
//     const rmDuplicateKeys = require('./main/rmDuplicateKeys')
//     rmDuplicateKeys()
// }
// if (opts.mode == 'remove the already translated from extract') {
//     require('./main/rmAlreadyTranslated')()
// }
// if (opts.mode == 'extract only new Langage'){ // eg only extract info from properties that includes es_ES
//     // needs to launch extract mode first
//     require('./main/extracOnlyNewLangage')()
// }
// if (opts.mode == 'babyliss e-commerce extract') {
//     // for a list of locales, extract only the keys and values that are in fr_FR and nl_NL but not in the requested locale.
//     // like always, it needs to launch extract mode first
//     require('./main/ecommerceExtract') ()
// }
// if (opts.mode == 'babyliss e-commerce import addEcommerceCSVtoEssential') {
//     // extract mode
//     // addEcommerceCSVtoEssential.js
//     // ecomJsonToProp.js
// }