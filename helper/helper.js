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

                files.forEach( filePath => { // files d'un seul cartridge
                    if ( filePath.includes('.properties')) {
                        let fileName = filePath.split('\\')
                        let len = fileName.length
                        fileName = fileName[len - 1]
                        allPropsWithPath[fileName] = {}

                        // allPropsWithPath[fileName].key1 = 'key1'
                        // allPropsWithPath[fileName].key2 = 'key2'
                        
                        const parseProperties = new Promise( (resolveP2, reject) => {
                            properties.parse (filePath, { path: true }, (error, obj) => {
                                if (error) return console.error (error)

                                //allPropsWithPath[fileName]['keyvals'] = obj

                                //parsePropertiesPromises.push(fileName)

                                //allPropsWithPath[fileName] = obj
                                allPropsWithPath[fileName] = fileName

                                let send = {
                                    'cartridge': cartridge,
                                    'fileName': fileName,
                                    'content': obj
                                }

                                resolveP2(send)

                                // resolveP2(
                                //     {
                                //         cartridge: cartridge,
                                //         [fileName]: obj,
                                //         obj: obj
                                //     }
                                // ) //////////
                            });
                        })

                        // allPropsWithPath[fileName] = parseProperties
                        //parsePropertiesPromises.push(fileName)
                        // parsePropertiesPromises.push(filePath)

                        // parsePropertiesPromises.push(allPropsWithPath[fileName])
                        parsePropertiesPromises.push(parseProperties)

                    }
                })
                // const obj = {name: cartridge, props: allPropsWithPath}
                //console.log(allPropsWithPath);
                
                resolveP1(allPropsWithPath) //////////
            })
            create1CartridgeJson.then( (allPropsWithPath) => {
                //console.log(allPropsWithPath);
                
                Promise.all(parsePropertiesPromises).then((values) => {
                    //console.log(values);
                    module.exports.writeJson('test', values) // [{}, {}, ...] tableau d'objets keys vals
                });

                //console.log(allPropsWithPath);
                

                // console.log('FINISH');
                // this.writeJson(allPropsWithPath.cartridgeName, allPropsWithPath)
            })

            // Promise.all([promise1, promise2, promise3]).then(function(values) {
            //     console.log(values);
            // });

        }
        else{
            console.log('No properties file in this cartridge !');
        }

        //console.log(json);
    });

    //return json
}