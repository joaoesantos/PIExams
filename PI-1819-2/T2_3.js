//a
async function getAllBundlesBookTitles () {
    const bookUrlBase = 'http://localhost:9200/books/book/'
    return fetch( 'http://localhost:9200/b4/bundle/_search' )
    .then( response => response.json ())
    .then( bundles =>
        bundles.hits.hits
        .flatMap( bundle => bundle._source.books )
        .map( b => fetch ( bookUrlBase + b.id ))) // aqui fica uma colecao de funcoes?
    .then( requests => requests()) // 1 ???
    .then( responses => responses.map( resp => resp.json()))
    .then( responseBodies => responseBodies.body) // 2
    .then( books => books.map( b => b._source.title))
}

//b
async function getAllBundlesBookTitles () {
    const bookUrlBase = 'http://localhost:9200/books/book/'
    let search = await fetch( 'http://localhost:9200/b4/bundle/_search' );
    let responses = await search
                    .json()
                    .hits.hits
                    .flatMap(bundle => bundle._source.books)
                    .map(b => fetch(bookUrlBase + b.id));
    return responses
            .map(resp => resp.json())
            .map(resp => resp.body._source.title);
}