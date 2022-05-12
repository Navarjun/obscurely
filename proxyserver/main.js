let http = require('http');
let httpProxy = require('http-proxy');
let HttpProxyRules = require('http-proxy-rules');
let process = require('process');

let proxyRules = new HttpProxyRules({
    rules: {
        '.*/api/': 'http://localhost:3000/'
    },
    default: 'http://localhost:9000/' // default target, will be landing page
});
let proxy = httpProxy.createProxy();

let server = http.createServer(function(req, res) {

    let target = proxyRules.match(req);
    return proxy.web(req, res, { target: target });
});

let port = 4000;
if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    port = 80;
}

server.listen(port);