const fs = require('fs')
const path = require('path')
const rootDir = path.join(__dirname, '../')
const recursiveReadSync = require('recursive-readdir-sync')
const read = require( 'utils-fs-read-properties' )
const opts = require( path.join(rootDir, 'scripts/extract/settings') )
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
                throw err
            }
        }
        if (!files) return

        files.forEach(file => {
            if (file.includes('.propertie')) {
                let propName = file.split('\\')
                let len = propName.length
                propName = propName[len - 1]
                let obj = {
                    propName: propName,
                    propPath: file,
                }
                let propJson = read.sync( file )
                if ( propJson instanceof Error ) {
                    throw propJson
                }
                obj.propJson = propJson 
                props.push(obj)
            }
        })
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
    return new Promise(resolve =>{
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
        })
        fs.writeFileSync(
            path.join( __dirname, '../generated', opts.allProps ), 
            JSON.stringify(allProps, '', 3), 
            'utf8'
        )
        console.log('EXTRACTING ALL FRONT KEYS FINISHED')
        resolve( allProps )
    })
}