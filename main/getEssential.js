const fs = require('fs')
const path = require('path')
const opts = require('../opts')

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
    console.log('GET ESSENTIAL BEGIN')
    const allProps = require('../generated/' + opts.allProps) // this require has to be in this exported fonction otherway the essential.json is based on the previous ALL-PROPS.json
    function getCartridgeProps(cartridgeName) { // so does this function
        let cartridgeProps
        allProps.forEach(obj => {
            if ( obj.cartridgeName == cartridgeName) {
                cartridgeProps = obj.props
            }
        })
        return cartridgeProps
    }
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
                    essential[prop.propName].isDuplicated = false
                    Object.keys(prop.propJson).forEach(key => { // merge keys and values

                        if (essential[prop.propName].propJson[key]) { // duplicated key
                            essential[prop.propName].isDuplicated = true
                            logs += `In ${essential[prop.propName].propPath}, key ${key} with value ${essential[prop.propName].propJson[key]} is replaced by ${prop.propJson[key]} from ${prop.propPath}\n\n`
                            if ( !essential.duplicates ) {
                                essential.duplicates = {count:0}
                            }
                            if ( !essential.duplicates[prop.propName] ) {
                                essential.duplicates[prop.propName] = {}
                            }
                            if ( !essential.duplicates[prop.propName][key] ) {
                                essential.duplicates[prop.propName][key] = [essential[prop.propName].propPath]
                            }
                            essential.duplicates[prop.propName][key].push(prop.propPath)
                            essential.duplicates.count += 1
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
    // fs.writeFileSync(
    //     path.join(__dirname, '../generated/duplicates.json'),
    //     JSON.stringify( essential.duplicates, '', 3 ),
    //     'utf8'
    // )
    delete essential.duplicates
    fs.writeFileSync(
        path.join(__dirname, '../generated', opts.essential),
        JSON.stringify( essential, '', 3 ),
        'utf8'
    )
    console.log('GET ESSENTIAL FINISHED')
    return essential
}

// To launch only getEssential :
// node ./main/getEssential.js 
// or 
// npm run getEssential
//module.exports()
// console.log( module.exports() )