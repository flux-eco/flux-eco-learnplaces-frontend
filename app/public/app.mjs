import {FluxEcoUiApi} from "./flux-eco-ui/src/Adapters/Api/FluxEcoUiApi.mjs";
import {backendConfig} from "./config.mjs";

const api = await FluxEcoUiApi.new();

await api.toggleLogStatusEnabled();

const parentElement = document.body;
const treeId = "learnplaces";

const response = await fetch(backendConfig.url + ':' + backendConfig.port + '/' + 'repositoryTree');
const data = await response.json();
await api.renderTree(parentElement, treeId, data)
/*
const xhr = new XMLHttpRequest();
xhr.open('GET', backendConfig.url + ':' + backendConfig.port + '/' + 'repositoryTree', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET');
xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type');
xhr.onreadystatechange = async function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        await api.renderTree(parentElement, treeId, response)
    }
};
xhr.send();*/