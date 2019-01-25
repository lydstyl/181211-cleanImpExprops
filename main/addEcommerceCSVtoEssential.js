module.exports = () => {
    const fs=require('fs')
    const csv=require('csvtojson')
    const csvFilePath='./e-commerce-trads.csv'
    const langs=['it_IT','de_DE','nl_BE','es_ES','pt_ES']
    const essential= require('../generated/essential.json')
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
        Object.keys(jsonObj).forEach( csvLine => {
            let tmp = jsonObj[csvLine].key  
            tmp = tmp.split(' > ')
            const key = tmp[1]
            tmp = tmp[0]
            langs.forEach(lang => {
                const propName = `${tmp}_${lang}.properties`
                const val = jsonObj[csvLine][lang]
                if ( !essential[propName] ) {
                    essential[propName] = {}
                    essential[propName].propJson = {}
                }
                essential[propName].propJson[key] = val
            })
        })
        fs.writeFileSync(
            'essentialWithEcommerceAdded.json', 
            JSON.stringify(essential, null, 4), 
            'utf-8'
        )
    })
}