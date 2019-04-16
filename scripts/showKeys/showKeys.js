const fs = require("fs");
const path = require("path");
const rootDir = path.join(__dirname, "../../");

module.exports = () => {
  return new Promise(resolve => {
    console.log("\n\nshowKeys Promise");

    const toTranslate = require(path.join(
      rootDir,
      "generated/TO-TRANSLATE.json" // TODO pas en dur le prendre dans extract/settings
    ));
    const newToTranslate = {};

    Object.keys(toTranslate).forEach(file => {
      if (!newToTranslate[file]) {
        newToTranslate[file] = {};
      }
      const keyVals = toTranslate[file];
      Object.keys(keyVals).forEach(key => {
        const val = keyVals[key];
        const newVal = `${val} #R# ${file} > ${key}`; //ajoute à la fin de chaque value un : " #R# file > my.key"
        newToTranslate[file][key] = newVal;
      });
    });

    const toTranslateImportPath = require(path.join(
      rootDir,
      "scripts/import/settings.js"
    )).translated;

    fs.writeFileSync(
      toTranslateImportPath, // TODO pas en dur le prendre dans extract/settings
      JSON.stringify(newToTranslate, null, 4),
      "utf-8"
    );

    console.log("\n\nshowKeys Promise finished");
    resolve(); // sort de return
  });
};
