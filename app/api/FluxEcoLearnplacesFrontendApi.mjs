export class FluxEcoLearnplacesFrontendApi {

    /**
     * @param {FluxEcoLearnplacesFrontendApiOutbounds}
     */
    #outbounds;

    constructor(outbounds) {
        this.#outbounds = outbounds;
    }

    static new(outbounds) {
        return new FluxEcoLearnplacesFrontendApi(outbounds);
    }

    /**
     * @param requestUrl
     * @param request
     * @returns {string}
     */
    readMainNavigationState(requestUrl, request) {
        return  this.#outbounds.handleProxyRequest(requestUrl, request);
    }
}
