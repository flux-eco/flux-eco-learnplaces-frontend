const http = await import('http');
export const checkBackend = function (backendServerConfig, healthCheckPath, onBackendCheckSuccessed) {
    const backendCheck = http.get(backendServerConfig.basePath + healthCheckPath, backendRes => {
        let body = '';
        backendRes.on('data', chunk => {
            body += chunk;
        });
        onBackendCheckSuccessed()
    });
    backendCheck.on('error', err => {
        console.error(`Error checking backend: ${err}`);
    });
    backendCheck.end();
};