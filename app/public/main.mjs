import {FluxEcoUiApi} from "./flux-eco-ui/src/Adapters/Api/FluxEcoUiApi.mjs";
import {HttpEndpointConfig} from "./configs/Endpoints/HttpEndpointConfig.mjs";

const endpointConfig = await HttpEndpointConfig.new(window.location.protocol,  window.location.hostname,  window.location.port);

const api = await FluxEcoUiApi.new();
await api.toggleLogStatusEnabled();

async function getTreeData() {
    console.log(endpointConfig.basePath );
    try {
        const response = await fetch(endpointConfig.basePath + '/' + 'getTreeData');
        return await response.json();
    } catch (err) {
        console.error(`Error fetching tree data: ${err}`);
    }
}

const parentElement = document.body;
const treeId = "learnplaces";
await api.renderTree(parentElement, treeId, await getTreeData())