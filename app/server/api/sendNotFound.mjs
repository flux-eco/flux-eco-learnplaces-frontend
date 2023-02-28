export const sendNotFound = function (res) {
    res.writeHead(404);
    res.end('404 Not Found');
};