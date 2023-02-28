/**
 * Configuration options for the Frontend Server endpoints.
 *
 * @typedef {Object} EndpointConfig
 * @property {HttpServer} http - Configuration options for the HTTP endpoint.
 */

 /**
 * @typedef  {Object} HttpServer - Configuration options for the HTTP server.
 * @property {number} port - The port number to listen on.
 * @property {string} host - The IP address or hostname to bind the server to.
 */


/**
 * Object representing an endpoint for serving a static file
 * @typedef {Object} StaticEndpoint
 * @property {string} actionPath - The path for the static file to serve
 * @property {string} method - The HTTP method to use for this endpoint
 * @property {string} responseFile - The name of the file to serve as the response
 * @property {Object} headers - Additional headers to include in the response
 */


/**
 * Configuration options for the Backend Server bindings.
 *
 * @typedef {Object} BackendConfig
 * @property {Array} boundActions - A list of bound actions that the Frontend Server can proxy requests to.
 */

/**
 * Configuration options for the Frontend-Backend Server bindings.
 *
 * @typedef {Object} BoundAction
 * @property {string} path - The URL path of the action on the Frontend Server.
 * @property {string} targetPath - The URL path of the corresponding action on the Backend Server.
 */

/**
 * Configuration options for the Frontend Server.
 *
 * @typedef {Object} FrontendConfig
 * @property {EndpointConfig} endpoints - Configuration options for the Frontend Server endpoints.
 * @property {BackendConfig} bindings - Configuration options for the Backend Server bindings.
 */
