const path = require('path')
const csv = require('csvtojson')
const rootDir = path.join(__dirname, '../../')
const settings = require('./settings')
async function async () {
    console.log('1')
    await require( path.join(rootDir, 'main/extractFrontKeys') )()
    console.log('2')
    await require( path.join(rootDir, 'main/getEssential') )()
    console.log('3')
    await require( path.join(rootDir, 'main/getToTranslate') )()
    console.log('4')
    const jsonArray = await csv().fromFile( settings.csv )
    await require( path.join(rootDir, 'scripts/specificImport/specificImport') )(jsonArray)
    console.log('5')

    await require( path.join( rootDir, 'helper/emptyDir' ) )( path.join( rootDir, 'scripts/import/generatedProps') )
    console.log('6')
    await require( path.join(rootDir, 'main/generateTranslatedProps') )()
    console.log('7')
}
module.exports = () => {
    async ()
}