const http = require('http');
const port = '8080';
const hostname = 'localhost';
const url = require('url');

const requestListener = function (req, res) {
  var urlParts = url.parse(req.url, true);
  switch(urlParts.pathname) {
    case '/':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello, World!');
      break;
    default:
        res.end('Not defined yet!');
      break;
  }
}
const server = http.createServer(requestListener);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});