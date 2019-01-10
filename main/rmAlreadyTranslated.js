const fs = require('fs')
const opts = require('../opts')
module.exports = function () {
    // extract doit avoir été tourné avant
    // on créé l'objet toTranslateWithoutTranslated
    const toTranslateWithoutTranslated = require('../generated/TO-TRANSLATE.json')
    const essential = require('../generated/essential.json')
    // on parcour essential.json
    Object.keys(essential).forEach(propName => {
        // si le nom de la prop contient nl_BE
        if ( propName.includes(opts.newLangage) ) {
            
            const prop = essential[propName]
            Object.keys(prop).forEach(key => {
                const keyVals = prop[key]
                if (typeof keyVals == 'object') {
                    Object.keys(keyVals).forEach(key => {
                        // on parcour ses key et val
                        const val = keyVals[key]
                        // si elle existe dans TO-TRANSLATE.json qui est en fr_FR et que la val est différente (donc c'est traduit)
                        const pName = propName.split('_' + opts.newLangage)[0] + '.properties' // enlever le _nl_BE
                        if (toTranslateWithoutTranslated[pName][key]) {
                            if (toTranslateWithoutTranslated[pName][key] != val) {
                                // on l'enlève de TO-TRANSALTE
                                delete toTranslateWithoutTranslated[pName][key]
                            }
                        }
                        
                    });
                }
            })
        }
    })
    // on créé TO-TRANSLATE-WITHOUT-TRANSLATED.json
    fs.writeFileSync(
        './TO-TRANSLATE-WITHOUT-TRANSLATED.json',
        JSON.stringify(toTranslateWithoutTranslated, null, 2), 
        'utf-8'
    )
}