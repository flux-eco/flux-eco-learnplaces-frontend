# Flux Eco Learnplaces Frontend

## Installation

```
./app/bin/install-libraries.sh

npm install pm2 -g
```

**Start the server using PM2 and the provided learnplaces-frontend-server.mjs**

```
pm2 start learnplaces-frontend-server.mjs
```

**To stop the Node.js Manager, use the following command:**

```
pm2 stop learnplaces-frontend-server
```

## pm2 state manager

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

## Logs

Use the pm2 logs
``` shell
PM2        | 2023-02-23T16:32:48: PM2 log: Stopping app:learnplaces-frontend-server id:4
PM2        | 2023-02-23T16:32:48: PM2 error: app=learnplaces-frontend-server id=4 does not have a pid
PM2        | 2023-02-23T16:32:54: PM2 log: Stopping app:server id:1
PM2        | 2023-02-23T16:32:54: PM2 error: app=server id=1 does not have a pid

```

## Troubleshooting

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