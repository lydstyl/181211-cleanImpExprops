const path = require('path')
const opts = require('../opts')
const helper = require('../helper/helper')

/**
 * Return a json containing all front properties keys and values
 */
module.exports = () => {
    console.log('\n\nEXTRACTING ALL FRONT KEYS')
    let cartridgesOrder = opts.cartridgesOrder.split(':').reverse()
    /**
     * [ 'plugin_webdav_storefront',
     'int_colissimo',
    'bc_caroll',
    'bc_integrationframework',
    'bc_feeds',
    'app_feeds',
    'app_storefront_base',
    'app_storefront_core',
    'app_storefront_controllers',
    'app_altima_core',
    'app_altima_views',
    'app_altima_controllers',
    'int_atos_sips',
    'int_gtm',
    'app_caroll',
    'app_sg2sfra',
    'seo_metadatarules' ] 
    */

//    cartridgesOrder = [
//         'app_caroll',
//         'app_storefront_core',
//         // 'seo_metadatarules' 
//     ] 

    cartridgesOrder.forEach( cartridge => {
        let cartridgePath = path.join( opts.cartridgesPath, cartridge )
        let json = helper.extractPropsFrom( cartridgePath, cartridge )
    });
}