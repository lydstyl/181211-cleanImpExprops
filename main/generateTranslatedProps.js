const fs = require('fs')
const path = require('path')
const rootDir = path.join(__dirname, '../')
const settings = require( path.join(rootDir, 'scripts/import/settings') )
module.exports = function () {
    return new Promise( resolve => {
        console.log('import BEGIN')
        const translated = require( settings.translated )
        Object.keys(translated).forEach(prop => {
            let content = settings.generatedBy
            let newProp = prop.split('.properties')[0]
            newProp = newProp + '_' + settings.newLangage + '.properties'
            let keys = Object.keys(translated[prop])
            if ( settings.sortKeys ) keys = keys.sort()
            keys.forEach(key => {
                content += key + '=' + translated[prop][key] + '\n'
            })
            fs.writeFileSync(
                path.join( rootDir, 'scripts/import/generatedProps', newProp),
                content,
                'utf8'
            )
        })
        console.log('import END')
        resolve()
    })
}