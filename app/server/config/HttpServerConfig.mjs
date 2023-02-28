/**
 * Configuration object for an HTTP httpBackend.
 *
 * @type HttpServerConfig
 * @property {string} protocol - The protocol to use (http or https).
 * @property {string} host - The host name or IP address to bind the httpBackend to.
 * @property {number} port - The port number to listen on.
 * @property {string} baseUrl - The address
 */

export class HttpServerConfig {

    #protocol;
    #host;
    #port;

    constructor(
        protocol,
        host,
        port,
    ) {
        this.#protocol = protocol;
        this.#host = host;
        this.#port = port;
    }

    /**
     * @param {object} configObject
     * @return {Promise<{HttpServerConfig}>}
     */
    static async fromConfigObject(
        configObject
    ) {
        return new HttpServerConfig(
            configObject.protocol,
            configObject.host,
            configObject.port,
        )
    }

    get protocol() {
        return this.#protocol
    }

    get host() {
        return this.#host
    }

    get port() {
        return this.#port
    }

    /**
     * @return {string}
     */
    get basePath() {
        return this.#protocol + "://" + this.#host + ":" + this.#port;
    }
}