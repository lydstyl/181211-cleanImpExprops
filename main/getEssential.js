const opts = require('../opts')
const allProps = require('../generated/ALL-PROPS.json')

module.exports = function () {
    let cartridgesOrder = opts.cartridgesOrder.split(':').reverse()
    console.log(cartridgesOrder);


}

// use node ./main/getEssential.js for dev
console.log( module.exports() );