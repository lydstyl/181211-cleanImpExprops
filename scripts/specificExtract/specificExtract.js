const fs = require('fs')
const path = require('path')
const rootDir = path.join( __dirname, '../../' )
const essential = require( path.join( rootDir, 'generated/essential' ) )
const settings = require( './settings' )
module.exports = () => {
    return new Promise( resolve => {
        console.log('specificExtract BEGIN')
        let extraction = `key${settings.cssSeparator}`
        settings.langs.forEach( locale  => {
            extraction += `${locale}${settings.cssSeparator}`
        })
        extraction += '\n'
        settings.keysToExtract.split('\n').forEach( line => {
            line = `${line.trim()}`
            if ( line ) {
                let tmp = line.split(' > ')
                const propName = tmp[0].trim()
                const key = tmp[1].trim()
                extraction += `${line}${settings.cssSeparator}`
                settings.langs.forEach( locale  => {
                    const prop = `${propName}_${locale}.properties`
                    let val = ''
                    try {
                        val = essential[prop].propJson[key]
                    } catch (error) {
                    }
                    if (val === undefined) val = ''
                    extraction += `${val}${settings.cssSeparator}`
                })
                extraction += '\n'
            }
        })
        fs.writeFileSync(
            path.join( __dirname, '/specificExtraction.csv'),
            extraction,
            'utf-8'
        )
        console.log('specificExtract END')
        resolve()
    })
}