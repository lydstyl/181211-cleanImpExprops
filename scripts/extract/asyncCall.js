module.exports = () => {
    return new Promise(resolve => {
        console.log('asyncCall for test... BEGIN')
        setTimeout(() => {
            console.log('asyncCall for test... END')
            resolve('resolveAfter2Seconds')
        }, 2000)
    })
}