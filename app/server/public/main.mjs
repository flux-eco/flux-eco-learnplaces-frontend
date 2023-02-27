import {FluxEcoUiApi} from "./flux-eco-ui/src/Adapters/Api/FluxEcoUiApi.mjs";


const basePath = "http://" + window.location.hostname  + ":" + window.location.port

const api = await FluxEcoUiApi.new();
await api.toggleLogStatusEnabled();

async function getTreeData() {
    try {
        const response = await fetch(basePath + '/' + 'getTreeData');
        return await response.json();
    } catch (err) {
        console.error(`Error fetching tree data: ${err}`);
    }
}

const parentElement = document.body;
const treeId = "learnplaces";
await api.renderTree(parentElement, treeId, await getTreeData())