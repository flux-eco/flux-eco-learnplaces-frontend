import '../../../flux-eco/types/flux-eco-app-types.mjs';

/**
 * @typedef {FluxEcoAppConfig} FluxEcoLearnplacesFrontendConfig
 * @property {OutboundConfiguration} apiConfig.outbounds
 * @property {Object} outboundsConfigs.proxyRequestHandler
 */

/**
 * Represents the outbound configuration for the API.
 * @typedef {Object} OutboundConfiguration
 * @property {Object} proxyRequestHandler - Configuration for the proxy request handler.
 * @property {string} proxyRequestHandler.actionName - The name of the action that should handle the request.
 * @property {Object} proxyRequestHandler.parametersMapping - Object that maps the request parameters to the action parameters.
 * @property {string} proxyRequestHandler.parametersMapping.path - The path parameter of the request that should be mapped to the 'path' parameter of the action.
 */


/**
 * @typedef {Object} Pages
 * @property {PageHome} home
 **/

/**
 * @typedef {Object} PageHome
 * @property {PageHomeSections} pageSections
 **/

/**
 * @typedef {Object} PageHomeSections
 * @property {Object} content
 **/