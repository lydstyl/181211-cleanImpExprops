
// // const resolveAfter1Second = (str) => {
// //     console.log("Début de la promesse")
// //     return new Promise(resolve => {
// //         setTimeout(() => {
// //             resolve(str)
// //             console.log("Résolution de la promesse")
// //         }, 1000)
// //     })
// // }

// const fs = require('fs')
// const path = require('path')
// const opts = require('../opts')
// // todo put theses function in an helper module because they are duplicated
// function isNoLang(prop) {
//     let lang = prop.match(/_([a-z]{2}_[A-Z]{2}).properties$/)
//     if (lang == null) {
//         return true
//     }
//     else{
//         return false
//     }
// }
// function isLangToTranslate(prop, langa) {
//     let lang = prop.match(/_([a-z]{2}_[A-Z]{2}).properties$/)
//     if (lang == null) {
//         return {res: false}
//     }
//     lang = lang[1]
//     if (lang == langa) {
//         return {res: true, lang: lang}
//     }
//     else{
//         return {res: false}
//     }
// }
// const resolveAfter1Second = (lang, toTranslate) => {
//     console.log("Début de la promesse")
//     return new Promise( resolve => {
//         const essential = require('../generated/essentialWithEcommerceAdded.json')
//         let toTranslate = {}
//         Object.keys(essential).forEach(prop => {
//             if ( isNoLang(prop) ) { // eg: "xxx.properties"
//                 toTranslate[prop] = essential[prop].propJson
//             }
//         });
//         Object.keys(essential).forEach(prop => { // eg: "xxx_fr_FR.properties" if fr_FR is the language to translate
//             if ( isLangToTranslate(prop, lang).res ) {
//                 let propName = prop.split( '_' + isLangToTranslate(prop, lang).lang )[0] + '.properties'
//                 Object.keys(essential[prop].propJson).forEach(key => {
//                     if ( !toTranslate[propName] ) {
//                         toTranslate[propName] = {}
//                     }
//                     // console.log(`\n${key}:\nNo lang properties: ${toTranslate[propName][key]}\nreplaced by ${opts.languageToTranslate} properties\n${essential[prop].propJson[key]}`);
//                     toTranslate[propName][key] = essential[prop].propJson[key]
//                 });
//             }
//         });
//         // fs.writeFileSync(
//         //     // path.join(__dirname, '../generated/TO-TRANSLATE.json'),
//         //     path.join(__dirname, '../generated', opts.toTranslate),
//         //     JSON.stringify( toTranslate, '', 3 ),
//         //     'utf8'
//         // )
//         resolve(toTranslate)
//         console.log("Résolution de la promesse")
//     })
// }

// const sequentialStart = async () => {
//     console.log('==Début séquentiel==')
//     // Si la valeur de l'expression qui suit l'opérateur await
//     // n'est pas une promesse, elle sera convertie en une promesse
//     // résolue.
//     let toTranslate = await resolveAfter1Second('it_IT', toTranslate) //it_IT,de_DE,nl_BE,es_ES,pt_ES
//     toTranslate = await resolveAfter1Second('de_DE', toTranslate)
//     toTranslate = await resolveAfter1Second('nl_BE', toTranslate)
//     toTranslate = await resolveAfter1Second('es_ES', toTranslate)
//     toTranslate = await resolveAfter1Second('pt_ES', toTranslate)
//     // console.log(r1)
//     console.log(tt5)
// }

// sequentialStart()