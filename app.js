const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');

const cert = fs.readFileSync('./ssl/vaultfinance_net.crt');
const ca = fs.readFileSync('./ssl/vaultfinance_net.ca-bundle');
const key = fs.readFileSync('./ssl/vaultfinance_net.key');

var options = {
   cert: cert,
   ca: ca,
   key: key
};

args = process.argv;
if (args.length > 2) {
	if (args[2] == 'dev') {
		hostname = 'localhost';
		port = 443;
	} else if (args[2] == 'dist'){
		hostname = 'vaultfinance.net';
		port = 443;
	} else {
		console.log('invalid arg, use dist setting\n');
		hostname = 'vaultfinance.net';
		port = 443;
	}
} else {
		console.log('invalid arg, use dist setting\n');
		hostname = 'vaultfinance.net';
		port = 443;
}

console.log('https listen');
const httpsServer = https.createServer(options, (req, res) => {
    console.log(req.url);
		url = req.url.split('?')[0];
    var filePath = './public' + url;
    if (url == '/') {
        filePath = './public/index.html';
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            }
            else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});
httpsServer.listen(port, hostname);

console.log('http listen');
const httpServer = http.createServer((req, res) => {
   res.statusCode = 301;
   res.setHeader('Location', `https://${hostname}${req.url}`);
   res.end();
});
httpServer.listen(80);