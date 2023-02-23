#!/bin/bash
SERVER_FILE=server.mjs
LOG_FILE=log.txt

# import config file
frontendServerPort=$(jq -r '.bindings.frontendServer.port' public/definitions/flux-eco-definition.json)

. "$HOME/.nvm/nvm.sh"

# start server
start_server() {
    nvm run $SERVER_FILE >> $LOG_FILE 2>&1 &
}

# Check state of server, restart if necessary
check_server() {
    netstat -an | grep $frontendServerPort | grep LISTEN > /dev/null
}

trap 'stop_manager' SIGTERM

stop_script() {
    kill -s SIGTERM $$
}


while true
do
    if ! check_server; then
        echo "Server is not running, starting it now..."
        start_server
    fi
    sleep 10
done

stop_manager