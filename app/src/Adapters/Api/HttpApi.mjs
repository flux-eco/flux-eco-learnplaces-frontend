//todo replace with flux-http-api

const fs = await import('fs');
const path = await import('path');

export class HttpApi {

    constructor(serverConfig) {

    }

    static async new() {
        return new HttpApi()
    }

    handleRequest(request, response) {
        if (request.url && request.method === 'GET' && request.url.endsWith('.mjs')) {
            const filePath = path.join(process.cwd(), 'public', request.url);
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    response.writeHead(500);
                    response.end(`Error loading file: ${err}`);
                } else {
                    response.writeHead(200, {'Content-Type': 'application/javascript'});
                    response.end(data, 'utf-8');
                }
            });
        } else {

            if (request.url && request.method === 'GET' && request.url.endsWith('.woff')) {
                const filePath = path.join(process.cwd(), 'public', request.url);
                fs.readFile(filePath, (error, content) => {
                    if (error) {
                        response.writeHead(500);
                        response.end(`Error loading HTML file: ${error}`);
                    } else {
                        response.writeHead(200, {'Content-Type': 'application/font-woff'});
                        response.end(content, 'binary');
                    }
                });
            }
            if (request.url && request.method === 'GET' && request.url.endsWith('.ttf')) {
                const filePath = path.join(process.cwd(), 'public', request.url);
                fs.readFile(filePath, (error, content) => {
                    if (error) {
                        response.writeHead(500);
                        response.end(`Error loading HTML file: ${error}`);
                    } else {
                        // HTML-Antwort senden
                        response.writeHead(200, {'Content-Type': 'application/font-ttf'});
                        response.end(content, 'binary');
                    }
                });
            }


            if (request.url.endsWith('.ttf') || request.url === "" || request.url === "/") {
                const filePath = path.join(process.cwd(), 'public', 'index.html');
                fs.readFile(filePath, (error, content) => {
                    if (error) {
                        response.writeHead(500);
                        response.end(`Error loading HTML file: ${error}`);
                    } else {
                        // CORS-Header hinzufügen
                        response.setHeader('Access-Control-Allow-Origin', '*');
                        response.setHeader('Access-Control-Allow-Methods', 'GET');
                        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
                        response.setHeader('Access-Control-Max-Age', '86400');
                        // HTML-Antwort senden
                        response.writeHead(200, {'Content-Type': 'text/html'});
                        response.end(content, 'utf-8');
                    }
                });

            } /*else {
                response.writeHead(400, {'Content-Type': 'text/html'});
                response.end("", 'utf-8');

            }*/
        }
    }

}