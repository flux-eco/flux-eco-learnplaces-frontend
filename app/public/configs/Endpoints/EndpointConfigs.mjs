/**
 * @type EndpointConfigs
 */
export class EndpointConfigs {
    /**
     * @var {HttpEndpointConfig}
     */
    #httpEndpointConfig;

    /**
     * @param  {HttpEndpointConfig} httpEndpointConfig
     */
    constructor(
        httpEndpointConfig
    ) {
        this.#httpEndpointConfig = httpEndpointConfig;
    }

    /**
     * @param {HttpEndpointConfig} httpEndpointConfig
     * @return {EndpointConfigs}
     */
   static async new(
        httpEndpointConfig
    ) {
        return new EndpointConfigs(
            httpEndpointConfig
        )
    }

    /**
     * @return {HttpEndpointConfig}
     */
    get httpEndpointConfig() {
        return this.#httpEndpointConfig
    }
}