//todo replace with flux-http-api

import {serverConfig} from "./public/config.mjs";

const http = await import('http');
const httpAdapter = await (await import('./src/Adapters/Api/HttpApi.mjs')).HttpApi.new()

const server = http.createServer((request, response) => {
    httpAdapter.handleRequest(request, response);
});

server.listen(serverConfig.port, () => {
    console.log(`Server listening on port ${serverConfig.port}`);
});