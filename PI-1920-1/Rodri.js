//3
function createObj() {
    const items = []
    return {
        addITem : (e) => Array.prototype.push.call(items, e),
        //addITem : items.push, //original
        printItem : () => console.log(items)//para efeitos de teste
    };
}

const obj_3 = createObj()
obj_3.addITem("SLB")
obj_3.printItem()//para efeitos de teste

//6.a
function filterProperties(propsNames, obj) {
    let res = {};
    for(let prop in obj) {
        if(propsNames.includes(prop)) {
          res[prop] = obj[prop];
        }
    }
    return res;
}

let propsNames_6a = ["a", "b", "c"];
let obj_6a = {
    a: "a",
    b: "b",
    d: "d"
};
let newObj_6a = filterProperties(propsNames_6a, obj_6a);
console.log(newObj_6a)

//6.b
function filterPropertiesN(propsNames, objs) {
    let res = objs.map(e => filterProperties(propsNames, e));
    return res;
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
console.log(newObjs_6b)

//6.c
function mw(req, resp, next) {
    let origJson = resp.json;

    resp.json = function(obj) {
        let filter = req.query.filter;
        if(filter === undefined) {
            let filters = filter.split(",");
            let newObj;
            if(obj instanceof Array) {
                newObj = filterPropertiesN(filters, obj);
            } else {
                newObj = filterProperties(filters, obj);
            }
            origJson.call(resp, newObj);
        }
        origJson.call(resp, obj);
    };

    

    
    next();
}

//7
async function fetch(url) {
    if(url){
        return "algo nao vazio";
    } else {
        throw new Error("Forçar o erro");
    }
}

function get(url, cb) {
    let result = null;
    fetch(url).then(resp => {result = resp;}).catch(err => cb(err));
    while(!result){
        console.log("LOOP")//para efeitos de teste
    };
    cb(null, result);
}

function get2(url, cb) { //versao corrigida
    fetch(url).then(resp => cb(null, resp)).catch(err => cb(err));
}

function callback(err, res) {
    if(err){
        console.log("ERRO")
    } else {
        console.log("CORREU BEM.")
    }
}

//get("", callback)
//get("nao vazio", callback)//este tambem da erro e nao sei bem pk, talvez pelo while ocupar a thread e nao a largar?
get2("", callback)
get2("nao vazio", callback)

//8.a


//8.b
async function addGamesToGroup(req, rsp) {
    let groupId = req.params.groupId;
    let gamesIds = req.body.gamesIds;
    /*
    validadores de parametros
    */
   let res = await services.addGameToGroup(groupId, gamesIds);
}

//8.c
async function addGamesToGroup(groupId, gamesIds) {
    let gamesPromisses = boardGamesData.getGames(gamesIds);
    let addedGamesPromisses = gamesPromisses.map(p => ciborgDb.addGametToGroup(groupId, p));
    return Promisse.all(addedGamesPromisses);
}