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
