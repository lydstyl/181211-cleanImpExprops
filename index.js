const opts = require("./opts");
const path = require("path");
const rootDir = path.join(__dirname);

function get(script) {
  return require(path.join(rootDir, script));
}

const modes = {
  extract: () => {
    get("scripts/extract/")();
  },
  import: () => {
    get("scripts/import/")();
  },
  specificExtract: () => {
    get("scripts/specificExtract/")();
  },
  specificImport: () => {
    get("scripts/specificImport/")();
  },
  ecommerceExtract: () => {
    get("scripts/ecommerceExtract/")();
  },
  showKeys: () => {
    get("scripts/showKeys")();
  }
};
try {
  modes[opts.mode]();
} catch (error) {
  console.log(
    `Le mode ${opts.mode} n'existe pas, merci de le modifier dans opts.json\n`
  );
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
// if (opts.mode == 'babyliss e-commerce import addEcommerceCSVtoEssential') {
//     // extract mode
//     // addEcommerceCSVtoEssential.js
//     // ecomJsonToProp.js
// }
