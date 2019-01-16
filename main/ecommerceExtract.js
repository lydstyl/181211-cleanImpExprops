const fs = require('fs')
const path = require('path')
const essential = require('../generated/essential.json')
const locales = ['it_IT', 'de_DE', 'nl_BE', 'es_ES', 'nl_NL', 'fr_FR']
const ecomLocales = ['nl_NL', 'fr_FR']
const allLocalesNeeded = {}
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
}
module.exports = () => {
    Object.keys(essential).forEach(propName => {
        let propLang = propName.split('.properties')[0]
        propLang = propLang.match(/^.*_([a-z]{2}_[A-Z]{2})$/)
        if (propLang && propLang[1]) {
            // For a list of locales, extract only the keys and values that are in fr_FR and nl_NL but not in the requested locale.
            locales.forEach(locale => {
                if (propLang[1] === locale ) {
                    if (!allLocalesNeeded[locale]) {
                        allLocalesNeeded[locale] = {}
                    }
                    newPropName = propName.split('_' + locale + '.properties')[0]
                    if (!allLocalesNeeded[locale][propName]) {
                        allLocalesNeeded[locale][newPropName] = {}
                    }
                    allLocalesNeeded[locale][newPropName] = JSON.parse( JSON.stringify(essential[propName].propJson, null, 4) )
                    if ( isEmpty(essential[propName].propJson) ) {
                    }
                }    
            })
        }
    })
    // fs.writeFileSync(
    //     path.join(__dirname, '../generated/allLocalesNeeded.json'),
    //     JSON.stringify(allLocalesNeeded, null, 4), 
    //     'utf-8'
    // )
    const toTranslateInLocales= ['it_IT', 'de_DE', 'nl_BE', 'es_ES']
    let toTranslate = []
    function addToTranslate(propName, frAndNlKey) {
        const csvKey = `${propName} > ${frAndNlKey}`
        let obj = {}
        obj.key = csvKey
        obj.fr_FR = allLocalesNeeded.fr_FR[propName][frAndNlKey]
        obj.nl_NL = allLocalesNeeded.nl_NL[propName][frAndNlKey]
        toTranslateInLocales.forEach( locale => {
            if ( !allLocalesNeeded[locale] ) {
                allLocalesNeeded[locale] = {}
            }
            if ( !allLocalesNeeded[locale][propName] ) {
                allLocalesNeeded[locale][propName] = {}
            }
            obj[locale] = allLocalesNeeded[locale][propName][frAndNlKey]
        });
        toTranslate.push(obj)
    }
    Object.keys(allLocalesNeeded.fr_FR).forEach(propName => {
        const prop = allLocalesNeeded.fr_FR[propName]
        if (allLocalesNeeded.nl_NL[propName]) {
            Object.keys(prop).forEach( frAndNlKey => {
                if (allLocalesNeeded.nl_NL[propName][frAndNlKey]) { // key exist in fr_FR an in nl_NL
                    addToTranslate(propName, frAndNlKey)
                }
            })
        }
    })
    // remove line if already translated
    let toTranslate2 = []
    for (let j = 0; j < toTranslate.length; j++) {
        const line = toTranslate[j];
        lineKeys = Object.keys(line)
        if (
            !(
                line.key &&
                line.fr_FR &&
                line.nl_NL &&
                line.it_IT &&
                line.de_DE &&
                line.nl_BE &&
                line.es_ES
            )
        ) 
        {
            toTranslate2.push( line )
        }
    }
    const Json2csvParser = require('json2csv').Parser;
    const fields = ['key', 'fr_FR', 'nl_NL', 'it_IT', 'de_DE', 'nl_BE', 'es_ES']
    const json2csvParser = new Json2csvParser({ fields });
    const csv = json2csvParser.parse(toTranslate2);
    fs.writeFileSync(
        path.join(__dirname, '../generated/ecommerce.csv'),
        csv,
        'utf-8'
    )
}