const fs = require('fs')
const path = require('path')

module.exports = function () {
    const opts = require('../opts')
    // const translated = require('../TRANSLATED') // put this path in opts ?
    const translated = require( path.join('../', opts.translated) ) // put this path in opts ?
    Object.keys(translated).forEach(prop => {
        let content = '#Generate by an Angel\n'
        let newProp = prop.split('.properties')[0]
        newProp = newProp + '_' + opts.newLangage + '.properties'
        let keys = Object.keys(translated[prop])
        keys = keys.sort()
        keys.forEach(key => {
            content += key + '=' + translated[prop][key] + '\n'
        });
        fs.writeFileSync(
            path.join(__dirname, '../generated/translatedProps', newProp),
            content,
            'utf8'
        )
    });
}
// module.exports() // for debug and to comment after