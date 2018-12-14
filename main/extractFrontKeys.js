const fs = require('fs')
const path = require('path')
const recursiveReadSync = require('recursive-readdir-sync')
const read = require( 'utils-fs-read-properties' );
const opts = require('../opts')

let allProps = []

function savePropsPath(cartridge) {
    let cartPath = path.join(opts.cartridgesPath, cartridge)
    if (fs.existsSync(cartPath)) {
        let props = [], files
        try {
            files = recursiveReadSync( cartPath )
        } 
        catch(err){
            if(err.errno === 34){
                console.log('Path does not exist')
            } 
            else {
                //something unrelated went wrong, rethrow
                throw err
            }
        }
        // for(var i = 0, len = files.length; i < len; i++){
        //     console.log('Found: %s', files[i]);
        // }
        if (!files) return

        files.forEach(file => {
            if (file.includes('.propertie')) {
                let propName = file.split('\\')
                let len = propName.length
                propName = propName[len - 1]
                let obj = {
                    propName: propName,
                    propPath: file,
                    // props Nb
                }
                let propJson = read.sync( file );
                if ( propJson instanceof Error ) {
                    throw propJson;
                }
                obj.propJson = propJson 
                props.push(obj)
            }
        });

        if (props.length) {
            return props
        }
        else {
            return "This cartridge don't have any properties file."
        }
    }
    else{
        return 'This cartridge is not found !'
    }
}

module.exports = () => {
    console.log('\n\nEXTRACTING ALL FRONT KEYS')
    let cartridgesOrder = opts.cartridgesOrder.split(':').reverse()
    cartridgesOrder.forEach(cartridge => {
        let obj = {}
        obj.cartridgeName = cartridge
        obj.props = savePropsPath(cartridge)
        if (typeof obj.props == 'object') {
            obj.propsNb = obj.props.length
        }
        allProps.push(obj)
    });
    fs.writeFileSync("C:\\sfcc\\scripts\\Caroll\\Properties\\1211-cleanImpExprops\\generated\\ALL-PROPS.json", JSON.stringify(allProps, '', 3), 'utf8')
    return allProps
}