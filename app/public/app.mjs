import {FluxEcoUiApi} from "./flux-eco-ui/src/Adapters/Api/FluxEcoUiApi.mjs";
import {backendConfig} from "./config.mjs";

const api = await FluxEcoUiApi.new();

await api.toggleLogStatusEnabled();

const parentElement = document.body;
const treeId = "learnplaces";

const response = await fetch(backendConfig.url + ':' + backendConfig.port + '/' + 'repositoryTree');
const data = await response.json();
await api.renderTree(parentElement, treeId, data)