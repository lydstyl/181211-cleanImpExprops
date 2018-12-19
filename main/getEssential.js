const fs = require('fs')
const path = require('path')
const opts = require('../opts')
const allProps = require('../generated/ALL-PROPS.json')

function getCartridgeProps(cartridgeName) {
    let cartridgeProps
    allProps.forEach(obj => {
        if ( obj.cartridgeName == cartridgeName) {
            cartridgeProps = obj.props
        }
    })
    return cartridgeProps
}

/**
 * Write and return an object like this one :
 * 
 * let essential = {
    propName: {
        cartridgeName: "theName"
        propPath: "C:\\sfcc\\..."
        propJson: {key1: val1, key2, val2}
    }
}

    This object contain a merge of every properties keys and values.
    The merges are done from lowest priority cartridge to the highest.
    This object can be translated and reimport in the main cartridge only.
 */
module.exports = function () {
    const cartridgesOrder = opts.cartridgesOrder.split(':').reverse()
    let essential = {}
    let logs = ''
    let mainCartridgeReached = false
    cartridgesOrder.forEach(cartridge => {
        if (!mainCartridgeReached) { // loop until the main cartridge defined in opts
            let cartridgeProps = getCartridgeProps(cartridge)
            if (typeof cartridgeProps == 'object') { // escape string like "This cartridge is not found !" 
                cartridgeProps.forEach(prop => {
                    if (!essential[prop.propName] ) {
                        essential[prop.propName] = {}
                    }
                    if (!essential[prop.propName].propJson ) {
                        essential[prop.propName].propJson = {}
                    }
                    essential[prop.propName].cartridgeName = cartridge
                    

                
                    Object.keys(prop.propJson).forEach(key => { // merge keys and values
                        if (essential[prop.propName].propJson[key]) { // duplicated key
                            logs += `In ${essential[prop.propName].propPath}, key ${key} with value ${essential[prop.propName].propJson[key]} is replaced by ${prop.propJson[key]} from ${prop.propPath}\n\n`


                            // duplicates = {
                            //     propName1:{
                            //         key1: ['path1', 'path2'], // paths
                            //         key2: ...
                            //     },
                            //     propName2:{
                            //         key1: ['path1', 'path2'], // paths
                            //         key2: ...
                            //     }
                            // }


                            if ( !essential.duplicates ) {
                                essential.duplicates = {}
                            }
                            if ( !essential.duplicates[prop.propName] ) {
                                essential.duplicates[prop.propName] = {}
                            }
                            if ( !essential.duplicates[prop.propName][key] ) {
                                essential.duplicates[prop.propName][key] = [essential[prop.propName].propPath]
                            }
                            essential.duplicates[prop.propName][key].push(prop.propPath)
                        }

                        essential[prop.propName].propJson[key] = prop.propJson[key]
                    })
                    
                    essential[prop.propName].propPath = prop.propPath
                })
            }
            if (cartridge == opts.mainCartridge) {
                mainCartridgeReached = true
            }
        }
    })
    fs.writeFileSync(
        path.join(__dirname, '../generated', opts.essential),
        JSON.stringify( essential, '', 3 ),
        'utf8'
    )
    fs.writeFileSync( path.join( __dirname, '../generated/logs.txt' ), logs, 'utf8' )
    return essential
}

// To launch only getEssential :
// node ./main/getEssential.js 
// or 
// npm run getEssential
module.exports()
// console.log( module.exports() )