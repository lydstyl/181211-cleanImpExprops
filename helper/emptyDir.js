const path = require('path')
module.exports = ( dirPath ) => {
    return new Promise( resolve => {
        console.log('emptyDir BEGING')
        const fs = require('fs')
        fs.readdir(dirPath, (err, files) => {
            if (err) throw err
            for (const file of files) {
                fs.unlink(path.join( dirPath, file ), err => {
                    if (err) throw err
                })
            }
        })
        setTimeout(() => {
            console.log('emptyDir END')
            resolve()
        }, 1000); // fix emptying directory but not regenerated .properties files after
    })
}