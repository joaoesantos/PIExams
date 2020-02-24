function inc(arg, cb) {
    //...
    console.log('inc(' + arg + ') --> ' + ++arg)
    cb(null, arg)
}
function square(arg, cb) {
    //...
    const res = arg * arg
    console.log('square(' + arg + ') --> ' + res)
    cb(null, res)
}
function dup(arg, cb) {
    //...
    const res = arg * 2
    console.log('dup(' + arg + ') --> ' + res)
    cb(null, res)
}
///////////////////////////////////////////
let async = {
    compose: function(outer, inner) {
        return function(arg, cb) {
            let innerCb = function(err, res) {
                if(err) 
                    throw err;
                outer.call(null, res, cb);
            }
            inner.call(null, arg, innerCb)
        }
    },
    waterfall: function(arg, funcs, cb) {
        let fn = funcs.length-1;
        for(let i = funcs.length-2; i >= 0; i--) {
            fn = async.compose(fn, funcs[i]);
        }
        fn.call(null, arg, cb);
    }

    // var async = require('async');

    // async.waterfall([
    //     myFirstFunction,
    //     mySecondFunction,
    //     async.apply(myLastFunction, 'deen'),
    // ], function (err, result) {
    //     console.log(result);
    // });
    // function myFirstFunction(callback) {
    //     callback(null, 'one', 'two');
    // }
    // function mySecondFunction(arg1, arg2, callback) {
    //     // arg1 now equals 'one' and arg2 now equals 'two'
    //     callback(null, 'three');
    // }
    // function myLastFunction(arg1, arg2, callback) {
    //     // arg1 is what you have passed in the apply function
    //     // arg2 is from second function
    //     callback(null, 'done');
    // }

}
///////////////////////////////////////////
const squareInc = async.compose(square, inc)
console.log('---squareInc---')
squareInc(2, (err, data) => {
    console.log(
    'square(inc(2)) --> ' + data)
})
console.log('---waterfall---')
async.waterfall(
    2,
    [inc, square, dup],
    (err, data) => {
        console.log(
        'dup(square(inc(2))) = ' + data)
    }
)

// function test(arg1, callback ) {
//     console.log('arg1', arg1);
//     callback(arg1);
// }

// test(1, function(x) { console.log('callback', x); })