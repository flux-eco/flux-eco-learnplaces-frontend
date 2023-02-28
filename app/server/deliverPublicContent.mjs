const fs = await import("fs");
const http = await import('http');
const path = await import('path');
const staticPath = path.join(process.cwd(), 'public');


export async function deliverPublicContent(req, res) {
    let filePath = path.join(staticPath, req.url);
    if (filePath === staticPath) {
        filePath = path.join(staticPath, 'index.html');
    }
    const extname = path.extname(filePath);
    const contentType = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.mjs': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf'
    }[extname] || 'application/octet-stream';

    fs.readFile(filePath, function (error, content) {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('404 Not Found');
                return;
            } else {
                res.writeHead(500);
                res.end('500 Internal Server Error');
                return;
            }
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf-8');
            return;
        }
    });
}