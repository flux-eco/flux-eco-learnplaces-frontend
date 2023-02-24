# flux-eco-learnplaces-frontend

Frontend for learn places

## Dependencies
### Backend
**flux-eco-learnplaces-frontend** requires a backend with learnplaces data. **flux-eco-learnplaces-backend** - available in the flux-eco-system -
is an existing implementation for this.

## Operating Options

You can run flux-eco-learnplaces-frontend as **Docker** or as a standalone **Node.js** server

### Docker
To run **flux-eco-learnplaces-frontend** as a Docker container, follow these steps:
1. Install Docker and Docker Compose on your system.
2. Copy and adapt the provided **docker-compose-template.yaml** to your system.
3. Run **docker-compose up (...)** to start the application. 
4. When you use the default configuration you can access it by navigating to http://localhost:3100/index.html in your web browser

In minimum provide the following configurations with docker compose. Please note the version number after **image: fluxms/flux-eco-learnplaces-frontend**

You find the current version under https://hub.docker.com/r/fluxms/flux-eco-learnplaces-frontend/tags

```
services:
  flux-eco-learnplaces-frontend:
    image: fluxms/flux-eco-learnplaces-frontend:v2022-02-24-4
    ports:
      - 127.0.0.1:3100:3100
```

### Node.js
To run My Application as a standalone **Node.js server**, follow these steps:

**install flux-eco-components**
```
./app/bin/install-libraries.sh
```

**install pm 2**

pm2 is an advanced process manager for Node.js applications that allows to start and monitor applications as daemons.

```    
npm install pm2 -g 
```

**configure the environment**

Copy and rename the provideEnvironmentsTemplate.sh file to a secure space e.g. your home directory.

Adjust the variables.

Export the environment variables to the shell processes

```
source provideEnvironments.sh
```

**start the server**

**Start the server using PM2 and the provided definition.json**

```
pm2 start definition.json
```

**To stop the Node.js Manager, use the following command:**

```
pm2 stop definition.json
```

**troubleshooting**


Find running server(s)
```
ps aux | grep node
```

The result will be something like that
```
user     27136  0.0  0.0 1021696 42544 ?       Sl   10:42   0:00 node server.mjs
```

Stop them
```
kill -s SIGTERM 1234
```

## pm2 state manager
The application uses the pm2 state manager within the docker container and also when it is operated
as standalone **Node.js server**

pm2 website: https://pm2.keymetrics.io/docs/usage/quick-start/

cheatsheet: https://devhints.io/pm2

``` shell
[PM2] Applying action deleteProcessId on app [0](ids: [ '0' ])
[PM2] [state-manager](0) ✓
┌─────┬────────────────────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name                           │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼────────────────────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 6   │ learnplaces-backend-server     │ default     │ 1.0.0   │ fork    │ 103226   │ 5m     │ 30   │ online    │ 0%       │ 6.9mb    │ martin   │ disabled │
│ 5   │ learnplaces-frontend-server    │ default     │ N/A     │ fork    │ 103940   │ 4m     │ 1    │ online    │ 0%       │ 7.0mb    │ martin   │ disabled │
└─────┴────────────────────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

## Configuration

**flux-eco-learnplaces-frontend** can be configured using environment variables. The following environment variables are available 
for configuration. If not set, the following default values will be used
- FLUX_ECO_LEARNPLACES_FRONTEND_ENDPOINTS_HTTP_PROTOCOL=http
- FLUX_ECO_LEARNPLACES_FRONTEND_ENDPOINTS_HTTP_HOST=localhost
- FLUX_ECO_LEARNPLACES_FRONTEND_ENDPOINTS_HTTP_PORT=3100
- FLUX_ECO_LEARNPLACES_BACKEND_ENDPOINTS_HTTP_PROTOCOL=http
- FLUX_ECO_LEARNPLACES_BACKEND_ENDPOINTS_HTTP_HOST=localhost
- FLUX_ECO_LEARNPLACES_BACKEND_ENDPOINTS_HTTP_PORT=3000

## Logs

Use the pm2 logs
``` shell
PM2        | 2023-02-23T16:32:48: PM2 log: Stopping app:learnplaces-frontend-server id:4
PM2        | 2023-02-23T16:32:48: PM2 error: app=learnplaces-frontend-server id=4 does not have a pid
PM2        | 2023-02-23T16:32:54: PM2 log: Stopping app:server id:1
PM2        | 2023-02-23T16:32:54: PM2 error: app=server id=1 does not have a pid

```
