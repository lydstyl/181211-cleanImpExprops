const fs = require('fs')
const path = require('path')
const essential = require('../generated/essential.json')
const locales = ['it_IT', 'de_DE', 'nl_BE', 'es_ES', 'nl_NL', 'fr_FR']
const ecomLocales = ['nl_NL', 'fr_FR']
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

    console.log( toTranslate );
    // si toutes les locales sont renseigné pas besoin de le traduire on l'enlève
    toTranslate.forEach( line => {

        for (let i = 0; i < Object.keys(line).length; i++) {
            const header = Object.keys(line)[i];
            console.log(header);
            if ( !line[header] ) {
                
            }
        }

    });
    

    // const Json2csvParser = require('json2csv').Parser;
    // const fields = ['car', 'price', 'color'];
    // const myCars = [
    //   {
    //     "car": "Audi",
    //     "price": 40000,
    //     "color": "blue"
    //   }, {
    //     "car": "BMW",
    //     "price": 35000,
    //     "color": "black"
    //   }, {
    //     "car": "Porsche",
    //     "price": 60000,
    //     "color": "green"
    //   }
    // ];
     
    // const json2csvParser = new Json2csvParser({ fields });
    // const csv = json2csvParser.parse(myCars);
     
    // console.log(csv);

}
