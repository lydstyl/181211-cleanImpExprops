const fs = require('fs')
const path = require('path')

exports.mainDir = () => {
    return path.dirname(require.main.filename)
}
exports.writeJson = (name, content) => {
    console.log( `\nWriting ${name + '.json'}` )
    content = JSON.stringify(content, '', 3)
    fs.writeFileSync( 
        path.join( this.mainDir(), 'generated/json', name + '.json'), 
        content 
    )
}