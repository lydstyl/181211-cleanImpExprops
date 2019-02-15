const fs = require('fs')
const path = require('path')
const rootDir = path.join(__dirname, '../')
const opts = require( path.join(rootDir, 'scripts/extract/settings') )
const regex = /_([a-z]{2}_[A-Z]{2})|([a-z]{2}).properties$/ // peut etre forms_en

function isNoLang(prop) {
    let lang = prop.match( regex ) 
    if (lang == null) {
        return true
    }
    else{
        return false
    }
}
function isLangToTranslate(prop) {
    let lang = prop.match( regex )
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

/**
 * Write the .json to be translated
 * It contains keys from essential.json (an extraction of all properties by priority in the cartridge path)
 * but if there is duplicate key between langage properties and no langage properties
 * for exemple 
 * between "xxx.properties" and "xxx_fr_FR.properties"
 * if fr_FR is the langage to translate
 * then the xxx_fr_FR.properties keys will replace the xxx.properties keys
 */
function getNoPropertiesName(prop) {
    let noPropertiesName = prop.replace(/.properties/, '')
    const tmp = noPropertiesName.match(/_([a-z]{2}_[A-Z]{2})|([a-z]{2})$/)[1] // can be /_es_ES/ or /_en/
    if (tmp) {
        const r = new RegExp( '_' + tmp ) 
        noPropertiesName = noPropertiesName.replace(r, '')
    }
    return noPropertiesName
}

module.exports = () => {
    return new Promise(resolve => {
        console.log('main/getToTranslate BEGIN')
        const essential = require('../generated/essential')
        let toTranslate = {}
        Object.keys(essential).forEach(prop => {
            if ( isNoLang(prop) ) { // eg: "xxx.properties"
                const noPropertiesName = getNoPropertiesName(prop)
                if ( !/^\./.test(noPropertiesName) ) {
                    toTranslate[noPropertiesName] = essential[prop].propJson
                }
            }
        });
        Object.keys(essential).forEach(prop => { // eg: "xxx_fr_FR.properties" if fr_FR is the language to translate
            if ( isLangToTranslate(prop).res ) {
                let propName = prop.split( '_' + isLangToTranslate(prop).lang )[0]
                const noPropertiesName = getNoPropertiesName(prop)
                Object.keys(essential[prop].propJson).forEach(key => {
                    if ( !/^\./.test(noPropertiesName) ) {
                        if ( !toTranslate[noPropertiesName] ) {
                            toTranslate[noPropertiesName] = {}
                        }
                        toTranslate[noPropertiesName][key] = essential[prop].propJson[key]
                    }
                });
            }
        });
        fs.writeFileSync(
            path.join(__dirname, '../generated', opts.toTranslate),
            JSON.stringify( toTranslate, '', 3 ),
            'utf8'
        )
        console.log('main/getToTranslate END')
        resolve()
    })
}
// module.exports() // for debug and to comment after