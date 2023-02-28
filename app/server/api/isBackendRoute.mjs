/**
 * @param {string} url
 * @return {boolean}
 */
export const isBackendRoute = function (url) {
    //todo with config
    if (url.endsWith('/getTreeData')) {
        return true
    }
    return false;
};