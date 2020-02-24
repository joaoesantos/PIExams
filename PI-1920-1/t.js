function createPromise(sucess) {
    return sucess ? Promise.resolve(200) : Promise.reject(500)
}

function process(resolved) {
    return createPromise(resolved)
    .then(v => console.log(v + "Sucess "))
    .catch(v => comsole.log(v + " Error "))
}

function test(resolved) {
    process(resolved)
    .then(() => console.log("Finished with Sucess"))
    .catch(() => console.log(" Finished with Error"))
}

test(true)
test(false)