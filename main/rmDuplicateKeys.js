const fs = require('fs')
const path = require('path')
const opts = require('../opts')
const help = require('../helper/helper')

/**
 * Remove duplicate key/val of all properties in and only in the main cartridge
 */
module.exports = () => {
    // Caroll = A

    // A key:val --> ne pas supprimer
    // B key:val-différente
    // C key:val

    // A key:val --> supprimer
    // B key:val
    // C key:val1

    // si pas de ALL-PROPS.json
    //     log il faut lancer extract avant !
    // sinon
    //     let mainProps = {}
    //     pour chaque mainProp dans main (app_carroll)
    //         pour chaque mainKey
    //             let mainVal
    //             pour chaque cartridge sauf main ou minorCartridge du plus au moins important
    //                 pour chaque prop
    //                     si prop == mainProp
    //                         pour chaque key
    //                             si key == mainKey
    //                                 let val
    //                                 si val != mainVal
    //                                     diffKeys.push({propName:propName, key:key}) // ajouter la key dans diffkeys
    //                                 sinon
    //                                     si key non présente dans diffKeys
    //                                         supprimer le couple mainKey et mainVal de mainProps

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
                                                                    console.log(`Removing key ${key}\nand it's value\n`);
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
    }
}