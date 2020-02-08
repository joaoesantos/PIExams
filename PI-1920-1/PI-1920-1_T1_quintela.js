// - GRUPO 1 -
// [2]
// Considere o seguinte excerto de código em Javascript:
function createObj() {
    const items = []
    return { addItem: items.push};
}
const obj = createObj()
//obj.addITem("SLB")

// b.
function _createObj() {
    const items = []
    return { 
        addITem : (e) => Array.prototype.push.call(items, e),
        addItem2: (e) => items.push(e),
        addItems: (... e) => items.push(e),
        printItems: () => console.log(items),
    };
}

let _obj = _createObj()
_obj.addItem("SLB")
_obj.addItem2("SCP")
_obj.addItems("BCN", "FCP")
_obj.printItems();

// - GRUPO 2 -
// [6]
// Implemente as seguintes funções em Javascript

// a.
function filterProperties(propNames, obj) {
    let res = {};
    for (p in obj)
        if (propNames.includes(p))
            res[p] = obj[p];
    return res;
}

let propsNames_6a = ["a", "b", "c"];
let obj_6a = {
    a: "a",
    b: "b",
    d: "d"
};
let newObj_6a = filterProperties(propsNames_6a, obj_6a);
console.log(newObj_6a);

// b.
function filterPropertiesN(propNames, objs) {
    return objs.map((obj) => filterProperties(propNames, obj))
}
let propsNames_6b = ["a", "b", "c"];
let objs_6b = [
    {
        a: "a",
        b: "b",
        d: "d"
    },
    {
        a: "a",
    },
    {
        b: "b",
        d: "d"
    },
    {
        d: "d"
    }
];
let newObjs_6b = filterPropertiesN(propsNames_6b, objs_6b);
console.log(newObjs_6b);

// c.

function mw(req, rsp, next) {
    let ogJson = rsp.json;
}