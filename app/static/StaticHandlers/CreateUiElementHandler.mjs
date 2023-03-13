import {FluxEcoUiTreeElement} from "../flux-eco-ui-tree-element/FluxEcoUiTreeElement.mjs";

export class CreateUiElementHandler {

    /**
     * @type {ReadStateHandler}
     */
    #readStateHandler;


    /**
     * @param {ReadStateHandler} readStateHandler
     */
    constructor(
        readStateHandler
    ) {
        this.#readStateHandler = readStateHandler;
    }

    /**
     * @returns {CreateUiElementHandler}
     */
    static new(readStateHandler) {
        return new CreateUiElementHandler(readStateHandler);
    }

    /**
     * @type FluxEcoUiGridContainerElementOutbounds.createUiElement
     * @param {{tagName:string, config:object}} uiElementDefinition
     * @param {{actionEndpoint:string, parameters:object}} readStateActionDefinition
     */
    handle(uiElementDefinition, readStateActionDefinition) {
        let element = {};
        const state = this.#readStateHandler.handle(readStateActionDefinition.actionEndpoint)
        switch (uiElementDefinition.tagName) {
            case FluxEcoUiTreeElement.tagName: {
                const config = uiElementDefinition.config;
                config.initialState = state;
                element = FluxEcoUiTreeElement.new(config);
                break;
            }
        }
        return element;
    }
}