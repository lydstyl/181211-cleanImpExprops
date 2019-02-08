const keysToExtract =
`
checkout > cart.title
locale > global.invalidphone
locale > global.invalidpostal        
forms > address.phone.example           
forms > address.postalcode.example     
forms > country.es 
forms > country.spain
forms > paymentMethodType.label         
forms > profile.newpassword
`
module.exports = {
    langs: ['fr_FR', 'fr_BE', 'nl_BE', 'de_DE', 'es_ES', 'pt_ES', 'it_IT'],
    cssSeparator: '§',
    keysToExtract: keysToExtract
}