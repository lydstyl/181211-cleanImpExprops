const fs = require('fs')
const path = require('path')
const opts = require('../opts')
const allProps = require('../generated/ALL-PROPS.json')

function getCartridgeProps(cartridgeName) {
    let cartridgeProps
    allProps.forEach(obj => {
        if ( obj.cartridgeName == cartridgeName) {
            cartridgeProps = obj.props;
        }
    });
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
    let essential = {}
    let cartridgesOrder = opts.cartridgesOrder.split(':').reverse()
    let mainCartridgeReached = false
    cartridgesOrder.forEach(cartridge => {
        if (!mainCartridgeReached) {
            let cartridgeProps = getCartridgeProps(cartridge)
            if (typeof cartridgeProps == 'object') { // escape string like "This cartridge is not found !" 
                cartridgeProps.forEach(prop => {
                    if (!essential[prop.propName] ) {
                        essential[prop.propName] = {}
                    }
                    essential[prop.propName].cartridgeName = cartridge
                    essential[prop.propName].propPath = prop.propPath

                    if (!essential[prop.propName].propJson ) {
                        essential[prop.propName].propJson = {}
                    }
                    else{
                        // prop.propJson
                        Object.keys(prop.propJson).forEach(key => {
                            // console.log(key); // key
                            // console.log(prop.propJson[key]); // val
                            
                            essential[prop.propName].propJson[key] = prop.propJson[key]

                            //console.log(essential[prop.propName].propJson[key]);
                            
                        });
                    }
                });
            }
            
            if (cartridge == opts.mainCartridge) {
                mainCartridgeReached = true
            }
        }
    });
    fs.writeFileSync(
        path.join(__dirname, '../generated', opts.essential),
        JSON.stringify( essential, '', 3 ),
        'utf8'
    )
    return essential
}

// use node ./main/getEssential.js for dev

// module.exports()
console.log( module.exports() );


