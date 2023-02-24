FROM node:19-alpine AS build

COPY app /build/flux-eco-learnplaces-frontend/app

RUN chmod +x /build/flux-eco-learnplaces-frontend/app/bin/install-libraries.sh
RUN /build/flux-eco-learnplaces-frontend/app/bin/install-libraries.sh

RUN chmod +x /build/flux-eco-learnplaces-frontend/app/docker-entrypoint.sh

FROM node:19-alpine AS flux-eco-learnplaces-frontend

RUN npm install pm2 -g

USER node:node

EXPOSE 3100

ENV FLUX_ECO_LEARNPLACES_FRONTEND_ENDPOINTS_HTTP_PROTOCOL=http
ENV FLUX_ECO_LEARNPLACES_FRONTEND_ENDPOINTS_HTTP_HOST=flux-eco-learnplaces-frontend
ENV FLUX_ECO_LEARNPLACES_FRONTEND_ENDPOINTS_HTTP_PORT=3100
ENV FLUX_ECO_LEARNPLACES_BACKEND_ENDPOINTS_HTTP_PROTOCOL=http
ENV FLUX_ECO_LEARNPLACES_BACKEND_ENDPOINTS_HTTP_HOST=flux-eco-learnplaces-backend
ENV FLUX_ECO_LEARNPLACES_BACKEND_ENDPOINTS_HTTP_PORT=3000


COPY --from=build /build /opt/

WORKDIR /opt/flux-eco-learnplaces-frontend/app/
ENTRYPOINT ["/opt/flux-eco-learnplaces-frontend/app/docker-entrypoint.sh"]


