const fs = require('fs')
const path = require('path')
const opts = require('../opts')
module.exports = function () {
    const toTranslateWithoutTranslated = require('../generated/TO-TRANSLATE.json')
    const essential = require('../generated/essential.json')
    Object.keys(essential).forEach(propName => {
        if ( propName.includes(opts.newLangage) ) {
            const prop = essential[propName]
            Object.keys(prop).forEach(key => {
                const keyVals = prop[key]
                if (typeof keyVals == 'object') {
                    Object.keys(keyVals).forEach(key => {
                        const val = keyVals[key]
                        const pName = propName.split('_' + opts.newLangage)[0] + '.properties'
                        if (toTranslateWithoutTranslated[pName][key]) {
                            if (toTranslateWithoutTranslated[pName][key] != val) {
                                delete toTranslateWithoutTranslated[pName][key]
                            }
                        }
                    });
                }
            })
        }
    })
    fs.writeFileSync(
        path.join(__dirname, '../generated/TO-TRANSLATE-WITHOUT-TRANSLATED.json'),
        JSON.stringify(toTranslateWithoutTranslated, null, 2), 
        'utf-8'
    )
}