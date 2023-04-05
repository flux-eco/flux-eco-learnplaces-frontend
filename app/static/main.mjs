import {FluxEcoUiPageElement} from "./flux-eco-ui-page-element/FluxEcoUiPageElement.mjs";
import {CreateUiElementHandler} from "./StaticHandlers/CreateUiElementHandler.mjs";
import {ReadStateHandler} from "./StaticHandlers/ReadStateHandler.mjs";
import {FluxEcoUiGridContainerElement} from "./flux-eco-ui-grid-container-element/FluxEcoUIGridContainerElement.mjs";

const currentUrl = new URL(window.location.href);
const getPage = (currentUrl) => {
    const params = currentUrl.searchParams;
    let page = params.get("page");
    if (page) {
        return page
    }
    return 'home';
}

const getReadStateActionEndpoint = (page) => {
    return `./configs/page-configs/${page}/page-state.json`;
}
const handler = ReadStateHandler.new();
const pageState = await handler.handle(getReadStateActionEndpoint(getPage(currentUrl)))
c

console.log(pageState);

const pageConfig = /** @type FluxEcoUiPageElementConfig */ {
    id: getPage(currentUrl),
    settings: {},
    initialState: pageState,
    outbounds: {
        createGridContainerElement: (gridContainerId, gridContainerSettings, gridContainerElementItems) => {
            return FluxEcoUiGridContainerElement.new(
                {
                    id: gridContainerId,
                    settings: gridContainerSettings,
                    outbounds: {
                        createUiElement: (uiElementDefinition, readStateActionDefinition) => {
                            return CreateUiElementHandler.new(ReadStateHandler.new()).handle(uiElementDefinition, readStateActionDefinition)
                        }
                    },
                    initialState: {
                        gridContainerElementItems: gridContainerElementItems
                    }
                }
            )
        }
    }
}

const pageElement = FluxEcoUiPageElement.new(pageConfig);
document.body.appendChild(pageElement);



