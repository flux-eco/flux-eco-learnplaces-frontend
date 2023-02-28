const http = await import('http');

export async function route(backendServerConfig, path, req, res) {
    //const method = req.method;
    //const url = new URL(req.requestUrl);
    //const pathname = url.pathname;
    //const query = url.searchParams;

    const requstUrl = await(backendServerConfig.basePath + "/" + path);
console.log(requstUrl);
    const backendRequest = http.get(requstUrl, backendRes => {
        let body = '';
        backendRes.on('data', chunk => {
            body += chunk;
        });
        backendRes.on('end', () => {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(body);
        });
        return true;
    });
    backendRequest.on('error', err => {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
        return false;
    });
}