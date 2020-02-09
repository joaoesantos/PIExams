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
        addItem : (e) => Array.prototype.push.call(items, e),
        addItem2: (e) => items.push(e),
        addItems: (...e) => items.push(e),
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

// a. filterProperties(propsNames, obj) que recebe um array de strings em propNames e um
// objeto em obj, retornando um novo objeto com as propriedades de obj cujos nomes estão presentes em
// propNames. Se em propNames existirem nomes que não correspondem a qualquer propiredade em
// obj, esta propriedade não é adicionada ao objeto.

function filterProperties(propNames, obj) {
    let res = {};
    propNames.forEach(p => {
        if (obj.hasOwnProperty(p))
            res[p] = obj[p];
    });
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

// b. filterPropertiesN(propNames, objs) que recebe um array de strings em propNames e
// um array de objetos em objs, retornando um novo array de objetos correspondente à aplicação da função
// filterProperties com propNames a cada um dos elementos de objs.Array
// NOTA: Na implementação desta função, a utilização de qualquer ciclo for/while ou do método
// Array.forEach reduz a cotação em 50%.

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

// c. implemente um middleware Express que substitui o método json() do segundo argumento
// (response), de modo a ter um comportamento especializado quando a query string do uri inclui o nome 
// filter. Nesse caso, o valor de filter é tomado como uma sequência de strings separadas por vírgulas,
// filtrando-se a resposta com a função filterProperties ou filterPropertiesN, de modo a que o,
// objeto ou objetos retornados apenas contenham as propriedades identificadas em filter.
// NOTAS:
// ● obj instanceof Array permite determinar se obj é uma instância de Array

function mw(req, rsp, next) {
    let ogJson = rsp.json;

    rsp.json = function(obj) {
        let filter = req.query.filter;
        if(filter !== undefined) {
            let splitedfilter = filter.split(',');
            let newObj = {};
            if(obj instanceof Array)
                newObj = filterPropertiesN(splitedfilter, obj);
            else
                newObj = filterProperties(splitedfilter, obj);
            ogJson.call(rsp, newObj);
        } else {
            ogJson.call(rsp, obj);
        }
    };

    next();
}

// [7]
// Indique, justificando, o erro grave presente na função get e apresente uma versão corrigida: 
function get(url, cb) {
    let result = null
    fetch(url).then(resp => { result = resp; }).catch(err => cb(err))
    while(!result); /* wating*/
    cb(null, result)
}

function _get(url, cb) {
    fetch(url).then(resp => { cb(null, resp) }).catch(err =>cb(err))
}

// - GRUPO 3 -
// a.
// POST /groups/{id}/games
async function AddGamesToGroup(req, rsp) {
    let options = {
        method: "POST",
        headers: new Headers("Accept", "aplication/json"),
        body: [], // array with gamesIds
    }
    let res = await fetch('/groups/{id}/games', options);
    if(res.ok)
        let body = await res.json();
    else
        return res.status; // //Status Codes: 400 - Bad Request , 404 - Not Found , 500 - Internal Server Error
}

// b.
function addGamesToGroup(req, rsp) {
    let groupId = req.params.groupId;
    let gamesIds = req.body.gamesIds;
    /* validadores */
   let res = await ciborg-services.AddGamesToGroup(groupId, gamesIds);
}

// c.
function addGamesToGroup(groupId, gamesIds) {
    let games = await board-games-data.getGames(gamesIds);
    addedGamesPromisses = games.map(game => ciborg-db.addGameToGroup(groupId, game));
    return Promisse.all(addedGamesPromisses);
}