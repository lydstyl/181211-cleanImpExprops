const path = require('path')
const rootDir = path.join(__dirname, '../../')
async function async () {
    console.log('1 et 2')
    await require( path.join(rootDir, 'main/extractFrontKeys') )()
    console.log('3');
    await require( path.join(rootDir, 'main/getEssential') )()
    console.log('4');
    await require( path.join(rootDir, 'main/getToTranslate') )()
    console.log('5');
}
module.exports = () => {
    async ()
}