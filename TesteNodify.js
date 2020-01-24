function nodify(fn){
    let original = fn;
    let newFn = function(){
        let args = [].slice.call(arguments)
        let cb = args[args.length - 1];
        args = args.slice(0,args.length - 1)
        original
            .apply(null, args)
            .then(res => cb(null, res)).catch(err => cb(err))
    }

    return newFn
}

function duplify(param) {
    let args = [].slice.call(arguments)
    value = args.reduce((acc, curr) => acc + curr, 0)
    return new Promise(function(reject, resolve){
 
     try{
        setTimeout(resolve(value), 100)
     }catch{
         reject(e)
     }
    });
 }

let a = nodify(duplify)
a(1,2,3, (sum) => console.log('function:', sum))