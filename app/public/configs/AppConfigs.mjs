/**
 * @type {AppConfigs}
 */
export class AppConfigs {

    /**
     * @var {EndpointConfigs}
     */
    #endpointConfigs
    /**
     * @var {BindingConfigs}
     */
    #bindingConfigs


    /**
     * @param {EndpointConfigs} endpointConfigs
     * @param {BindingConfigs} bindingConfigs
     */
    constructor(
        endpointConfigs,
        bindingConfigs
    ) {
        this.#endpointConfigs = endpointConfigs;
        this.#bindingConfigs = bindingConfigs;
    }

    /**
     * @param {EndpointConfigs} endpointConfigs
     * @param {BindingConfigs} bindingConfigs
     * @return {AppConfigs}
     */
    static async new(
        endpointConfigs,
        bindingConfigs
    ) {
        return new AppConfigs(endpointConfigs, bindingConfigs);
    }

    /**
     * @return {EndpointConfigs}
     */
    get endpointConfigs() {
        return this.#endpointConfigs
    }

    /**
     * @return {BindingConfigs}
     */
    get bindingConfigs() {
        return this.#bindingConfigs
    }
}