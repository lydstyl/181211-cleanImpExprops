const fs = require('fs')
const path = require('path')
const opts = require('../opts')
const help = require('../helper/helper')

/**
 * Remove duplicate key/val of all properties in and only in the main cartridge
 */
module.exports = () => {
    if ( !fs.existsSync( path.join( __dirname, '../generated', opts.allProps ) ) ) {
        console.log( `${opts.allProps} is needed! Please first run this script in extract mode to generate it.` )
        return
    }
    else{
        const allProps = require( path.join( help.mainDir(), 'generated' ,opts.allProps) )
        let cartridges = opts.cartridgesOrder.split(':')
        for (let i = 0; i < cartridges.length; i++) {
            const cartridge = cartridges[i]
            cartridges.shift()
            if (cartridge == opts.mainCartridge) {
                cartridges.shift()
                break
            }
        }
        let mainProps = {}
        let diffKeys = {}
        let keysToRemove = []
        allProps.forEach(cartridge => {
            let cartridgeTabName = cartridge
            if ( cartridge.cartridgeName == opts.mainCartridge ) {
                cartridge.props.forEach(mainProp => {
                    Object.keys(mainProp.propJson).forEach(mainKey => {
                        let mainVal = mainProp.propJson[mainKey]
                        cartridges.forEach(minorCartridge => {
                            allProps.forEach(cartridge => {
                                if ( cartridge.cartridgeName == minorCartridge ) {
                                    if (typeof cartridge.props == 'object') {
                                        cartridge.props.forEach(prop => {
                                            if (prop.propName == mainProp.propName) {
                                                Object.keys(prop.propJson).forEach(key => {
                                                    if (key == mainKey) {
                                                        let val = prop.propJson[key]
                                                        if ( val != mainVal ) {
                                                            if ( !diffKeys[cartridgeTabName] ) {
                                                                diffKeys[cartridgeTabName] = {}
                                                            }
                                                            if ( !diffKeys[cartridgeTabName][prop.propName] ) {
                                                                diffKeys[cartridgeTabName][prop.propName] = []
                                                            }
                                                            diffKeys[cartridgeTabName][prop.propName].push(key)
                                                        }
                                                        else{
                                                            if ( !(diffKeys[cartridgeTabName][prop.propName] == undefined) ) {
                                                                if ( !diffKeys[cartridgeTabName][prop.propName].includes(key) ) {
                                                                    keysToRemove.push(
                                                                        {
                                                                            name: mainProp.propName,
                                                                            path: mainProp.propPath,
                                                                            key: key,
                                                                            val: mainProp.propJson[key]
                                                                        }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    }
                                                })
                                            }
                                        })
                                    }
                                }
                            })
                        })
                    })
                })
            }
        })
        const keysToRemove2 = {}
        keysToRemove.forEach(key => {
            if ( !keysToRemove2[key.name]) {
                keysToRemove2[key.name] = [{
                    key: key.key,
                    val: key.val,
                    //path: key.path
                }]
            }
            else{
                keysToRemove2[key.name].push(
                    {
                        key: key.key,
                        val: key.val,
                        //path: key.path
                    }
                ) 
            }
        });
        help.writeJson('DUPLICATED_KEYS', keysToRemove2)
        Object.keys(keysToRemove2).forEach(prop => {
            let newProp = ''
            let propPath = path.join( opts.cartridgesPath, opts.mainCartridge, 'cartridge/templates/resources', prop )
            let lines = require('fs').readFileSync(propPath, 'utf-8')
                        .split('\n')
                        .filter(Boolean)
            lines.forEach(line => {
                let lineKey = line.split('=')[0]
                let duplicate = false
                for (let i = 0; i < keysToRemove2[prop].length; i++) {
                    const key = keysToRemove2[prop][i];
                    if ( lineKey == key.key) {
                        duplicate = true
                        console.log('Duplicate key detected --> ' + lineKey + ' --> and removed');
                        break
                    }
                }
                if (!duplicate) {
                    newProp += line
                }
            });
            fs.writeFileSync( 
                path.join( help.mainDir(), 'generated/duplicatedKeysRemovedProps', prop), 
                newProp 
            )
        });
    }
}