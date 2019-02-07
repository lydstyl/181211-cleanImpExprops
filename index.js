const opts = require('./opts')
const path = require('path')
const rootDir = path.join(__dirname)

// if (opts.mode == 'import') {
//     const generateTranslatedProps = require('./main/generateTranslatedProps')
//     generateTranslatedProps()
// }
// if (opts.mode == 'extract') {
//     require( path.join(rootDir, 'scripts/extract/index') )()
// }
// if (opts.mode == 'remove duplicates') {
//     const rmDuplicateKeys = require('./main/rmDuplicateKeys')
//     rmDuplicateKeys()
// }
// if (opts.mode == 'remove the already translated from extract') {
//     require('./main/rmAlreadyTranslated')()
// }
// if (opts.mode == 'extract only new Langage'){ // eg only extract info from properties thant includes es_ES
//     // needs to launch extract mode first
//     require('./main/extracOnlyNewLangage')()
// }
// if (opts.mode == 'babyliss e-commerce extract') {
//     // for a list of locales, extract only the keys and values that are in fr_FR en nl_NL but not in the requested locale.
//     // like always, it needs to launch extract mode first
//     require('./main/ecommerceExtract') ()
// }
// if (opts.mode == 'babyliss e-commerce import addEcommerceCSVtoEssential') {
//     // extract mode
//     // addEcommerceCSVtoEssential.js
//     // ecomJsonToProp.js
// }


console.log(opts.mode);

const modes = {
    extract: () => {
        require( path.join(rootDir, 'scripts/extract/index') )()
    }
}
modes[opts.mode]()