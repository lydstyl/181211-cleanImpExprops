const path = require('path')
const rootDir = path.join(__dirname, '../../')
async function async() {
    console.log('run scripts/extract')
    require(path.join(rootDir, 'scripts/extract/'))()
    console.log('run main/ecommerceExtract')
    require(path.join(rootDir, 'main/ecommerceExtract'))()
    console.log('job finished')
}
module.exports = () => {
    async()
}