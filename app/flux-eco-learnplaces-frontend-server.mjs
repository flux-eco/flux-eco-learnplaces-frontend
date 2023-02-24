//todo replace with flux-http-api
const http = await import('http');
const backendHttp = await import('http');
const fs = await import('fs');
const path = await import('path');
import {AppConfigs} from "./public/configs/AppConfigs.mjs";
import {EndpointConfigs} from "./public/configs/Endpoints/EndpointConfigs.mjs";
import {HttpEndpointConfig} from "./public/configs/Endpoints/HttpEndpointConfig.mjs";
import {BindingConfigs} from "./public/configs/Bindings/BindingConfigs.mjs";

const endpointConfigs = await EndpointConfigs.new(
    await HttpEndpointConfig.new(
        process.env.FLUX_ECO_LEARNPLACES_FRONTEND_ENDPOINTS_HTTP_PROTOCOL,
        process.env.FLUX_ECO_LEARNPLACES_FRONTEND_ENDPOINTS_HTTP_HOST,
        process.env.FLUX_ECO_LEARNPLACES_FRONTEND_ENDPOINTS_HTTP_PORT
    )
);
const bindingConfigs = await BindingConfigs.new(
    await HttpEndpointConfig.new(
        process.env.FLUX_ECO_LEARNPLACES_BACKEND_ENDPOINTS_HTTP_PROTOCOL,
        process.env.FLUX_ECO_LEARNPLACES_BACKEND_ENDPOINTS_HTTP_HOST,
        process.env.FLUX_ECO_LEARNPLACES_BACKEND_ENDPOINTS_HTTP_PORT,
    )
);
const appConfigs = await AppConfigs.new(endpointConfigs, bindingConfigs)


const staticPath = path.join(process.cwd(), 'public');

const server = http.createServer((req, res) => {

    if (req.url.endsWith('/getTreeData')) {
        console.log(appConfigs.bindingConfigs.backendBinding.basePath);
        const backendRequest = backendHttp.get(appConfigs.bindingConfigs.backendBinding.basePath + "/repositoryTree", backendRes => {
            let body = '';
            backendRes.on('data', chunk => {
                body += chunk;
            });
            backendRes.on('end', () => {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(body);
            });
        });
        backendRequest.on('error', err => {
            console.error(`Error calling backend server: ${err}`);
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
        });
    } else {


        let filePath = path.join(staticPath, req.url);
        if (filePath === staticPath) {
            filePath = path.join(staticPath, 'index.html');
        }
        const extname = path.extname(filePath);
        const contentType = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.mjs': 'application/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.woff': 'application/font-woff',
            '.ttf': 'application/font-ttf'
        }[extname] || 'application/octet-stream';

        fs.readFile(filePath, function (error, content) {
            if (error) {
                if (error.code === 'ENOENT') {
                    res.writeHead(404);
                    res.end('404 Not Found');
                } else {
                    res.writeHead(500);
                    res.end('500 Internal Server Error');
                }
            } else {
                res.writeHead(200, {'Content-Type': contentType});
                res.end(content, 'utf-8');
            }
        });
    }
});

server.listen(appConfigs.endpointConfigs.httpEndpointConfig.port, () => {
    console.log('Server running at ' + appConfigs.endpointConfigs.httpEndpointConfig.basePath);
});