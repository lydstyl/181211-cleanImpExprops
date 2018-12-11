const fs = require('fs')
const path = require('path')


const recursive = require("recursive-readdir")
const properties = require ("properties")

// function test() {
//     const cartridgesPath = path.join( '/c/sfcc/projets/caroll/cartridges')
//     console.log( JSON.stringify(cartridgesPath) ) 
// }
//test()

exports.mainDir = () => {
    return path.dirname(require.main.filename)
}
exports.writeJson = (name, content) => {
    console.log( `\nWriting ${name + '.json'}` )
    content = JSON.stringify(content, '', 3)
    fs.writeFileSync( path.join( this.mainDir(), 'generated/json', name + '.json'), content )
}
exports.extractPropsFrom = ( cartridgePath ) => {


    const giveFilesRecusivly = new Promise( (resolve, reject) => {
        recursive( cartridgePath, ["foo.cs"], (err, files) => {
            resolve(files)
        });
    });
    
    giveFilesRecusivly.then( (files) => {
        console.log(`\nExtracting ${cartridgePath}`)
        if (files != undefined) {
            let json = {}
            let props = []
            let allPropsWithPath = {}
            files.forEach( filePath => {

                if ( filePath.includes('.properties')) {
                    props.push(filePath)
                    let fileName = filePath.split('\\')
                    let len = fileName.length
                    fileName = fileName[len - 1]
                    properties.parse (filePath, { path: true }, (error, obj) => {
                        console.log(`Parsing ${filePath}`)
                        if (error) return console.error (error);
                        json[fileName] = obj
        
                        // if (opts.deleteOldProperties && !filePath.includes(opts.doNotDeletePropIn) ) {
                        //     console.log(`Deleting ${filePath}`)
                        //     fs.unlinkSync(filePath)
                        // }
        
                        // filePath = filePath.replace("C:\\sfcc\\projets\\caroll", ".")
                        // allPropsWithPath['path'] = filePath
                        // allPropsWithPath[fileName] = obj
                        // console.log();
                    });
                }
            })
        }
        else{
            console.log('Pas de properties dans ce cartridge !');
        }
    });


    //return json
}