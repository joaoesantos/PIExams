// - GRUPO 1 -

// [1]
// A especificação do protocolo HTTP indica que o método DELETE é não seguro e idempotente. Justifique.
//   R:
//  ● Seguro: Um método HTTP é seguro se ele não altera o estado do servidor. Em outras palavras, um método é seguro se ele leva a uma operação de somente leitura.
//  ● Um método HTTP é idempotente se uma requisição idêntica pode ser feita uma ou mais vezes em sequência com o mesmo efeito enquanto deixa o servidor no mesmo estado.
//    Em outras palavras, um método idempotente não deveria possuir nenhum efeito colateral

// [2]
// Indique o status code a usar em cada uma das seguintes situações:
// a. Criação de recursos com sucesso           R: 201 - Created
// b. Actualização de recursos com sucesso      R: 200 - OK
// c. Recurso não encontrado                    R: 404 - Not Found
// d. Query String com formato incorreto        R: 400 - Bad Request
// e. Recurso mudou de localização              R: 3xx - Redirection (eg. 301 - Moved Permanently)
// f. Erro no servidor                          R: 5xx - Server Error (eg. 500 Internal Server Error)

// [3]
// O que é um selector CSS? Apresente exemplos de 3 tipos de seletores diferentes.
//   R: Um seletor define quais elementos um conjunto de regras CSS se aplica.
//   ● Seletor por classe
//     Este seletor básico escolhe elementos baseados no valor de seu atributo classe. Sintaxe: .nome-da-classe
//     Examplo: .index irá corresponder a qualquer elemento que tenha o índice de classe (provavelmente definido por um atributo class="index", ou similar).
//   ● Seletor por ID
//     Este seletor básico escolhe nós baseados no valor do atributo id. Deve existir apenas um elemento com o mesmo ID no mesmo documento.
//     Sintaxe: #nome-do-id
//     Exemplo: #toc irá corresponder ao elemento que possuir o id=toc (definido por um atributo id="toc", ou similar).
//   ● Seletores universais
//     Este seletor básico irá escolher todos os nós. Ele também existe em um namespace único e em uma variante de todo o namespace também.
//     Sintaxe: * ns|* *|*
//     Exemplo: * irá corresponder a todos os elementos do documento.
//   ● Seletores por atributo
//     Este seletor básico ira escolher nós baseados no valor de um de seus atributos, ou até mesmo pelo próprio atributo.
//     Sintaxe: [atrib] [atrib=valor] [atrib~=valor] [atrib|=valor] [atrib^=valor] [atrib$=valor] [atrib*=valor]
//     Exemplo: [autoplay] irá corresponder a todos os elementos que possuirem o atributo autoplay (para qualquer valor).

// [4]
// Considere o seguinte URL: http://somehost:8080/api/#users?page=5&limit=5. Sobre este, responda às seguintes questões, justificando:
// a. O URL está mal formado?
//   R: Sim. O fragmento identificador introduzido pelo caracter # é opcional e deveria ser a última parte do URL.
//   ● PROTOCOLO:   http://
//   ● DOMÍNIO:     somehost:8080/
//   ● CAMINHO:     api/
//   ● FRAGMENTO:   #users
//   ● QUERY STRING ?page=5&limit=5
//
// b. Se o parâmetro page for alterado para 6 o browser vai fazer novo pedido HTTP?
//   R: Não.
//   O identificador de fragmento funciona de maneira diferente do restante do URI: seu processamento é exclusivamente do lado do cliente, sem a participação do servidor da web. 
//   Quando o browser solicita um recurso Web de um servidor Web, o agente envia o URI ao servidor, mas não envia o fragmento. Em vez disso, o agente aguarda 
//   o servidor enviar o recurso e, em seguida, processa o recurso de acordo com o tipo de documento e o valor do fragmento.

// [5]
// Para cada uma das funções seguintes, indique justificando, se têm uma implementação síncrona ou assíncrona.
//   ● function a(s1, s2, cb) { cb(s1 + s2) }
//   R: Implementação síncrona, pois no código não existe implementado nenhuma função com operação assíncrona.
//   ● function a(s1, s2, cb) { setTimeout( () => cb(s1 + s2), 20 ) }
//   R: Implementação assíncrona, porque a função setTimeout() é uma operação assíncrona do filesystem core module.
//   ● function a(s1, s2) { return s1 + s2 }
//   R: Implementação síncrona, pois no código não existe implementado nenhuma função com operação assíncrona.


// - GRUPO 2 -

// [6]
const app = require('express')()
const filterReq = require('./filter-request.js')(['a', 'c', 'e'])
// Other Express initialization code
app.use(filterReq)

// a.
/////////////////////// filter-request.js //////////////////////////
'use strict';

let filterReq = function(req, rsp, next, filters) {
    let body = req.body;

    let newBody = {}
    if(body instanceof Array)
        newBody = filterPropertiesN(filters, body);
    else
        newBody = filterProperties(filters, body)
    req.body = newBody;

    next();
}
module.exports = filterReq;
///////////////////////////////////////////////////////////////////

// b.
// Constatou-se que, para este pedido, o body produzido para os outros middlewares foi {}. Justifique a causa deste comportamento.
//   R: Caso não se tenha preenchido as dependências do middleware filterReq, o filtro terá o valor de undifiened e aplicará este valor de 
//      filtragem a todos os middlewares, resultando num objecto vazio.

// [7]
// Considere a listagem abaixo. Indique e justifique as mensagens apresentadas na consola chamando test(true) e test(false)
function createPromise(sucess) {
    return sucess ? Promise.resolve(200) : Promise.reject(500)
}

function process(resolved) {
    return createPromise(resolved)
    .then(v => console.log(v + " Success "))
    .catch(v => comsole.log(v + " Error "))
}

function test(resolved) {
    process(resolved)
    .then(() => console.log("Finished with Sucess"))
    .catch(() => console.log("Finished with Error"))
}

//   R: 
//   test(true)
//   200 Success
//   Finished with Sucess
//
//   test(false)
//   Finished with Error


// - GRUPO 3 -

// a.
async function deleteUser(req, rsp) {

    try {
        /* validadores de parâmetros */
        let obj = await ciborg-services.deleteUser(req.params.userId);
        rsp.statusCode = 200;
        rsp.SetHeader('Content-type', 'application/json');
        rsp.json({
            status : "OK",
            description : `User with name ${obj.username} and id ${obj.userId} removed and all its data`
        })
    } catch(err) { // User Not Found
        if(err.hasOwnProperty('error')) {
            rsp.statusCode = 404;
            rsp.SetHeader('Content-type', 'application/json');
            rsp.json({
                status : "NOT FOUND",
                description : `User with name lfalcao and id ${req.params.userId} not found`
            })
        }
        else { // Other errors (default Express behaviour)
            rsp.SetHeader('Content-type', 'application/json');
            rsp.json()
        }
    }

}


// b.
async function deleteUser(userId) {
    try {
        let promiseArray = await Promise.all( ciborg-db.deleteGroupsOfUser(userId) );
        return await ciborg-db.deleteUser(userdId);
    } catch(err) {
        return err;
    }
}

// c.
window.onload = function() {
    const deleteButtons = document.querySelectorAll(".deleteBtn");

    deleteButtons.forEach(btn => {
        // TO DO 1 - start
        btn.addEventListener('click', deleteUser);
        // TO DO 1 - end
    })

    function deleteUser() {
        const userId = this.id;
        // TO DO 2 - start
        deleteUserOnServer();
        // TO DO 2 - end
        async function deleteUserOnServer() {
            // TO DO 3 - start
            let options = {
                method: 'DELETE',
                headers: new Headers("Accept", "application/json")
            };
            let url = `http://localhost:8080/users/${userId}`;
            let response = await fetch(url, options);
            processResponse(response);
            // TO DO 3 - end
            function processResponse(response) {
                if(response.status == 200) {
                    removeUser(id)
                } else {
                    // TO DO 4 - start
                    showErrorStatus(response.status);
                    // TO DO 4 - end
                }
            }
        }

    }

}