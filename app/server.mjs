//todo replace with flux-http-api

import * as fs from "fs";

const definition = JSON.parse(fs.readFileSync('public/definitions/flux-eco-definition.json', 'utf8'));

const http = await import('http');
const httpAdapter = await (await import('./src/Adapters/Api/HttpApi.mjs')).HttpApi.new()

const server = http.createServer((request, response) => {
    httpAdapter.handleRequest(request, response);
});

server.listen(definition.bindings.frontendServer.port, () => {
    console.log(`Server listening on port ${definition.bindings.frontendServer.port}`);
});