// - GRUPO I -
// [1]
// Dadas um método HTTP e ação/característica do pedido ou resposta que se segue, crie uma frase usando
// apenas uma das seguintes palavras: SEMPRE, PODE, NUNCA.
// Exºs: GET - criação de um recurso: O método GET NUNCA deve ser usado para criar um recurso.
//
// a. POST - Atualização de um recurso
// b. PUT - Criação de um recurso
// c. GET - body da resposta sem conteúdo
// d. PUT - body do pedido sem conteúdo
// e. DELETE - body da resposta com conteúdo
//
//      R
//      a: O método POST PODE ser usado para atualizar um recurso (contudo não é boa prática de programação).
//      b: O método PUT PODE ser usado para criar um recurso (e.g. caso já se saiba o id).
//      c: O método GET tem SEMPRE de ter conteúdo no body na sua resposta, nem que seja um objecto vazio.
//      d: O body do método PUT PODE ir vaziao no pedido.
//      e. O body do método DELETE PODE vir com conteúdo.

// [2]
// A função nodify(fn) recebe como argumento fn uma função que recebe N argumentos e retorna uma
// Promise . Retorna uma nova função que recebe os mesmos N argumentos mais um, em último lugar, que é uma
// função de callback , com o idioma convencionado em NodeJS. A listagem seguinte apresenta um exemplo de
// utilização desta função.

function f ( success , a , b , c ) {
    return new Promise (( resolve , reject ) => {
        setTimeout (() => {
            success ? resolve ( a + b + c ): reject ( "err" )
            console . log ( `Success: ${ success } ` )
        }, 2000 )
    })
}

function showCbFunctionResult ( f , ... args ) {
    f . apply (this, args . concat ( cb ))
    function cb ( err , res ) {
        err ? console . log ( `Error is ${ err } ` )
            : console . log ( `Result is ${ res } ` )
    }
}

let fp = nodify ( f )
showCbFunctionResult ( fp , true, 1 , 2 , 3 )
showCbFunctionResult ( fp , false, 1 , 2 , 3 )

// a.Implemente a função nodify de modo ter o comportamento indicado.
// NOTA: A função nodify deve funcionar com qualquer função que respeite os requisitos enunciados e não apenas
// com a função f do exemplo.

function nodify(fn) {
    let newFn = function() {
        // last argument its a cb function
        let cb = arguments[arguments.length-1];
        // Use .apply() to have the same access to -fn- arguments in function -newFn-
        fn.apply(null, arguments)
            .then(rsp => cb(null, rsp)).catch(err => cb(err))
    }
    return newFn;
}

// b. Indique o output na consola da execução do código na listagem anterior.
//
//      R
//      Success: true
//      Result is 6
//      Success: false
//      Error is err

// [3]
// Para a seguinte definição do módulo wacky assinale com V as utilizações que executam sem erros e com F as
// utilizações que dão erro na execução. Para as respostas V, indique o resultado na consola dessa execução.

const wacky = nr => () => console . log ( nr / 3 )
wacky . dup = nr => console . log ( nr * 2 )
module . exports = wacky

// a. require('./wacky')(9).dup(3)      R: F
// b. require('./wacky').dup(3)         R: V - 6
// c. require('./wacky')(9)             R: v - function
// d. require('./wacky')(9)(3)          R: V - 3


// [4]
// Considere a seguintes regras de estilo. Classifique as afirmações abaixo de verdadeiras ou falsas, justificando.
//
// .table { border-collapse : collapse ; }
// th, td { border-bottom : 1px solid #ddd ; }
// tr.even { background-color : #f2f2f2 ;}
// tr td.first, tr th.first { width : 60% ; }
//
// a. A 1ª regra aplica-se a todas as tabelas.
// b. A 2ª regra aplica-se a elementos th e td.
// c. A 3ª regra aplica-se a elementos tr em posição par.
// d. A 4ª regra aplica-se a todos elementos tr, td e th.
//
//      R
//      a: F, aplica-se a todos os elementos da class .table
//      b: V, como não é especifico a nenhum elemento em concreto, aplica-se a todos com aquela tag
//      c: F, <nome1>.<nome2> indica um elemento de nome1 com a class de nome 2, peloque se aplica aos eleents de tr com a class even
//      d: F, <nome1> <nome2>.<nome3> indica elementos de nome 2 filhos de elementos de nome 1 que tenham a classe nome 3

// -GRUPO II-
// [1]
// No âmbito da aplicação desenvolvida no trabalho prático, pretende-se implementar a funcionalidade de
// auto-complete para pesquisa do nome de equipas. Esta funcionalidade apresenta uma lista de sugestões de nomes
// de equipas ao utilizador, à medida que ele escreve texto num elemento de formulário.
//
// a.Especifique o endpoint a disponibilizar para suportar esta funcionalidade. Note que não se exige que o
// implemente; o que se pretende é que defina tudo o que for necessário para um utilizador da API poder usar
// esse endpoint. Considere os requisitos que estão explícitos e implícitos na alínea que se segue.
//
//      R:
//      GET teams/{teamNameStart}?max={teamCount}
//
// b. Implemente a função getTeamNameSuggestions(teamNameStart, teamCount) que, no browser , realiza
// um pedido ao endpoint da alínea anterior para obter a lista das equipas cujo nome começa por
// teamNameStart . A lista tem dimensão máxima especificada em teamCount . A função retorna uma Promise
// que em caso de sucesso produz um array de objetos com o nome e id da equipa. Caso ocorra algum erro na
// tentativa de obtenção da lista, a promessa conclui-se com a indicação do código de erro ocorrido. A
// implementação certifica-se que, mesmo que o endpoint suporte mais codificações, é obtida uma resposta com
// conteúdo JSON.

async function getTeamNameSuggestions(teamNameStart, teamCount) {

	let options = {
        method: "GET",
        headers: new Headers("Accept", "application/json")
    }

    let response = await fetch(`teams/${teamNameStart}?max=${teamCount}`, options);

    if(response.ok){
        let body = await response.json();
        return body;
    } else {
        return response.status;
    }

}

// c. Considere o seguinte excerto da página HTML onde este funcionalidade está disponível. Acrescente o que
// considerar necessário para que, à medida que o utilizador escreve texto, o conteúdo do div suggestions seja
// actualizado com as sugestões obtidas usando a função da alínea anterior. Garanta que este div só está
// visível se teamName tiver pelo menos dois caracteres e se as sugestões foram obtidas com sucesso. Na
// implementação considere que já estão definidas as regras CSS necessárias, .hiddenAutoComplete { … }
// e .visibleAutoComplete { ... } .
// <input type="text" name="teamName" id="teamName" />
// <div class="hiddenAutoComplete" id="suggestions"></div>

document.querySelector("#teamName").addEventListener("change", listener);

async function listener(e) {
    let input = document.querySelector("#teamName");
    let div = document.querySelector("#suggestions");
    if (input.value.length < 3){
        if(input.className === "visibleAutoComplete"){
            input.className = "hiddenAutoComplete";
        }
        div.innerHtml = "";
    } else {
        if(input.className === "hiddenAutoComplete"){
            input.className = "visibleAutoComplete"; 
        }
        let teams = getTeamNameSuggestions(input.value, 10);
        let teamList = "";
        teams.forEach(t => {
            teamList += `<div>${t.name}</div>`
        });
        div.innerHtml = teamList;
    }  
}

// d. Dadas as características da FootballData API, que problemas/limitações antevê na implementação desta
// funcionalidade? Descreva possíveis soluções para atenuar/suprimir essas limitações.