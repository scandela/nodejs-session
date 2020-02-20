const http = require('http');

const requestListener = function (req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Feed Team!');
}

const server = http.createServer(requestListener);
server.listen(8080);