const fs = require('fs')
const path = require('path')
const recursive = require("recursive-readdir")
const properties = require ("properties")
const opts = require('../opts')

exports.mainDir = () => {
    return path.dirname(require.main.filename)
}
exports.writeJson = (name, content) => {
    console.log( `\nWriting ${name + '.json'}` )
    content = JSON.stringify(content, '', 3)
    fs.writeFileSync( path.join( this.mainDir(), 'generated/json', name + '.json'), content )
}
exports.extractPropsFrom = ( cartridgePath, cartridge ) => {
    const giveFilesRecusivly = new Promise( (resolve, reject) => {
        recursive( cartridgePath, ["foo.cs"], (err, files) => {
            resolve(files)
        });
    });
    giveFilesRecusivly.then( (files) => {
        if (files != undefined) {
            let parsePropertiesPromises = []
            const create1CartridgeJson = new Promise( (resolveP1, reject) => {
                let allPropsWithPath = {
                    'cartridgeName': cartridge,
                }
                files.forEach( filePath => { // files from only 1 cartridge
                    if ( filePath.includes('.properties')) {
                        let fileName = filePath.split('\\')
                        let len = fileName.length
                        fileName = fileName[len - 1]
                        allPropsWithPath[fileName] = {}
                        const parseProperties = new Promise( (resolveP2, reject) => {
                            properties.parse (filePath, { path: true }, (error, obj) => {
                                if (error) return console.error (error)
                                allPropsWithPath[fileName] = fileName
                                let send = {
                                    'cartridge': cartridge, // only core ????
                                    'fileName': fileName,
                                    'content': obj
                                }
                                resolveP2(send)
                            });
                        })
                        parsePropertiesPromises.push(parseProperties)
                    }
                })
                resolveP1(allPropsWithPath)
            })
            create1CartridgeJson.then( (allPropsWithPath) => {
                //console.log(allPropsWithPath);
                Promise.all(parsePropertiesPromises).then((props) => {
                    module.exports.writeJson('test', props) 
                    // this is props :
                    //
                    // [
                    //     {
                    //        "cartridge": "app_storefront_core",
                    //        "fileName": "app_storefront_core.properties",
                    //        "content": {
                    //           "demandware.cartridges.app_storefront_core.id": "app_storefront_core",
                    //           "demandware.cartridges.app_storefront_core.multipleLanguageStorefront": true
                    //        }
                    //     },
                    //     {
                    //        "cartridge": "app_storefront_core",
                    //        "fileName": "account.properties",
                    //        "content": {
                    //           "account.header": "My Account",
                    //      ...
                });
            })
        }
        else{
            console.log('No properties file in this cartridge !');
        }
    });

    //return json
}