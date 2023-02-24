/**
 * @type BindingConfigs
 */
export class BindingConfigs {
    /**
     * @var {HttpEndpointConfig}
     */
    #backendBinding;

    /**
     * @param  {HttpEndpointConfig} backendBinding
     */
    constructor(
        backendBinding
    ) {
        this.#backendBinding = backendBinding;
    }

    /**
     * @param {HttpEndpointConfig} backendBinding
     * @return {BindingConfigs}
     */
    static async new(
        backendBinding
    ) {
        return new BindingConfigs(
            backendBinding
        )
    }

    /**
     * @return {HttpEndpointConfig}
     */
    get backendBinding() {
        return this.#backendBinding
    }
}