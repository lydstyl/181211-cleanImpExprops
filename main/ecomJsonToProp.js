const fs = require('fs')
const path = require('path')
const ess = require('../generated/essentialWithEcommerceAdded.json')
const rootDir = path.join(__dirname, '../')
const opts = require( path.join(rootDir, 'scripts/import/settings') )
Object.keys(ess).forEach(propName => {
    const keyVal = ess[propName].propJson
    let prop = opts.generatedBy
    Object.keys(keyVal).forEach(key => {
        const val = keyVal[key]
        prop += `${key}=${val}\n`
    })
    fs.writeFileSync(
        path.join(__dirname, `../generated/props/${propName}`),
        prop,
        'utf-8'
    )
})