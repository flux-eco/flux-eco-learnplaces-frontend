/**
 * @type {HttpEndpointConfig}
 */
export class HttpEndpointConfig {

    #protocol;
    #host;
    #port;

    constructor(
        protocol,
        host,
        port
    ) {
        this.#protocol = protocol;
        this.#host = host;
        this.#port = port;
    }


    static async new(
        protocol,
        host,
        port
    ) {
        return new HttpEndpointConfig(
            protocol,
            host,
            port
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