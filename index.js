let http = require('http');

var server = http.createServer((req, res)=>{
    res.writeHead(200, {"Content-type": "text/plain"});
    res.end("hello world\n")
})

server.listen(8000);