#!/usr/bin/env node
import fs from "node:fs";
import "./types/flux-eco-learnplaces-frontend-types.mjs"
import {FluxEcoNodeHttpServer} from "../../flux-eco-node-http-server/app/server/FluxEcoNodeHttpServer.mjs";
import Api from "./src/Adapters/Api/Api.mjs";
import http from "http";

async function app() {
    const configJson = (await (fs.readFileSync("./config/config.json", 'utf-8')));
    const config = /** @type {FluxEcoLearnplacesFrontendConfig} */ await JSON.parse(configJson);

    //todo extract to service
    const requestHandler = {
        async handleRequest(actionPath, request) {
            const headers = {...request.headers};
            const server = await resolveEnvVariables(config.outboundsConfigs.proxyRequestHandler.server);
            headers.host = server.host;

            const options = {
                method: request.method,
                headers,
            };

            console.log(["http://",server.host,":",server.port,actionPath].join(""),
            );

            return new Promise((resolve, reject) => {
                const proxyRequest = http.request(
                    ["http://",server.host,":",server.port,actionPath].join(""),
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
    }
    const outbounds = {}
    outbounds.proxyRequestHandler = requestHandler;

    const api = await Api.new(config.apiConfig, outbounds);
    const server = await FluxEcoNodeHttpServer.new(config.inboundsConfig.httpBindingConfig, api)
    // Start the server
    server.start();
}

await app();


function  resolveEnvVariables(object) {
    if (object === null) {
        return object;
    }
    if (typeof object !== 'object') {
        return object;
    }

    const resolved = Array.isArray(object) ? [] : {};

    for (const [key, value] of Object.entries(object)) {
        if (typeof value === 'string' && value.startsWith('$')) {
            const envVar = value.slice(1);
            const envVarName = envVar.replace(/[{}]/g, '');
            resolved[key] = process.env[envVarName];
        } else {
            resolved[key] = resolveEnvVariables(value);
        }
    }

    return resolved;
}