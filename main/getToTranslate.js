const fs = require('fs')
const path = require('path')
const opts = require('../opts')

function isNoLang(prop) {
    let lang = prop.match(/_([a-z]{2}_[A-Z]{2}).properties$/)
    if (lang == null) {
        return true
    }
    else{
        return false
    }
}
function isLangToTranslate(prop) {
    let lang = prop.match(/_([a-z]{2}_[A-Z]{2}).properties$/)
    if (lang == null) {
        return {res: false}
    }
    lang = lang[1]
    if (lang == opts.languageToTranslate) {
        return {res: true, lang: lang}
    }
    else{
        return {res: false}
    }
}

module.exports = function (lang) {
    const essential = require('../generated/essential')
    let toTranslate = {}
    Object.keys(essential).forEach(prop => {
        if ( isNoLang(prop) ) { // eg: "xxx.properties"
            toTranslate[prop] = essential[prop].propJson
        }
    });
    Object.keys(essential).forEach(prop => { // eg: "xxx_fr_FR.properties" if fr_FR is the language to translate
        if ( isLangToTranslate(prop).res ) {
            let propName = prop.split( '_' + isLangToTranslate(prop).lang )[0] + '.properties'
            Object.keys(essential[prop].propJson).forEach(key => {
                if ( !toTranslate[propName] ) {
                    toTranslate[propName] = {}
                }
                // console.log(`\n${key}:\nNo lang properties: ${toTranslate[propName][key]}\nreplaced by ${opts.languageToTranslate} properties\n${essential[prop].propJson[key]}`);
                toTranslate[propName][key] = essential[prop].propJson[key]
            });
        }
    });
    fs.writeFileSync(
        path.join(__dirname, '../generated/TO-TRANSLATE.json'),
        JSON.stringify( toTranslate, '', 3 ),
        'utf8'
    )
}
// module.exports() // for debug and to comment after