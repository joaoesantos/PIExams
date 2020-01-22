//ex4
const http = require('http');

let server = function(){
    server.routes = {
        GET : [],
        POST : [],
        PUT : [],
        DELETE : [],
    }

    let server = function(request, response){
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            if(body.length === 0) {
                request.body = {}
            } else {
                request.body = (body.length === 0) ? {} :JSON.parse(body);
            }
            navigate(request, response);
        });
    }

    let navigate = function(req, rsp) {
        // find command by matching url with route templates
        let routes = server.routes[req.method.toUpperCase()];
        if(routes.length == 0) {
            console.log("error");
        }
        // matches url with templates
        routes.some(function(route) {
            // finds parameters and replace them with regex
            let path = route.path.replace(/:\w+/g, `([^/]+)`);
            // convert to regex and only match from start to end
            path = new RegExp(`^${path}$`);
            // matchObj will be null is there's no match
            let matchObj = req.url.match(path);
            if(matchObj != null) {
                route.handler(req, rsp); // call web-api
                return true;
            } 
        });

    };

    server.get = function(...args ){
        if(args.length == 1){
            server.routes['GET'].push({path:undefined, handler:args[0]});
        }else if(args.length == 2){
            server.routes['GET'].push({path:args[0], handler:args[1]})
        }else{
            console.log("error");
        }
    }

    server.put = function(path, handler){
        server.routes['PUT'].push({path:path, handler: handler});
    }

    server.post = function(path, handler){
        server.routes['POST'].push({path:path, handler: handler});
    }

    server.delete = function(path, handler){
        server.routes['DELETE'].push({path:path, handler: handler});
    }

    server.start = function(host, port){
        const s = http.createServer(routes)
        s.listen(port, () => console.log("Listening"))
    }

    return server
}

module.exports = server;