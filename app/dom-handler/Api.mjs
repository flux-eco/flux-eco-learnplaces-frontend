import {FluxEcoUiPageElement} from "./flux-eco-ui-page-element/FluxEcoUiPageElement.mjs";
import {FluxEcoUiGridContainerElement} from "./flux-eco-ui-grid-container-element/FluxEcoUIGridContainerElement.mjs";
import {FluxEcoUiTreeElement} from "./flux-eco-ui-tree-element/FluxEcoUiTreeElement.mjs";
import {FluxEcoUiMapElement} from "./flux-eco-ui-map-element/FluxEcoUiMapElement.mjs";

export default class Api {

    /**
     * @type {FluxEcoLearnplacesFrontendDomHandlerConfig}
     */
    #config;

    /**
     * @param {FluxEcoLearnplacesFrontendDomHandlerConfig} config
     */
    constructor(config) {
        this.#config = config
    }

    /**
     * @param {FluxEcoLearnplacesFrontendDomHandlerConfig} config
     */
    static new(config) {
        return new Api(config)
    }

    /**
     * @param {string} pageId
     * @param {FluxEcoUiPageElementAttributes} pageAttributes
     * @returns {FluxEcoUiPageElementConfig}
     */
    async #createPageConfig(pageId, pageAttributes) {
        return {
            id: pageId,
            settings: {},
            initialState: pageAttributes,
            outbounds: {
                createGridContainerElement: (gridContainerId, gridContainerSettings, gridContainerElementItems) => {
                    return FluxEcoUiGridContainerElement.new(
                        {
                            id: gridContainerId,
                            settings: gridContainerSettings,
                            outbounds: {
                                createUiElement: (uiElementDefinition, readAttributesAction) => {
                                    return this.createUiElement(uiElementDefinition, readAttributesAction)
                                }
                            },
                            initialState: {
                                gridContainerElementItems: gridContainerElementItems
                            }
                        }
                    )
                }
            }
        };
    }

    /**
     *
     * @param uiElementDefinition
     * @param {FluxEcoAction} readAttributesAction
     * @returns {Promise<HTMLElement>}
     */
    async createUiElement(uiElementDefinition, readAttributesAction) {
        switch (uiElementDefinition.tagName) {
            case FluxEcoUiTreeElement.tagName: {
                const config = uiElementDefinition.config;
                config.initialState = await this.#handleRequest(readAttributesAction.path);
                const treeElement = FluxEcoUiTreeElement.new(config);
                treeElement.subscribeToNodeClickedEvent((nodeAttributes) => {
                    this.#onFluxEcoUiTreeElementNodeClicked(nodeAttributes)
                });
                return treeElement;
                break;
            }
            case FluxEcoUiMapElement.tagName: {
                const config = uiElementDefinition.config;
                let requestPath = readAttributesAction.path
                requestPath = requestPath.replace("{mapId}", config.id);
                config.initialState = await this.#handleRequest(requestPath);
                return FluxEcoUiMapElement.new(config);
                break;
            }
        }
    }

    async #onFluxEcoUiTreeElementNodeClicked(nodeAttributes) {
        if (nodeAttributes.children === undefined) {
            await this.renderPage({pageId: "map"}, {map: nodeAttributes.id})
        }
    }

    /**
     * @param {string} pageId
     * @param {object} pageItemIds
     */
    async renderPage({pageId}, pageItemIds) {

        const requestUrlSchemaPath = this.#config.settings.requestHandlerActions.readPageAttributes.path;
        let requestUrl = requestUrlSchemaPath.replace('{pageId}', pageId);
        if (pageItemIds !== undefined) {
            const pageItemIdsPath = Object.entries(pageItemIds).map(([key, value]) => `${key}:${value}`).join('-');
            requestUrl = requestUrl.replace('{pageItemIds}', pageItemIdsPath);
        }

        /** @var {FluxEcoUiPageElementAttributes} pageAttributes */
        const pageAttributes = await this.#handleRequest(requestUrl);
        const pageConfig = await this.#createPageConfig(pageId, pageAttributes);

        const pageElement = FluxEcoUiPageElement.new(pageConfig);
        document.body.innerHTML = "";
        document.body.appendChild(pageElement);
    }

    /**
     *
     * @param requestUrl
     * @return {Promise<any>}
     */
    async #handleRequest(requestUrl) {
        const response = await fetch(requestUrl);
        return await response.json();
    }
}