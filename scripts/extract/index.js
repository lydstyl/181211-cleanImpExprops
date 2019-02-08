const path = require('path')
const rootDir = path.join(__dirname, '../../')
async function async () {
    console.log('1')
    await require( path.join(rootDir, 'main/extractFrontKeys') )()
    console.log('2')
    await require( path.join(rootDir, 'main/getEssential') )()
    console.log('3')
    await require( path.join(rootDir, 'main/getToTranslate') )()
    console.log('4')
}
module.exports = () => {
    async ()
}