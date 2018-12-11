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
            const create1CartridgeJson = new Promise( (resolve, reject) => {
                let allPropsWithPath = {
                    'cartridgeName': cartridge,
                }
                files.forEach( filePath => { // files d'un seul cartridge
                    if ( filePath.includes('.properties')) {
                        let fileName = filePath.split('\\')
                        let len = fileName.length
                        fileName = fileName[len - 1]
                        allPropsWithPath[fileName] = {}

                        allPropsWithPath[fileName].key1 = 'key1'
                        allPropsWithPath[fileName].key2 = 'key2'
                        
                        const parseProperties = new Promise( (resolve, reject) => {
                            properties.parse (filePath, { path: true }, (error, obj) => {
                                if (error) return console.error (error);
                                resolve(obj)
                            });
                        })
                        parseProperties.then( (obj) => { // quand la prop est parsée
                            // console.log(obj); // keys et val d'une prop
                            allPropsWithPath[fileName] = obj // on l'ajoute
                            
                            // filePath = filePath.replace(opts.cartridgesPath, ".")
                            // allPropsWithPath['path'] = filePath
                            // allPropsWithPath[fileName] = obj

                        })
                        
                    }
                })
                // const obj = {name: cartridge, props: allPropsWithPath}
                console.log(allPropsWithPath);
                
                resolve(allPropsWithPath)
            })
            create1CartridgeJson.then( (allPropsWithPath) => {
                console.log('FINISH');
                this.writeJson(allPropsWithPath.cartridgeName, allPropsWithPath)
            })

        }
        else{
            console.log('No properties file in this cartridge !');
        }

        //console.log(json);
    });

    //return json
}