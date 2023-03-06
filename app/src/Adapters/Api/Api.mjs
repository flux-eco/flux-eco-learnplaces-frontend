export default class Api {
    /**
     * @type {FluxEcoLearnplacesFrontendConfig.apiConfig}
     */
    #config
    #outbounds;

    constructor(config, outbounds) {
        this.#config = config
        this.#outbounds = outbounds
    }

    /**
     * @param {FluxEcoLearnplacesFrontendConfig.apiConfig} config
     * @return {Promise<Api>}
     */
    static async new(config, outbounds) {
        return new Api(config, outbounds);
    }

    readPageStructure(requestUrl, request) {
        const proxyRequestHandler = this.#outbounds.proxyRequestHandler;
        return proxyRequestHandler[this.#config.outbounds.proxyRequestHandler.actionName](
            requestUrl, request
        )
    }
}