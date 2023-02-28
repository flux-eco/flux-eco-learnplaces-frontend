/**
 * @type {FluxEcoAppConfig}
 */
export const FluxEcoLearnplacesFrontendConfig = {
    endpoints: {
        http: {
            serverConfigId: "HTTP_ENDPOINT_SERVER",
            actions: {
                getRepositoryTree: {
                    path: '/getRepositoryTree',
                    apiActionId: "getRepositoryTree"
                }
            }
        },
    },
    bindings: {
        httpBackendServer: {
            serverConfigId: "HTTP_BACKEND_SERVER",
            actions: {
                getRepositoryTree: {
                    path: "/getRepositoryTree"
                }
            }
        }
    }
}