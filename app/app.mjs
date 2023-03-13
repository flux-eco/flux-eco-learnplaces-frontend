#!/usr/bin/env node
import fs from "node:fs";
import {FluxEcoNodeHttpServer} from "./api/flux-eco-node-http-server/server/FluxEcoNodeHttpServer.mjs";
import {FluxEcoProxyRequestHandlerApi} from "./api/flux-eco-proxy-request-handler/FluxEcoProxyRequestHandlerApi.mjs";
import {FluxEcoLearnplacesFrontendApi} from "./api/FluxEcoLearnplacesFrontendApi.mjs";

const readFile = (filePath) => {
    const httpServerConfigBuffer = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(httpServerConfigBuffer.toString());
}

async function app() {
    const apiSettings = readFile("./api/configs/flux-eco-learnplaces-frontend-api-settings.json");

    const httpServerConfig = readFile("./api/configs/flux-eco-node-http-server-config.json");
    const server = await FluxEcoNodeHttpServer.new(
        httpServerConfig,
        FluxEcoLearnplacesFrontendApi.new({
                handleProxyRequest: function (requestUrl, request) {
                   return FluxEcoProxyRequestHandlerApi.new(apiSettings.backendServer.protocol, apiSettings.backendServer.host, apiSettings.backendServer.port).handle(requestUrl, request)
                }
            }
        )
    )
    // Start the server
    server.start();
}

app();