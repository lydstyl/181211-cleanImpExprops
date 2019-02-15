const fs = require('fs')
const path = require('path')
const rootDir = path.join( __dirname, '../../' )
const extractSettings = require( path.join( rootDir, 'scripts/extract/settings' ) )
const importSettings = require( path.join( rootDir, 'scripts/import/settings' ) )
module.exports = (csv) => {
    return new Promise( resolve => {
        console.log('specificImport BEGIN')
        const toTranslate = require( path.join( rootDir, 'generated', extractSettings.toTranslate ) )


        // const translated = {} 
        const translated = JSON.parse( JSON.stringify( toTranslate ) )


        Object.keys(csv).forEach(i => {
            const tmp = csv[i].key.split(' > ')
            //const propName = tmp[0] + '.properties'
            const propName = tmp[0] + '_es_ES' + '.properties'
            console.log(propName);
            
            const key = tmp[1]



            const val = csv[i][ importSettings.newLangage ]
            if ( !translated[propName] ) { 
                translated[propName] = {}
                translated[propName][key] = val
            }
            else {
                // if ( !translated[propName] ) {
                //     if (translated[propName]) {
                //         translated[propName] = JSON.parse( JSON.stringify( translated[propName]) )
                //     }
                //     else{
                //         translated[propName] = {}
                //     }
                // }
                translated[propName][key] = val
            }
        })
        fs.writeFileSync(
            importSettings.translated,
            JSON.stringify( translated, null, 4 ),
            'utf-8'
        )
        console.log('specificImport END')
        resolve()
    })
}