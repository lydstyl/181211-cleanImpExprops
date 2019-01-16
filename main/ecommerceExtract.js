const fs = require('fs')
const essential = require('../generated/essential.json')
const locales = ['it_IT']
// const allLocalesNeeded = {
//     l1: {},
//     l2: {}
// }
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
            // for a list of locales, extract only the keys and values that are in fr_FR en nl_NL but not in the requested locale.
            locales.forEach(locale => {
                if (propLang[1] === locale ) {
                    //console.log( essential[propName] )
                    if (!allLocalesNeeded[locale]) {
                        allLocalesNeeded[locale] = {}
                    }
                    newPropName = propName.split('_' + locale + '.properties')
                    if (!allLocalesNeeded[locale][propName]) {
                        allLocalesNeeded[locale][newPropName] = {}
                    }
                    
                    if ( isEmpty(essential[propName].propJson) ) {
                        
                        allLocalesNeeded[locale][newPropName] = JSON.parse( JSON.stringify(essential[propName].propJson, null, 4) )
                    }
                }    
            })
        }
    })
    console.log(allLocalesNeeded)
}
