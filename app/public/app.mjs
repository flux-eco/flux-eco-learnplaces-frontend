import fs from "fs";
import {FluxEcoUiApi} from "./flux-eco-ui/src/Adapters/Api/FluxEcoUiApi.mjs";

const definition = JSON.parse(fs.readFileSync('app/public/definitions/flux-eco-definition.json', 'utf8'));


const api = await FluxEcoUiApi.new();

await api.toggleLogStatusEnabled();

const parentElement = document.body;
const treeId = "learnplaces";

const response = await fetch(definition.bindings.backendServer.url + ':' + definition.bindings.backendServer.port + '/' + 'repositoryTree');
const data = await response.json();
await api.renderTree(parentElement, treeId, data)