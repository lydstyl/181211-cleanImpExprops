// const helper = require('../helper/helper')

module.exports = () => {
    console.log('rmDuplicateKeys()')
    

    // Caroll = A

    // A key:val --> ne pas supprimer
    // B key:val-différente
    // C key:val

    // A key:val --> supprimer
    // B key:val
    // C key:val1


    // si pas de ALL-PROPS.json
    //     log il faut lancer extract avant !

    // sinon
    //     let mainProps = {}
    //     pour chaque mainProp dans main (app_carroll)
    //         pour chaque mainKey
    //             let mainVal
    //             pour chaque cartridge sauf main du plus au moins important
    //                 pour chaque prop
    //                     si prop == mainProp
    //                         pour chaque key
    //                             si key == mainKey
    //                                 let val
    //                                 si val != mainVal
    //                                     diffKeys.push({propName:propName, key:key}) // ajouter la key dans diffkeys
    //                                 sinon
    //                                     si key non présente dans diffKeys
    //                                         supprimer le couple mainKey et mainVal de mainProps
}