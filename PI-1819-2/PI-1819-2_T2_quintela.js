// - GRUPO 1 -
// [1]
// Considere o código seguinte de um middleware Express, cujo objetivo é realizar a autorização, deixando apenas
// prosseguir pedidos de utilizadores autenticados.

module . exports = function( redirectUrl ) {
    return function( req , rsp , next ) {
    if ( req . isAuthenticated ()) {
        return next ();
    }
    rsp . set ({ 'Location' : redirectUrl }). end ()
    }
}

// a. Indique os pre-requisitos deste middleware , nomeadamente que middleware(s) têm que ser instalados
// antes deste, justificando.
//
//      R:
//       ● middleware da dependencia express-session, este middleware permite gerir a informação de sessão de um utilizador
//          na aplicação associada a uma chave que é guardada num cookie do lado do cliente
//       ● middleware do passport com algums configurações, nomeadamente como serializar e desserializar o utilizador no objecto
//          do pedido, como autenticar o utilizador e que estratégia de autenticação utilizar
//       ● middleware da session do passport para automaticamente colocar a informação do utilizador no objeto request associada a sessao em questao
//
// b. A implementação deste módulo está incorreta. Indique os problemas estes podem provocar nas
// aplicações cliente e corrija a implementação de modo a eliminar esses problemas.
//
//      R:
//      a response do protocolo HTTP não tem o método set, mas sim:
//      ● rsp.setHeader(name, value)
//      ● rsp.setTimeout(msecs[, callback])
//      Correção:
        rsp.setHeader('Location', redirectUrl)
        rsp.end();

// [2] 
// Para a aplicação B4 desenvolvida durante as aulas, definiu-se que não são suportados grupos ( bundles ) com o
// mesmo nome. Tendo em conta este requisito a as características inerentes aos diferentes tipos de pedido do
// protocolo HTTP, identifique quais as possibilidades de endpoints para criação de um grupo, em termos do tipo de
// pedido HTTP e correspondente URI e por qual optaria, justificando.
//
//      R: 
//      POST /bundles , quando se quer um novo criar um livro
//      PUT /bundles{id} , caso queira se criar um livro com um pré determinado id

// [3] 
// A função seguinte usa a API fetch() para obter os títulos de todos os livros pertencentes a todos os grupos
// de livros (bundles) existentes na base de dados ElasticSearch da aplicação B4, desenvolvida durante as aulas.

async function getAllBundlesBookTitles () {
    const bookUrlBase = 'http://localhost:9200/books/book/'
    return fetch ( 'http://localhost:9200/b4/bundle/_search' )
        . then ( response => response . json ())
        . then ( bundles => bundles . hits . hits
                . flatMap ( bundle => bundle . _source . books )
                . map ( b => fetch ( bookUrlBase + b . id )))
        . then ( requests => _______________________ ) // 1
        . then ( responses => responses . map ( resp => resp . json ()))
        . then ( responseBodies => _______________________ ) // 2
        . then ( books => books . map ( b => b . _source . title ))
}

// a. Complete os espaços em branco nas linhas que marcadas com os comentários //1 e //2.
//
//      R: ???
//
// b. Reescreva a função de modo a ter o mesmo comportamento, mas usando sempre que possível a keyword await.

async function getAllBundlesBookTitles_AwaitKeyWord () {
    const bookUrlBase = 'http://localhost:9200/books/book/'
    let response = await fetch ( 'http://localhost:9200/b4/bundle/_search' )
    let bundles = response . json ()
    let requests = bundles . hits . hits
        . flatMap ( bundle => bundle . _source . books )
        . map ( b => fetch ( bookUrlBase + b . id ))
    const responses = await Promise . all ( requests );
    let books = await Promise . all ( responses . map ( async resp => await resp . json ()))
    const booksTitles = books . map ( b => b . _source . title )
    return booksTitles ;
}

// [4]
// Implemente o módulo express-server , que suporta a utilização exemplificada no código seguinte. Este
// módulo usa o módulo express para suportar a sua funcionalidade e, quando for chamado o método start , inicia
// uma nova instância de aplicação Express, no host e porto recebidos como parâmetro.

const HOST = "localhost"
const PORT = 8080
require ( './express-server' )()
    . use ( mw1 )
    . get ( '/somePath' , mw2 )
    . get ( mw3 )
    . put ( '/somePath' , mw4 )
    . delete ( '/somePath' , mw5 )
    . post ( '/somePath' , mw6 )
    . start ( HOST , PORT );

// NOTAS: m1, m2, m3, m4, m5 e m6 são middlewares express definidos anteriormente. A listagem anterior é meramente
// exemplificativa. O módulo deve suportar os mesmos métodos e parâmetros que os métodos correspondentes numa
// aplicação Express para cada um dos tipos de pedidos suportados: get, put, post e delete.

const express = require("express");
const server = express();

module.exports = function () {
    let expressServer = {
        use: function(mw) { server.use(mw); },
        get: function (url, mw) { server.get(url, mw); },
        put: function (url, mw) { server.put(url, mw); },
        delete: function (url, mw) { server.delete(url, mw); },
        post: function (url, mw) { server.post(url, mw); },
        start: function(host, port) { server.listen(port, console.log("Server running on port: " + port)); }
    }
    return expressServer;
}


// - GRUPO 2 -
// [5]
// Pretende-se adicionar à YAMA, desenvolvida no trabalho prático, a possibilidade de adicionar várias vezes a
// mesma música a uma playlist . No entanto, esta é uma característica da playlist, ou seja, há playlists que suportam
// músicas repetidas e outras que não, dependendo da opção com que cada uma foi criada, ou posteriormente editada.
//
// a. Especifique o endpoint que está disponível na componente servidora da aplicação, para suportar esta
// funcionalidade. A resposta a este pedido deve ser sempre no formato Json, quer seja concluído com sucesso
// ou não.
//
//      R: PUT /playlists/{playlistId}/musics/{musicId}
//
// b. Seguindo a arquitetura de módulos da componente servidora definida para o trabalho prático, defina o
// método do módulo yama-web-api, que implementa o endpoint definido na alínea anterior. Este módulo deve
// usar um método do módulo yama-service , presente na variável yamaService global ao módulo, que será
// implementado na alínea seguinte. Deste modo, a sua utilização deve ser coerente com a implementação a
// realizar.

async function addMusicToList(req, rsp){
	try {
		/*
			validadores de parametros
		*/
		let playlist = yamaService.addMusicToList(req.params.playlistId, req.params.musicId);
        res.statusCode = 201;
        res.setHeader('Content-type', 'application/json');
		res.end(JSON.stringify(playlist));
	} catch(err) {
        res.statusCode = 500;
        res.setHeader('Content-type', 'application/json');
		res.end(JSON.stringify(err));
	}
}

// c. Implemente o método do módulo yama-service usado na alínea anterior, com a sintaxe e semântica que
// resultam da sua utilização. Na implementação desta método, assuma que tem disponível uma instância do
// módulo yama-db na variável yamaDb , global ao módulo. Assuma que o módulo yama-db tem as funções
// necessárias à implementação desta funcionalidade. Descreva o que fazem todas funções de yama-db
// utilizadas, sem as implementar.
// NOTA: Na implementação deste método, não esquecer que nem todas as playlists suportam a adição da
// mesma música mais que uma vez.

async function addMusicToList(playListId, musicId){
	let playlist = await yamaDb.getPlaylistById(playlistId); //devolve a playList pelo ID ou undefined se nao existir
	if(!playlist) {
		let err =  new Error("No playlist with that id");
		err.status = 404;
		throw err;
	}
	if(playlist.allowRepeats || !playlist.musics.find(music.id === musicId)) {
		yamaDb.addGameToList(playlistId, musicId); //adiciona uma musica a playlist
	} else {
		let err =  new Error("Cannot add repeated music for this playlist");
		err.status = 500;
		throw err;
	}
}

// d. Assumindo esta nova funcionalidade que possibilita a existência de várias músicas numa playlist se esta
// assim o suportar, descreva as alterações teriam que ser realizadas ao modelo de dados que representa uma
// playlist , e que alterações teriam que ser realizadas ao método de yama-service que edita os dados de uma
// playlist.
//
//      R:
//      Como utlizamos uma base de dados nao relacional nao há limitações a nível de acrescentar musicas repetidas
// 	    do ponto de vista pratica seria acrescentar um objecto, cuja representação já existe em playlist, ao array de musicas num object playlist.
//      nas funções que editam dados as verificações de negócio que impossibilitam acrescentar musicas repetidas a uma playlist teriam de ser alteradas para comtemplar que 
// 	    cada playlist tem um campo que tem de ser valido para se poder acrescentar musicas repetidas ou nao.
//      Alem disso é preciso decidir o que fazer em casos que previament permitiam musicas repetidas e as tinham e que entretanto foram alteradas para nao permitir musicas repetidas,
// 	    será que deixamos as musicas repetidas quando foram adicionadas? ou a partir do momento em que nao e permitido removem-se as repetidas?
// 	    qualquer uma das abordagens requer logica adicional na camada dos services