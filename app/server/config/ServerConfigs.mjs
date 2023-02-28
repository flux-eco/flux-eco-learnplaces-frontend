import {HttpServerConfig} from "./HttpServerConfig.mjs";

/**
 * @type {ServerConfigs}
 */
export class ServerConfigs {
    /**
     * @var {HttpServerConfig}
     */
    #httpEndpoint

    /**
     * @var {HttpServerConfig}
     */
    #httpBackendServer

    /**
     * @param {HttpServerConfig} httpEndpoint
     * @param {HttpServerConfig} httpBackendServer
     */
    constructor(
        httpEndpoint,
        httpBackendServer,
    ) {
        this.#httpEndpoint = httpEndpoint;
        this.#httpBackendServer = httpBackendServer;
    }

    /**
     * @param {FluxEcoAppConfig} appConfig
     */
    static async fromAppConfig(appConfig) {
        return new ServerConfigs(
            await HttpServerConfig.fromConfigObject(JSON.parse(process.env[appConfig.endpoints.http.serverConfigId])),
            await HttpServerConfig.fromConfigObject(JSON.parse(process.env[appConfig.bindings.httpBackendServer.serverConfigId])),
        );
    }

    /**
     * @return {HttpServerConfig}
     */
    get httpEndpoint() {
        return this.#httpEndpoint
    }

    /**
     * @return {HttpServerConfig}
     */
    get httpBackendServer() {
        return this.#httpBackendServer
    }
}