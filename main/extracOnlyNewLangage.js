const fs = require('fs')
const opts = require('../opts.json')
const essential = require('../generated/essential.json')
module.exports = () => {
    let csv = 'KEY;VAL\n'
    Object.keys(essential).forEach( propName => {
        if ( propName.includes('es_ES') && !propName.includes('.swp') ) {
            const prop = essential[propName].propJson
            Object.keys(prop).forEach(key => {
                const val = prop[key]
                csv += `${key};${val}`
            });
        }
    });
    fs.writeFileSync(
        './generated/TO-TRANSLATE-ONLY-' + opts.languageToTranslate + '.csv',
        csv,
        'utf-8'
    )
}