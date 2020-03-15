// - GRUPO I -
// [1] 
// Um programador no desenvolvimento de um módulo NodeJs optou por implementar esse módulo com uma API síncrona. 
// Justifique se existe algum cenário em que faça sentido esta opção.
//
//      R: Uma vez que o conceito do NodeJs é ter uma única thread que tem como função a distribuição de trabalho, ter uma API síncrona que poderá bloquear essa única thread é altamente ineficiente.
//      No entanto o NodeJs possui várias bibliotecas de funções funções síncronas, como é o caso do require(). 
//      Contudo se a API desenvolvida não tiver operações do tipo I/O e for de execução sequencial e sem hipótese de concorrencia (single thread), seria um cenário aceitável.

// [2] 
// Uma aplicação Express configurada com o middleware dado por passport.initialize() , disponibiliza os métodos login() e logout() no objeto Request . 
// Explique detalhadamente todos os passos executados pela chamada do método logout() .
//
//      R: O método logout() irá remover a propriedade req.user, que têm a informação do user (id, password, etc), e seguidamente limpa os dados da sessão realizada no login.

// [3] 
// Um programador de uma aplicação Web ( Thoth ) para gestão de alunos ( student ) numa turma ( classroom )
// definiu os seguintes caminhos para as operações de adição e remoção de aluno numa turma:
// ● Adicionar - /thoth/classroom/{id}/student/{student id}/add
// ● Remover - /thoth/classroom/{id}/student/{student id}/remove
// Justifique se esta opção é correcta, ou não?
//
//      R: Não. Sendo uma aplicação web, assumindo que utiliza protocolo http, deverida ser utilizado o atributo "method" que especifica como é enviada a informação e para que fim.
//      Solucão:
//      ● Adicionar - POST /thoth/classroom/{id}/student/{student id}
//      ● Remover - REMOVE /thoth/classroom/{id}/student/{student id}

// [4] 
//  a) Justifique quantos pedidos HTTP resultam do carregamento do seguinte documento HTML no browser:
//  <html>
//      <head>
//          <link rel="stylesheet" href="bootstrap.css">    - GET 1 -
//          <script src="handlebars.js"></script>           - GET 2 -
//          <script src="bookSearch.js"></script>           - GET 3 -
//      </head>
//      <body>
//          <a href="https://www.gutenberg.org/" >
//              Project Gutenberg
//              <img src="Gutenberg-logo.png">              - GET 4 -
//          </a>
//
//
// b) Justifique se a utilização do webpack pode ajudar a reduzir o número de pedidos HTTP de 4.a?
//
//      R:
//      Sim, porque o webpack é um empacotador (encapsulador) de módulos estáticos, mas apenas se estes dependerem uns dos outros.
//      Ao processar a aplicação o webpack gera um gráfico que mapeia cada módulo e suas dependências e gera um ou mais pacotes.
//
//    Em caso afirmativo quais as modificações necessárias no front-end mantendo o mesmo comportamento de 4.a)
//
//      R:
//      Pelo que seria necessário alterar o HTML para utilizar apenas esse ficheiro de javascript em vez do 2 que estao atualmente.
//      Com isto em mente o numero de ficheiros de javascript carregados para o browser é apenas 1 pelo que seria feito apenas 1 pedido para script de javscript
//      menos 1 do que com o ficheiro original.

// [5]
// Implemente a função requestsToList(urls, listID) que realiza um pedido HTTP para cada um dos
// caminhos presentes em urls e adiciona o corpo da resposta como li ao elemento HTML com id listId .
// Os elementos li devem ser adicionados:
// ● pela mesma ordem do url correspondente em urls
// ● à medida que são recebidas as respostas para cada url.
// Por exemplo, a resposta ao pedido do 3º url não pode ser inserida na lista antes da inserção da resposta do pedido
// do 2º url, mesmo que este último chegue mais tarde.
// A utilização de uma abordagem como a do Promise.all está errada. Pode usar o fetch ou request-promise .

let urls = ['/url1', '/url2', '/url3', '/url4'];
let listID = ['div1', 'div2', 'div3'];

function requestsToList(urls, listID) {
    urls.forEach((url, index) => {
        let res = fetch(url)
        .then(async(rsp) => {
            if (rsp.ok) {
                await setIdContent(res, listID[index]) ;
            } else {
                throw new Error();
            }
        });
    });
}

async function setIdContent (content, id) {
    let element = document.createElement("li");
    let node = document.createTextNode(content);
    element.appendChild(node);

    let htmlElement = document.getElementById(id);
    htmlElement.appendChild(element);

    //const idContent = document.querySelector("#"+id);
    //idContent.innerHTML = html;
};

// [6] 
// Implemente a função profile(fn) que retorna uma função com o mesmo comportamento de fn , mas que
// regista os tempos de execução de cada chamada a fn . Assuma que fn é assíncrona e retorna uma Promise .
// Além disso, a função retornada por profile tem ainda um método avgDur que retorna o tempo médio de
// execução de fn em milissegundos. Assuma a existência de um objecto global performance com um método now()
// que retorna o instante de tempo actual em milissegundos. Exemplo:

function foo(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(
            () => resolve( `RESOLVED after ${ timeout } ms` ),
            timeout)
    })
}
const bar = profile(foo)
    bar( 2000 )
        .then(console.log)
    bar( 3000 )
    .then(console.log)
    .then(() => console.log(bar.avgDur()))

// Exemplo de uma utilização do código anterior:
// RESOLVED after 2000 ms
// RESOLVED after 3000 ms
// 2502.2250160006806

//
//      R:
function profile(fn) {
    let newFn = function () {
        newFn.execs = [];
        let start = new Date().getTime();
        let result = fn.apply(null, arguments).then(res => {
            let end = new Date().getTime();
            newFn.execs.push(end - start);
            return res;
        });
        return result;
    }
    newFn.avgDur = function () {
        return (newFn.execs.reduce((accum, curr) => accum + curr, 0) / newFn.execs.length);
    };
    return newFn;
}

// - GRUPO II -
// [5.2]
// A aplicação FOCA, desenvolvida na 1ª parte do trabalho prático, é constituída pelos módulos apresentados
// na figura seguinte, bem como as dependências entre cada um destes.
// Para cada módulo, indique 2 funcionalidades que devam ser implementadas e 2 que não devam, porque são
// responsabilidade de um dos outros módulos.
//
//      R:
//      ???

// [6.2] 
// Pretende-se acrescentar à aplicação FOCA a possibilidade de ter grupos de grupos de equipas favoritas,
// designados de Grupos Compostos (GC). Um GC só pode ser constituído por outros grupos, que podem por sua
// vez, ser também grupos compostos. Deste modo, na página que apresenta a lista de jogos das equipas de um
// GC, constam os jogos de todas as equipas que pertencem a cada um dos grupos que o compõem,
// recursivamente. Note-se que um grupo, apenas pode constar uma única vez como subgrupo de um grupo
// composto.
// ○ Defina os endnpoints HTTP para suportar as operações CRUD para ter a funcionalidade de GC na
// aplicação. Nessa definição inclua os status codes e o conteúdo da resposta, no caso da pedido ter
// sucesso e, caso se aplique, no caso de resposta com insucesso ao pedido.
//
//      R:
//      - obter GC -
// 	    GET /gc/{id}
// 	    sucesso: 200 - OK
// 	    insucesso: 400 - Bad Request
// 			       404 - Not Found
// 			       500 - Server Error
// 	    resposta: {
// 		    "id":"<id>",
// 		    "groups":[
// 			    <group>,
// 			    <GC>,
// 			    //...outros grupos e GCs
// 		    ]
// 	    }
//
//      - criar GC -
//      POST /gc
// 	    sucesso: 201 - Created
// 	    insucesso: 400 - Bad Request
// 			       500 - Server rror
// 	    resposta: {
// 		    "id":"<id>",
// 		    "groups":[
// 			    <group>,
// 			    <GC>,
// 			    //...outros grupos e GCs
// 		        ]
// 	    }
//
//      - atualizar GC -
// 	    PUT /gc/{id}
// 	    sucesso: 201 - Created
// 	    insucesso: 400 - Bad Request
// 			       404 - Not Found
// 			       500 - Server Error
// 	    resposta: {
// 		    "id":"<id>",
// 		    "groups":[
// 			    <group>,
// 			    <GC>,
// 			    //...outros grupos e GCs
// 		    ]
// 	    }
//
//      - remover GC -
// 	    DELETE /gc/{id}
// 	    sucesso: 204
// 	    insucesso: 400 - Bad Request
// 			       404 - Not Found
// 			       500 - Server Error
// 	    resposta: {}
//
// ○ Para suportar esta funcionalidade, que módulos teria que alterar dos apresentados na questão
// anterior, e que alterações seriam essas, nomeadamente os métodos a adicionar a cada um dos
// módulos.
// NOTA: Descreva apenas as alterações, sem as implementar !
//
//      R:
//      foca-server: adicionar novos os endpoint das operações CRUD
//      foca-web-api: validar os dados dos pedidos e acrescentar um método para cada uma das operações, que por sua vez chamaria o respectivo serviço
//      foca-services: acrescentar o respetivo serviço para cada operação CRUD, bem como a lógica de negócio
//      football-data: não teria de acrescentar nada, porque são operações provenientes de uma api externa
//      foca-db: teria de implementar métodos para cada operação
//
// ○ A componente de cliente desta aplicação é uma Single Page Application (SPA). A implementação
// do módulo de routing dessa página está na listagem seguinte ( router.js ). Crie um módulo de cliente
// ( compound-groups.js ) que usa este módulo de routing para registar as suas rotas, de modo a incluir a
// funcionalidade de grupos compostos nessa SPA.
// NOTA: Assuma que o módulo compound-groups.js já tem: 1) numa variável global o identificador
// mainContentId ; 2) implementadas todas as views e scripts de cliente necessários.
//
//      R:
let router = require("compound-groups.js");
router.add("/getGC");
router.add("/postGC");
router.add("/putGC");
router.add("/deleteGC");

module . exports = function ( mainContentId ) {
    let mainContent = document . querySelector ( mainContentId )
    window . addEventListener ( 'hashchange' , routeChanged );
    const routers = []
    routeChanged ();

    return { add: routers . push }

    async function routeChanged () {
        let [ routeName , ... params ] = window . location . hash . split ( '/' )
        routeName = routeName . substring ( 1 )
        let route = routers . find ( r => r [ routeName ])
        if ( routeName ) {
            mainContent . innerHTML = await route . view . apply ( null , params )
            route . script . apply ( null , params )
        } else {
            window . location . hash = '#welcome'
        }
    }
}

// [7]
// Porque motivo as Single Page Applications apenas mudam o hash do URL?
//
//      R: 
//      As SPA permitem fazer uma transição entre os templates carregados sem reload de página. 
//      Com mudança do hash é possível navegar no conteudo da página, que irão chamar o carregamento dos templates.