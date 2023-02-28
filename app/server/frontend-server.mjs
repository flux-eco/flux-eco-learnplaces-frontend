import "../docs/config.json";

import http from 'http';
import fs from 'fs';
import url from 'url';

class FrontendServer {
    /**
     * @var {HttpServer}
     */
    #server;
    /**
     * @var {StaticEndpoint}
     */
    #static;
    /**
     * @var {HttpServer}
     */
    #backendServer;
    /**
     * @var {bool}
     */
    #backendServerIsUp = false;
    /**
     * @var {BoundAction[]}
     */
    #boundActions;

    constructor(config) {
        this.#server = config.endpoints.http;
        this.#static = config.endpoints.http.static;
        this.#backendServer = config.bindings.backend.server;
        this.#boundActions = config.bindings.backend.boundActions;
    }

    async start() {
        // Try to connect to the backend server
        while (!this.#backendServerIsUp) {
            try {
                await fetch(`${this.#backendServer}/ping`);
                this.#backendServerIsUp = true;
                console.log('Backend server is up and running.');
            } catch (error) {
                console.error('Could not connect to the backend server. Retrying in 5 seconds.');
                await new Promise((resolve) => setTimeout(resolve, 5000));
            }
        }
        const server = http.createServer(this.handleRequest.bind(this));
        // Start listening on the specified port
        server.listen(this.#server.port, () => {
            console.log(`Frontend server listening on port ${this.#server.port}.`);
        });
    }

    async handleRequest(request, response) {
        try {
            await this.checkBackendServer(request, response);
            await this.handleStaticContent(request, response);
            await this.handleProxyRequest(request, response);
            await this.handleMessaging(request, response);
        } catch (error) {
            console.error(error);
            this.sendResponse(response, 500, 'Internal server error');
        }
    }

    async checkBackendServer(request, response, next) {
        try {
            await fetch(`${this.#backendServer}/ping`);
            console.log('Backend server is up and running.');
            next();
        } catch (error) {
            console.error('Could not connect to the backend server.');
            this.sendResponse(response, 500, 'Internal server error');
        }
    }

    async handleStaticContent(request, response, next) {
        const {pathname} = url.parse(request.url);
        // If the requested path is a file, serve the file
        const filePath = `${this.#static.path}/${pathname}`;
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(response);
        } else {
            next();
        }
    }

    async handleProxyRequest(request, response) {
        const urlParts = request.url.split('/');
        const actionPath = urlParts[urlParts.length - 1];

        // Find API endpoint for the requested action path
        const boundAction = this.#boundActions.find(boundAction => boundAction.path === actionPath);
        if (!boundAction) {
            next();
            return;
        }

        try {
            const responseBody = await this.proxyRequest(boundAction.targetPath, request);
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(responseBody));
            response.end();
        } catch (error) {
            console.error(error);
            this.sendResponse(response, 500, 'Internal server error');
        }
    }

    async proxyRequest(actionPath, request) {
        const headers = {...request.headers};
        headers.host = this.#backendServer.host;

        const options = {
            method: request.method,
            headers,
        };

        return new Promise((resolve, reject) => {
            const proxyRequest = http.request(
                [this.#backendServer.host, actionPath].join("/"),
                options,
                (proxyResponse) => {
                    const chunks = [];

                    proxyResponse.on('data', (chunk) => {
                        chunks.push(chunk);
                    });

                    proxyResponse.on('end', () => {
                        const responseBody = Buffer.concat(chunks).toString();
                        resolve(JSON.parse(responseBody));
                    });
                }
            );

            proxyRequest.on('error', (error) => {
                reject(error);
            });

            request.pipe(proxyRequest);
        });
    }

    handleMessaging(request, response) {
        // Handle messaging requests here
        // ...
    }

    sendResponse(response, status, message) {
        response.writeHead(status, {'Content-Type': 'text/plain'});
        response.end(message);
    }
}
// Example usage
const server = new FrontendServer();
server.start();
