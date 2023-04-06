import https from "node:https";
import fs from "node:fs";
import path from "node:path";
import {sendError} from "../flux-eco-node-http-server/handlers/sendError.mjs";

export default class Api {

    /**
     * @type {FluxEcoLearnplacesFrontendHttpRequestHandlerConfig}
     */
    #config;

    constructor(config) {
        this.#config = config
    }

    static new(config) {
        return new Api(config)
    }

    async readActions() {
        return JSON.stringify(this.#config.actions);
    }

    /**
     * @param {string} pageId
     * @param {object} pageItemIds
     * @returns {Promise<unknown>}
     */
    async readPageAttributes({pageId},pageItemIds) {
        if (pageId.includes("..") || pageId.includes("//") || pageId.includes("\\")) {
            //todo abortSignal?
            return;
        }

        const fileSystemFilePath = path.join(process.cwd(), "http-request-handler", "states", "pages", [pageId, "json"].join("."));
        const data = fs.readFileSync(fileSystemFilePath)
        const pageAttributes = /** @type {FluxEcoUiPageElementAttributes} */ await JSON.parse(data);

        if(pageItemIds) {
            for (const [itemName, id] of Object.entries(pageItemIds)) {
                if(pageAttributes.pageSections.content.gridContainerElementAttributes.hasOwnProperty(itemName)) {
                    pageAttributes.pageSections.content.gridContainerElementAttributes[itemName].uiElementDefinition.config.id = id;
                }
            }
        }

        return pageAttributes;
    }

    async readMainNavigationAttributes() {
        return /** @type {FluxEcoUiTreeElementAttributes} */  {
            rootNode: {
                treeId: "myTreeId",
                parentId: null,
                id: 1,
                status: {
                    expanded: true
                },
                data: {
                    label: "the root title"
                },
                children: {
                    0: {
                        treeId: "myTreeId",
                        parentId: 1,
                        id: 2,
                        status: {
                            expanded: true
                        },
                        data: {
                            label: "a node 2"
                        },
                        children: {}
                    },
                    1: {
                        treeId: "myTreeId",
                        parentId: 1,
                        id: 3,
                        status: {
                            expanded: true
                        },
                        data: {
                            label: "a node 3"
                        },
                        children: {
                            0: {
                                treeId: "myTreeId",
                                parentId: 3,
                                id: 4,
                                status: {
                                    expanded: false
                                },
                                data: {
                                    label: "a node 4"
                                },
                                children: {
                                    0: {
                                        treeId: "myTreeId",
                                        parentId: 4,
                                        id: 5,
                                        status: {
                                            expanded: false
                                        },
                                        data: {
                                            label: "a node 5"
                                        },
                                    }
                                }
                            }
                        }
                    },
                },
            },
            nodes: {
                2: {
                    treeId: "myTreeId",
                    parentId: 1,
                    id: 2,
                    status: {
                        expanded: true
                    },
                    data: {
                        label: "a node 2"
                    },
                },
                3: {
                    treeId: "myTreeId",
                    parentId: 1,
                    id: 3,
                    status: {
                        expanded: true
                    },
                    children: {
                        0: {
                            treeId: "myTreeId",
                            parentId: 3,
                            id: 4,
                            status: {
                                expanded: false
                            },
                            data: {
                                label: "a node 4"
                            },
                            children: {
                                0: {
                                    treeId: "myTreeId",
                                    parentId: 4,
                                    id: 5,
                                    status: {
                                        expanded: false
                                    },
                                    data: {
                                        label: "a node 5"
                                    },
                                    children: null
                                }
                            }
                        }
                    }
                },
                4: {
                    treeId: "myTreeId",
                    parentId: 3,
                    id: 4,
                    status: {
                        expanded: false
                    },
                    data: {
                        label: "a node 4"
                    },
                    children: {
                        0: {
                            treeId: "myTreeId",
                            parentId: 4,
                            id: 5,
                            status: {
                                expanded: false
                            },
                            data: {
                                label: "a node 5"
                            },
                            children: null
                        }
                    }
                },
                5: {
                    treeId: "myTreeId",
                    parentId: 4,
                    id: 5,
                    status: {
                        expanded: false
                    },
                    data: {
                        label: "a node 5"
                    },
                    children: null
                }
            }
        }
    }

    async readMapAttributes({mapId}) {
        return {
            mapElementView: {
                "center": {
                    "lat": 10.238972,
                    "lng": -23.433449
                },
                "zoom": 13
            },
            mapElementMarkers: []
        }
    }


    async #handleRequest(options) {
        return new Promise((resolve, reject) => {
            const req = https.request(options, res => {
                let data = "";
                res.on('data', d => {
                    data += d;
                });
                res.on('end', () => {
                    resolve(data);
                });
            });

            req.on('error', error => {
                reject(error);
            });

            req.end();
        });
    }


    #createOptions(server, url, token) {
        return {
            hostname: server.hostname,
            port: server.port,
            path: url,
            method: 'GET',
            headers: {
                'Content-Type': 'text/html',
                'Authorization': 'Token ' + token
            }
        }
    }
}
