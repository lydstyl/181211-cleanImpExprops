const path = require('path')
const rootDir = path.join(__dirname, '../../')
async function async () {
    console.log('1')
    await require( path.join( rootDir, 'helper/emptyDir' ) )( path.join( rootDir, 'scripts/import/generatedProps') )
    console.log('2')
    await require( path.join(rootDir, 'main/generateTranslatedProps') )()
    console.log('3')
}
module.exports = () => {
    async ()
}