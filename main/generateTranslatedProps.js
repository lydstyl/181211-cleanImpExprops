const fs = require('fs')
const path = require('path')
const rootDir = path.join(__dirname, '../')
const opts = require( path.join(rootDir, 'scripts/import/settings') )
module.exports = function () {
    return new Promise( resolve => {
        console.log('import BEGIN')
        const translated = require( opts.translated )
        Object.keys(translated).forEach(prop => {
            let content = '#Generate by an Angel\n'
            let newProp = prop.split('.properties')[0]
            newProp = newProp + '_' + opts.newLangage + '.properties'
            let keys = Object.keys(translated[prop])
            keys = keys.sort()
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